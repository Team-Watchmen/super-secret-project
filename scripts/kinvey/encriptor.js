const Encryptor = (function () {
    class Encryptor {
        constructor() {

        }

        encryptToBase64(input) {
            var toUtf8 = CryptoJS.enc.Utf8.parse(input);
            var base64 = CryptoJS.enc.Base64.stringify(toUtf8);

            return base64;
        }
    }
    
    return Encryptor;
} ());

export { Encryptor };