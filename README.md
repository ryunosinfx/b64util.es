# b64util.es
pure 0 dependent es module utility about binary,string,base64 and hex conbarting borth.


## Overview

Binary data container format convert util for browser. not for nodejs.

### live demo

https://ryunosinfx.github.io/b64util.es/index.html

## Requirement

For modern browser. not for IE.(Chromium88~,Firefox84~)

## Usage
```EJS
<script type="module" src="./b64util.js"></script>
<script type="module">
import { B64Util } from './b64util.js';
   const base64 = B64Util.to64("test");
</script>
```

## Features

convert data formats to another.

* String to Uint8Array
* String to Base64
* String to Base64Url
* String to hex
* String calc Signature at SHA256
* Uint8Array to String
* Base64 to Base64Url
* Base64 to hex
* Base64Url to Base64
* hex to String
* hex to Base64
* hex to Base64Url
* Uint8Array calc Signature at SHA256

## Reference

```EJS
<script type="module" src="./b64util.js"></script>
<script type="module">
import { B64Util } from './b64util.js';
  const s = "test";
  const d = "Base64";
  const u = "Base64Url";
  const u8a = new Uint8Array();
  const ai = u8a.buffer;
  const bs = "binaryString";
  try{
    // String from Base64Url
    const u2s = B64Util.from64u(u);
    
    // String from Base64
    const d2s = B64Util.from64(d);
    
    // Base64Url from String
    const s2u = B64Util.to64u(s);
    
    // Base64 from String
    const s2b = B64Util.to64(s);
    
    // Uint8Array from Base64
    const b2t = B64Util.b64ToU8a(d);
    
    // Base64 from Uint8Array
    const t2b = B64Util.u8a2b64(u8a);
    
    // hex From Uint8Array
    const t2h = B64Util.u8a2Hex(u8a); 
    
    // Uint8Array from String
    const s2t = B64Util.s2u8a(s);
    
    // Hex from String
    const s2h = B64Util.s2hex(s);
    
    // String from Hex
    const h2s = B64Util.hex2s(hex);
    
    // ArrayBuffer from Base64Url
    const a2u = B64Util.b64uToAb(u);
    
    // BinaryString from Base64
    const bbs = B64Util.b64Tobs(d);
    
    // BinaryString from Base64Url
    const ubs = B64Util.b64u2bs(u);
    
    // BinaryString from Uint8Array
    const tbs = B64Util.u8a2bs(u8a);
    
    // Uint8Array from Hex
    const h2t = B64Util.hex2u8a(hex);
    
    // Base64 from Hex
    const h2b = B64Util.hex2b64(hex);
    
    // BinaryString from Hex
    const hbs = B64Util.hex2bs(hex);
    
    // BinaryString from ArrayBuffer
    const bsa = B64Util.ab2bs(ab);
    
    // Base64 from ArrayBuffer
    const a2b = B64Util.aToB64(ai);
    
    // Base64Url from ArrayBuffer
    const a2u = B64Util.aToB64u(ai);
    
    // Hex from Base64
    const b2h = B64Util.b64toHex(d);
    
    // String from Base64Url
    const a2h = B64Util.aToHex(ai);
    
    // Hex from Uint8Array
    const bst = B64Util.bs2u8a(bs);
    
    // Is String Base64
    const isb = B64Util.isB64(d);
    
    // Is String Base64Url
    const isu = B64Util.isB64u(d);
    
    // Utf8 String from Uint8Array
    const t2u = B64Util.u8aToUtf8(u8a);
    
    // Utf8 String from BinaryString
    const ubs = B64Util.bs2utf8(bs);
    
    // BinaryString from DataUri
    const dbs = B64Util.dataURI2bs(dURI);
    
    // Uint8Array from DataUri
    const d2t = B64Util.dataURI2u8a(dURI);
    
    // DataUri from ArrayBuffer and ContentType
    const a2d = B64Util.ab2dataURI(ai, type ); //type default is  'application/octet-stream'
    
    // Blob from Base64 And ContentType
    const b2b = B64Util.b64ToBlob(d, type);
    
    // New Uint8Array from Uint8Arrays Array
    const jts = B64Util.joinU8as(u8as);
    
    // Base64url from Base64
    const u2b = B64Util.toB64u(d);
    
    // Base64 from Base64Url
    const b2u = B64Util.toB64(u);
    
    // sha256sum from String
    const s2g = await B64Util.sigs(s);
    
    // sha256sum from Uint8Array
    const t2g = await B64Util.sig(u8a);
  }catch(e){
    console.log(e);
  }
</script>
```


## Author

 ryunosinfx 
[twitter](https://twitter.com/ryunosinfx)

## Licence

[MIT](https://......)
