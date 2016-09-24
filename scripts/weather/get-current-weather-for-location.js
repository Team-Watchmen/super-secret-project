/**
 * Created by deyanaleksandrov on 9/23/16.
 */
const getWeatherOneDay = function ($cityName, locationElement) {

    // I put a string just for practice, it can work with click event function or input event function, whatever we decide.
    // let $cityName = 'Tokyo',
    //     locationElement = document.getElementById("location-element");
    locationElement = locationElement || document.getElementById("location-element");

    // Current weather data promise function.
    const functionThatReturnCurrentWeatherData = (success) => {
        return new Promise((resolve, reject) => {
            if (success) {
                resolve(success);
            }
            else {
                reject('failed');
            }
        });
    };

    function getCurrentWeatherForCity(cityName) {
        return $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&APPID=a28f075ad9633624934634a4d49a37c5');
    }

    return functionThatReturnCurrentWeatherData(getCurrentWeatherForCity($cityName));
};

export {getWeatherOneDay};

