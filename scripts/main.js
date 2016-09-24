import { WeatherApp } from './app/weather-app.js';

const weatherApp = (() => {
    const app = new WeatherApp();

    return app;
})();


$(function () {
    weatherApp.start();
    // sammyApp.run("#/");
});