/**
 * Created by deyanaleksandrov on 9/23/16.
 */

$(function () {

    // I put a string just for practice, it can work with click event function or input event function, whatever we decide like the other function
    var $cityName = 'Pernik';

    // 5 day data promise function.
    const functionThatReturnFiveDayForecastData = (success) => {
        return new Promise((resolve, reject) => {
            if (success) {
                resolve(success)
            }
            else {
                reject('failed')
            }
        })
    };

    functionThatReturnFiveDayForecastData(getFiveDayJSONForCity($cityName))
        .then(data=> {
            // console.log("FOURTEEN-DAY FORECAST for");
            // console.log(data.city.name);
            console.log(data);

        })
        .catch(error =>console.log(error));


    function getFiveDayJSONForCity(cityName) {
        return $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="
            + cityName +
            "&cnt=14&mode=json&units=metric&appid=a28f075ad9633624934634a4d49a37c5");
    }
});