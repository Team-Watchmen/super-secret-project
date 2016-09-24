import {getWeatherOneDay} from './get-current-weather-for-location.js';
import {getWeatherFiveDay} from './get-five-day-weather-for-location.js';
import {getWeatherFourteenDay} from './get-fourteen-day-weather-for-location.js';

const WeatherProvider = (() => {
    class WeatherProvider {
        constructor() {

        }

        getForecast(location, duration) {
            switch (duration) {
                case 1:
                    return getWeatherOneDay(location);
                case 5:
                    return getWeatherFiveDay(location);
                case 14:
                    return getWeatherFourteenDay(location);
                default:
                    return new Promise((resolve, reject) => {
                        resolve('Invalid input');
                    });
            }
        }
    }
    
    return WeatherProvider;
})();

export { WeatherProvider };