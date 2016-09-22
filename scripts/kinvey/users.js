var users = (function () {
    const AUTH_TOKEN = 'auth-token';
    const USER_NAME = 'username';

    const APP_ID = "kid_rJYhi_p3";
    const APP_SECRET = "5284c0a9f27b4f7cb2c18cf9e11d7b80";
    // const APP_MASTER = "1914c665b14a46a7ac55268a1fed6ad3";
    const autorizationString = `${APP_ID}:${APP_SECRET}`;

    var register = function (user) {
        var promise = new Promise(function (resolve, reject) {
            var reqUser = {
                username: user.username,
                password: CryptoJS.SHA1(user.password).toString()
            }

            var autorizationHeader = encriptor.encriptToBase64(autorizationString);

            $.ajax({
                url: `https://baas.kinvey.com/user/${APP_ID}/`,
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${autorizationHeader}`
                },
                data: JSON.stringify(reqUser),
                contentType: 'application/json',
                success: function (response) {
                    resolve(response);
                }
            });
        });

        return promise;
    }

    var login = function (logUser) {
        var promise = new Promise(function (resolve, reject) {
            var reqUser = {
                username: logUser.username,
                password: CryptoJS.SHA1(logUser.password).toString()
            };

            var autorizationHeader = encriptor.encriptToBase64(autorizationString);

            $.ajax({
                url: `https://baas.kinvey.com/user/${APP_ID}/login`,
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${autorizationHeader}`
                },
                data: JSON.stringify(reqUser),
                contentType: 'application/json',
                success: function (response) {
                    localStorage.setItem(AUTH_TOKEN, response._kmd.authtoken);
                    localStorage.setItem(USER_NAME, response.username);

                    resolve(response);
                }
            });
        });

        return promise;
    };

    var logout = function () {
        var promise = new Promise(function (resolve, reject) {
            localStorage.removeItem(AUTH_TOKEN);
            localStorage.removeItem(USER_NAME);
            resolve();
        });

        return promise;
    }

    var isUserLogged = function () {
        var username = localStorage.getItem(USER_NAME),
            token = localStorage.getItem(AUTH_TOKEN);

        if (username) {
            return {
                username: username,
                token: token
            }
        }

        return null;
    }

    return {
        register: register,
        login: login,
        logout: logout,
        isUserLogged: isUserLogged
    }
} ());