/**
 * Created by deyanaleksandrov on 9/23/16.
 */

const getWeatherFourteenDay = function ($cityName) {
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

    function getFourteenDayJSONForCity(cityName) {
        return $.getJSON(
            "http://api.openweathermap.org/data/2.5/forecast/daily?q=" +
            cityName +
            "&cnt=14&mode=json&units=metric&appid=a28f075ad9633624934634a4d49a37c5");
    }
};

export { getWeatherFourteenDay };
