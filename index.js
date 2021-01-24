import { B64Util } from './b64util.js';

class V {
	static d = document;
	static b = document.body;
	static c(tagName) {
		return V.d.createElement(tagName);
	}
	static a(elm, child) {
		return elm.appendChild(child);
	}
	static q(selector) {
		return V.d.querySelector(selector);
	}
	static gid(id) {
		return V.d.getElementById(id);
	}
	static ga(elm, attrName) {
		return elm.getAttribute(attrName);
	}
	static sa(elm, attrName, value) {
		return elm.setAttribute(attrName, value);
	}
	static qa(selector) {
		return V.d.querySelectorAll(selector);
	}
	static ael(elm, eventName, func) {
		const elemnt = typeof elm === 'string' ? V.gid(elm) : elm;
		elemnt.addEventListener(eventName, func);
	}
	static init() {
		// config behaviour
		for (const input of V.qa('input')) {
			const label = V.q(`label[for="${V.ga(input, 'id')}"] [data-val]`);
			label.textContent = input.value;
			V.ael(input, 'change', (e) => {
				label.textContent = e.target.value;
			});
		}
	}
	static fireEvent(elm, eventType) {
		if (!elm) {
			return;
		}
		// Thanks to https://stackoverflow.com/a/2706236
		if (elm.fireEvent) {
			elm.fireEvent('on' + eventType);
		} else {
			const evObj = V.d.createEvent('Events');
			evObj.initEvent(eventType, true, false);
			elm.dispatchEvent(evObj);
		}
	}
}

class FL {
	static l(event) {
		const f = (resolve) => {
			const target = event.target;
			const files = target.files;
			const file = files[0];
			const fr = new FileReader();
			fr.addEventListener(
				'load',
				() => {
					const b64d = fr.result;
					resolve({ b64d, file });
				},
				false
			);
			if (!file) {
				resolve({});
				return;
			}
			fr.readAsDataURL(file);
		};
		return new Promise(f);
	}
	static dl(fileName, blob, contentType = 'application/octetstream', isDataScheme) {
		const d = V.gid('dlLinkAncker');
		d.download = fileName;
		d.href = isDataScheme ? blob : URL.createObjectURL(blob, { type: contentType });
		d.click();
		setTimeout(() => {
			URL.revokeObjectURL(d.href);
		}, 1000);
	}
}
export class Main {
	constructor() {
		const sourceInputElm = V.gid('sourceInput');
		const convertTypeElm = V.gid('convertType');
		const convertedResultElm = V.gid('convertedResult');
		const onEdit = async () => {
			const value = sourceInputElm.value;
			const type = convertTypeElm.value;
			let result = '';
			try {
				switch (type) {
					case 's2b64':
						result = B64Util.to64(value);
						break;
					case 's2b64u':
						result = B64Util.to64u(value);
						break;
					case 's2hex':
						result = B64Util.s2hex(value);
						break;
					case 'b64toHex':
						result = B64Util.b64toHex(value);
						break;
					case 'toB64u':
						result = B64Util.toB64u(value);
						break;
					case 'toB64':
						result = B64Util.toB64(value);
						break;
					case 'hex2b64':
						result = B64Util.hex2b64(value);
						break;
					case 'b642s':
						result = B64Util.from64(value);
						break;
					case 'b64u2s':
						result = B64Util.from64u(value);
						break;
					case 'hex2s':
						result = B64Util.hex2s(value);
						break;
					case 'b642bs':
						result = B64Util.b64Tobs(value);
						break;
					case 'b64u2bs':
						result = B64Util.b64u2bs(value);
						break;
					case 'hex2bs':
						result = B64Util.hex2bs(value);
						break;
					case 'isB64':
						result = B64Util.isB64(value);
						break;
					case 'sig':
						result = await B64Util.sigs(value);
						break;
					case 'toFile':
						result = B64Util.sigs(value);
						break;
					default:
						console.log(`Sorry, we are out of ${type}.`);
				}
			} catch (e) {
				result = e;
			}
			convertedResultElm.value = result;
		};
		V.ael(sourceInputElm, 'input', onEdit);
		V.ael(convertTypeElm, 'change', onEdit);
		const fileUpElm = V.gid('fileUp');
		const convertedFileResultElm = V.gid('convertedFileResult');
		const fNameElm = V.gid('fName');
		const contentTypeElm = V.gid('contentType');
		const dlFileElm = V.gid('dlFile');
		const sigElm = V.gid('sig');
		const upFile = async (event) => {
			const { b64d, file } = await FL.l(event);
			convertedFileResultElm.value = b64d;
			fNameElm.value = file.name;
			contentTypeElm.value = file.type;
			sigElm.textContent = await B64Util.sig(B64Util.b64ToU8a(b64d.split(',')[1]));
			console.log(file);
		};
		V.ael(fileUpElm, 'change', upFile);

		const dlFile = async () => {
			const fileName = fNameElm.value;
			const contentType = contentTypeElm.value;
			const b64 = convertedFileResultElm.value;
			const blob = B64Util.b64ToBlob(b64.indexOf(',') >= 0 ? b64.split(',')[1] : b64, contentType);
			FL.dl(fileName, blob, contentType);
		};
		V.ael(dlFileElm, 'click', dlFile);
	}
}
new Main();
