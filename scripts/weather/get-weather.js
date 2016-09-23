import {getWeatherOneDay} from './get-current-weather-for-location.js';
import {getWeatherFiveDay} from './get-five-day-weather-for-location.js';
import {getWeatherFourteenDay} from './get-fourteen-day-weather-for-location.js';

const getWeather = (() => {
    return {
        oneDay: getWeatherOneDay,
        fiveDay: getWeatherFiveDay,
        fourteenDay: getWeatherFourteenDay
    };
})();

export { getWeather };