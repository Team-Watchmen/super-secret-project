var encriptor = (function () {
    var encryptToBase64 = function (input) {
        var toUtf8 = CryptoJS.enc.Utf8.parse(input);
        var base64 = CryptoJS.enc.Base64.stringify(toUtf8);

        return base64;
    }
    
    return {
        encriptToBase64 : encryptToBase64
    }
} ());

export {encriptor};