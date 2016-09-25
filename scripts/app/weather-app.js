import { MapProvider } from '../maps/create-map.js';
import { UsersManager } from '../kinvey/users.js';
import { WeatherProvider } from '../weather/get-weather.js';

import { ProfileScreen } from '../profile/profileScreen.js';
import { TemplatesProvider } from '../kinvey/templates.js';

const WeatherApp = (() => {
    let users,
        weather,
        maps,
        templates,
        profileScreen;

    class WeatherApp {
        constructor() {
            maps = new MapProvider();
            users = new UsersManager();
            weather = new WeatherProvider();
            templates = new TemplatesProvider();
            profileScreen = new ProfileScreen();

            this.__app__ = this.__initializeSammyApp__();
        }

        start() {
            this.__app__.run('#/');
        }

        __initializeSammyApp__() {
            var sammyApp = Sammy("#content", function () {
                var $content = $("#content"),
                    $weatherInfo = $("#weather");

                this.get("#/", function () {
                    $content.html("GOsho");
                    var loggedUser = users.isUserLogged();
                    if (loggedUser) {
                        $content.html(loggedUser.username);

                        users.getUserLocations()
                            .then(function (response) {
                                console.log(response);
                            });

                        //Test non-added location
                        var locationName = "Gorna Banq";
                        users.setUserLocations(locationName)
                            .then(function (response) {
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
                                var logUser = {
                                    username: $('#username').val(),
                                    password: $('#password').val()
                                };

                                users.login(logUser)
                                    .then(function (response) {
                                        context.redirect('#/profile');
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
                    startProfileScreen();
                });

                this.get('#/profile/:location/:duration', function (route) {
                    // Display weather location
                    // for params.location
                    // with params.duration
                    const profileScreen = $('#profile-screen');
                    if (profileScreen.length === 0) {
                        startProfileScreen();
                    }

                    Promise.all([
                        weather.getForecast(route.params.location, 14),
                        templates.get("fourteen-day")
                    ])
                        .then(([data, template]) => {
                            const generatedHtml = template(data);
                            $("#weather").html(generatedHtml);
                            return data;
                        })
                        .then(data => {
                            maps.initializeMap(
                                data.city.coord.lat,
                                data.city.coord.lon,
                                document.getElementById('map-container')
                            );
                        });
                });

                this.get('#/profile/add', function (route) {
                    const newLocation = $('#input-location').val();
                    if (!newLocation) {
                        return;
                    }

                    users.setUserLocations(newLocation);
                    startProfileScreen();
                    window.location = `#/profile/${newLocation}/1`;
                });

                function startProfileScreen() {
                    profileScreen.start('#content');
                    profileScreen.displayLocationsListForUser('#location-list');
                }
            });

            //logout
            $("#nav-btn-logout").on("click", function () {
                users.logout()
                    .then(function () {
                        location = "#/";
                        document.location.reload(true);
                    });
            });

            return sammyApp;
        }
    }

    return WeatherApp;
})();

export { WeatherApp };