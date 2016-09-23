import {getWeatherOneDay} from './get-current-weather-for-location.js';

const getWeather = (()=> {
    

    return{
        oneDay: getWeatherOneDay
    };
})();

export { getWeather };