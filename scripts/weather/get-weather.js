import {getWeatherOneDay} from './get-current-weather-for-location.js';
import {getWeatherFiveDay} from './get-five-day-weather-for-location.js';
import {getWeatherFourteenDay} from './get-fourteen-day-weather-for-location.js';

const WeatherProvider = (() => {
    class WeatherProvider {
        getForecast(location, duration) {
            switch (duration) {
                case 1:
                    return this._oneDay(location);
                case 5:
                    return this._fiveDay(location);
                case 14:
                    return this._fourteenDay(location);
                default:
                    return new Promise((resolve, reject) => {
                        reject('Invalid input');
                    });
            }
        }

        _oneDay(location) {
            const cached = this._getSessionStorageWeatherDataForLocation(location);            
            if (cached.oneDay) {
                return new Promise((resolve, reject) => {
                    const toResolve = JSON.parse(cached.oneDay.data);
                    resolve(toResolve);
                });
            } else {
                return getWeatherOneDay(location)
                    .then(data => {
                        const oneDayForecast = this._prepDataForStorage(data);
                        cached.oneDay = oneDayForecast;
                        sessionStorage[location] = JSON.stringify(cached);
                        return data;
                    });
            }
        }

        _fiveDay(location) {
            const cached = this._getSessionStorageWeatherDataForLocation(location);            
            if (cached.fiveDay) {
                return new Promise((resolve, reject) => {
                    const toResolve = JSON.parse(cached.fiveDay.data);
                    resolve(toResolve);
                });
            } else {
                return getWeatherFiveDay(location)
                    .then(data => {
                        const fiveDayForecast = this._prepDataForStorage(data);
                        cached.fiveDay = fiveDayForecast;
                        sessionStorage[location] = JSON.stringify(cached);
                        return data;
                    });
            }
        }

        _fourteenDay(location) {
            const cached = this._getSessionStorageWeatherDataForLocation(location);
            if (cached.fourteenDay) {
                return new Promise((resolve, reject) => {
                    const toResolve = JSON.parse(cached.fourteenDay.data);
                    resolve(toResolve);
                });
            } else {
                return getWeatherFourteenDay(location)
                    .then(data => {
                        const fourteenDayForecast = this._prepDataForStorage(data);
                        cached.fourteenDay = fourteenDayForecast;
                        sessionStorage[location] = JSON.stringify(cached);
                        return data;
                    });
            }
        }

        _getSessionStorageWeatherDataForLocation(location) {
            if (!sessionStorage[location]) {
                sessionStorage[location] = JSON.stringify({});
            }

            const cached = JSON.parse(sessionStorage[location]);
            return cached;
        }

        _prepDataForStorage(data) {
            const forecast = {
                data: JSON.stringify(data),
                date: new Date()
            };

            return forecast;
        }
    }

    return WeatherProvider;
})();

export { WeatherProvider };