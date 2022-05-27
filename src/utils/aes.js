import CryptoJS from 'crypto-js/crypto-js'
 
/*
 * The default KEY IV If no KEY and IV are passed in during encryption and decryption, the one defined here will be used.
 * 
   * The front-end and back-end keys and the initial vector must be consistent when interacting with the front-end
 */
 
 const KEY = CryptoJS.enc.Utf8.parse("01234567890123456789012345678901");// The key length must be 16 bits
 const IV = CryptoJS.enc.Utf8.parse("1234567890123412"); // The initial vector is of arbitrary length
 
/*
   * AES encryption: string key iv returns base64
 */
export function encrypt(str, keyStr, ivStr) {
    let key = KEY
    let iv = IV
 
    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
 
    let srcs = CryptoJS.enc.Utf8.parse(str);
    var encrypt = CryptoJS.AES.encrypt(srcs, key, {
        iv: iv,
                 mode: CryptoJS.mode.CBC, //The AES encryption mode can be selected here
        padding: CryptoJS.pad.Pkcs7
    });
    return CryptoJS.enc.Base64.stringify(encrypt.ciphertext);
}
 
/*
   * AES decryption: string key iv returns base64
 */
export function decrypt(str, keyStr, ivStr) {
    let key = KEY
    let iv = IV
 
    if (keyStr && ivStr) {
        key = CryptoJS.enc.Utf8.parse(keyStr);
        iv = CryptoJS.enc.Utf8.parse(ivStr);
    }
 
    let base64 = CryptoJS.enc.Base64.parse(str);
    let src = CryptoJS.enc.Base64.stringify(base64);
 
    var decrypt = CryptoJS.AES.decrypt(src, key, {
        iv: iv,
                 mode: CryptoJS.mode.CBC, // here you can choose the mode of AES decryption
        padding: CryptoJS.pad.Pkcs7
    });
 
    var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}