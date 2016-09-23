/**
 * Created by deyanaleksandrov on 9/23/16.
 */
$(function(){

    // Put a string just for practice, it can work with click event function or input event function, whatever we decide.
    var $cityName = 'Tokyo';

    // Current weather data promise function.
    const functionThatReturnCurrentWeatherData = (success) => {
        return new Promise((resolve, reject) => {
            if (success) {
                resolve(success)
            }
            else {
                reject('failed')
            }
        })
    };


    functionThatReturnCurrentWeatherData(getCurrentWeatherForCity($cityName))
        .then(data=>console.log(data))
        .catch(error =>console.log(error));


    function getCurrentWeatherForCity(cityName){
        return $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&APPID=a28f075ad9633624934634a4d49a37c5');
    }
});