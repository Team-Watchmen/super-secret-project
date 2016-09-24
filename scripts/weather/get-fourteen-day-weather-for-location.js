/**
 * Created by deyanaleksandrov on 9/23/16.
 */

const getWeatherFourteenDay = function ($cityName) {

    // I put a string just for practice, it can work with click event function or input event function, whatever we decide like the other function
    // let $cityName = 'Pernik';

    // 14-day data promise function.
    const functionThatReturnFourteenDayForecastData = (success) => {
        return new Promise((resolve, reject) => {
            if (success) {
                resolve(success)
            }
            else {
                reject('failed')
            }
        });
    };

    return functionThatReturnFourteenDayForecastData(getFourteenDayJSONForCity($cityName));
    // .then(data=> {
    //     // console.log("FOURTEEN-DAY FORECAST for");
    //     // console.log(data.city.name);
    //     console.log(data);

    // })
    // .catch(error =>console.log(error));

    function getFourteenDayJSONForCity(cityName) {
        return $.getJSON("http://api.openweathermap.org/data/2.5/forecast/daily?q="
            + cityName +
            "&cnt=14&mode=json&units=metric&appid=a28f075ad9633624934634a4d49a37c5");
    }
};

export { getWeatherFourteenDay };
