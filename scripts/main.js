import {users} from './kinvey/users.js';
import {books} from './kinvey/books.js';
import {templates} from './kinvey/templates.js';

var sammyApp = Sammy("#content", function () {
    var $content = $("#content");

    this.get("#/", function () {
        $content.html("GOsho");
        var loggedUser = users.isUserLogged();
        if (loggedUser) {
            $content.html(loggedUser.username);

            users.getUserLocations()
                        .then(function(response) {
                            console.log(response);
                        });
            
            //Test non-added location
            var locationName = "Gorna Banq";
            users.setUserLocations(locationName)
                .then(function(response) {
                    console.log(response);
                });
        }
    });

    this.get("#/login", function (context) {
        if (users.isUserLogged()) {
            context.redirect('#/');
            return;
        }

        templates.get("login")
            .then(function (template) {
                $content.html(template());

                $("#btn-login").on("click", function () {
                    console.log("login");

                    var logUser = {
                        username: $('#username').val(),
                        password: $('#password').val()
                    };

                    users.login(logUser)
                        .then(function (response) {
                            context.redirect('#/');
                            document.location.reload(true);
                        });
                });
            });
    });

    this.get("#/register", function (context) {
        if (users.isUserLogged()) {
            context.redirect('#/');
            return;
        }

        templates.get("register")
            .then(function (template) {
                $content.html(template());

                $("#btn-register").on("click", function () {
                    console.log("register");

                    var newUser = {
                        username: $('#new-username').val(),
                        password: $('#new-username').val()
                    }

                    users.register(newUser)
                        .then(function (response) {
                            context.redirect('#/');
                            document.location.reload(true);
                        });
                });
            });
    });


    this.get('#/profile', function () {
        // Profile Screen
            // No locations added version.
            // Locations List section.
            // Weather display section.
            // Add location section
    });

    this.get('#/profile/:location/:duration', function (params) {
        // Display weather location
            // for params.location
            // with params.duration
    });
});

//logout
$("#nav-btn-logout").on("click", function () {
    users.logout()
        .then(function () {
            location = "#/";
            document.location.reload(true);
        });
});

$(function () {
    sammyApp.run("#/");
});