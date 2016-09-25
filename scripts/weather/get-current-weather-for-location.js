/**
 * Created by deyanaleksandrov on 9/23/16.
 */
const getWeatherOneDay = function ($cityName) {
    // Current weather data promise function.
    const functionThatReturnCurrentWeatherData = (data) => {
        return new Promise((resolve, reject) => {
            if (data) {
                resolve(data);
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

