var books = (function () {
    const AUTH_TOKEN = 'auth-token';
    const USER_NAME = 'username';

    const APP_ID = "kid_rJYhi_p3";
    const APP_SECRET = "5284c0a9f27b4f7cb2c18cf9e11d7b80";
    const APP_MASTER = "1914c665b14a46a7ac55268a1fed6ad3";

    // when logged in 
    // autorizationString - "username:password"
    //use this credentials for testing
    const autorizationString = `${localStorage.getItem("username")}:${CryptoJS.SHA1("test").toString()}`;

    //WIth basic autentication
    var getBook = function() {
        var promise = new Promise(function(resolve, reject) {
            var autorizationHeader = encriptor.encriptToBase64(autorizationString);

            $.ajax({
                url: `https://baas.kinvey.com/appdata/${APP_ID}/books/`,
                method: 'GET',
                headers: {
                    'Authorization': `Basic ${autorizationHeader}`
                },
                data: JSON.stringify(),
                contentType: 'application/json',
                success: function (response) {
                    resolve(response);
                }
            });
        });

        return promise;
    };

    //when logged -> user token is needed to make requests
    // autorizationString - saved AUTH_TOKEN in the localStorage
    var getBooks = function() {
        var promise = new Promise(function(resolve, reject) {
            var autorizationHeader = localStorage.getItem(AUTH_TOKEN);

            $.ajax({
                url: `https://baas.kinvey.com/appdata/${APP_ID}/books/`,
                method: 'GET',
                headers: {
                    'Authorization': `Kinvey ${autorizationHeader}`
                },
                data: JSON.stringify(),
                contentType: 'application/json',
                success: function (response) {
                    resolve(response);
                }
            });
        });

        return promise;
    };

    return {
        getBooks : getBooks
    }
} ());

export {books};