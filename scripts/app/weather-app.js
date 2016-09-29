import {MapProvider} from '../maps/create-map.js';
import {UsersManager} from '../kinvey/users.js';
import {WeatherProvider} from '../weather/get-weather.js';

import {ProfileScreen} from '../profile/profileScreen.js';
import {TemplatesProvider} from '../kinvey/templates.js';

import {geolocation} from '../maps/get-geolocation.js';

const WeatherApp = (() => {
    let users,
        weather,
        maps,
        templates,
        profileScreen;

    class WeatherApp {
        constructor(contentContainerId) {
            maps = new MapProvider();
            users = new UsersManager();
            weather = new WeatherProvider();
            templates = new TemplatesProvider();
            profileScreen = new ProfileScreen();

            this._contentContainer = $(contentContainerId);
            this.__app__ = this.__initializeSammyApp__();
        }

        start() {
            const isUserLoggedIn = users.isUserLogged();
            if (isUserLoggedIn) {
                $(document.body).addClass("logged-in");
            } else {
                $(document.body).removeClass("logged-in");
            }

            this.__app__.run('#/');
        }

        __initializeSammyApp__() {
            const that = this;

            var sammyApp = Sammy("#content", function () {
                var $content = $("#content"),
                    $weatherInfo = $("#weather");

                this.get("#/", function () {
                    Promise.all([
                        templates.get('home-screen'),
                        templates.get('current-weather'),
                        weather.getForecast('Paris', 1),
                        weather.getForecast('New York', 1),
                        weather.getForecast('Tokyo', 1)
                    ])
                        .then(([screen, template, paris, ny, tokyo]) => {
                            const data = {
                                a: template(paris),
                                b: template(ny),
                                c: template(tokyo)
                            };

                            const html = screen(data);
                            that._contentContainer.html(html);
                        });
                });

                this.get("#/login", function (context) {
                    if (users.isUserLogged()) {
                        context.redirect('#/');
                        toastr.success("", "You logged in already!", { "positionClass": "toast-bottom-left", });
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
                                        $(document.body).addClass("logged-in");

                                        context.redirect('#/profile');
                                    })
                                    .catch(function (ex) {
                                        toastr.info(ex, { "positionClass": "toast-bottom-left", });
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
                                };

                                users.register(newUser)
                                    .then(function (response) {
                                        context.redirect('#/login');
                                    })
                                    .catch(function (ex) {
                                        toastr.info(ex, { "positionClass": "toast-bottom-left", });
                                    });

                                toastr.success("Congrats on your registration!");
                            });
                        });
                });


                this.get('#/profile', function () {
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

                    let templateName;
                    let duration = Number(route.params.duration);
                    if (isNaN(duration)) {
                        duration = 14;
                    }

                    switch (duration) {
                        case 1:
                            templateName = 'current-weather';

                            break;
                        case 5:
                            templateName = 'five-day';
                            break;
                        case 14:
                            templateName = 'fourteen-day';
                            break;
                        default:
                            return;
                    }

                    Promise.all([
                        weather.getForecast(route.params.location, duration),
                        templates.get(templateName),

                    ])
                        .then(([data, template]) => {
                            const generatedHtml = template(data);
                            $("#weather-tiles").html(generatedHtml);
                            return data;
                        })
                        .then(data => {
                            try {
                                const idSelector = document.getElementById('map-container');
                                idSelector.style.height = (window.innerHeight - 75) + 'px';
                                idSelector.style.width = '100%';

                                maps.initializeMap(
                                    data.city.coord.lat,
                                    data.city.coord.lon,
                                    idSelector
                                );
                            } catch (error) {

                            }
                        })
                        .then(() => {
                            const windowLocation = String(window.location);
                            const cityName = extractCityNameFromCurrentWindowLocation();

                            const container = $(that._contentContainer);
                            container
                                .find('#one-day-forecast')
                                .attr('href', `#/profile/${cityName}/1`);

                            container
                                .find('#five-day-forecast')
                                .attr('href', `#/profile/${cityName}/5`);

                            container
                                .find('#fourteen-day-forecast')
                                .attr('href', `#/profile/${cityName}/14`);

                            container
                                .find('#current-weather')
                                .addClass('panel-default')
                                .removeClass('panel-primary');

                            container
                                .find('#twttr-share')
                                .attr('href', 'https://twitter.com/intent/tweet?text=' +
                                `Team Watchmen Weather forecast for ${cityName} ` +
                                windowLocation);
                        })
                        .catch(console.log);

                    function extractCityNameFromCurrentWindowLocation() {
                        const windowLocation = String(window.location);
                        const locationElements = windowLocation.split('/');
                        const numberOfElements = locationElements.length;
                        const cityName = locationElements[numberOfElements - 2];

                        return cityName;
                    }
                });

                this.get('#/profile/add', function (route) {
                    const newLocation = $('#input-location').val();
                    if (!newLocation) {
                        return;
                    }

                    users.setUserLocations(newLocation)
                        .then(function () {
                            startProfileScreen();
                            window.location = `#/profile/${newLocation}/1`;
                        })
                        .catch(function (ex) {
                            toastr.info(ex, { "positionClass": "toast-bottom-left", });
                        });
                });

                function startProfileScreen() {
                    profileScreen.start('#content');
                    profileScreen.displayLocationsListForUser('#location-list');
                }
            });

            //logout
            $("#nav-btn-logout").on("click", function () {
                if (users.isUserLogged()) {
                    users.logout()
                        .then(function () {
                            $(document.body).remove("logged-in");
                            window.location = '#/';
                        });
                    toastr.info("", "You just logged out!", { "positionClass": "toast-bottom-left", });
                } else {
                    toastr.info("So, no need to log out :)", "You are not logged in!", { "positionClass": "toast-bottom-left", });
                }
            });

            return sammyApp;
        }
    }

    return WeatherApp;
})();

export {WeatherApp};