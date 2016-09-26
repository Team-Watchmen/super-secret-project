import { loadFacebookSDK } from './facebook/load-facebook-sdk.js';
import { WeatherApp } from './app/weather-app.js';

const weatherApp = (() => {
    const app = new WeatherApp();

    return app;
})();

$(function () {
    loadFacebookSDK.load();
    weatherApp.start();
});