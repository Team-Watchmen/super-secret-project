Handlebars.registerHelper("dateDisplayFix", function (dateInUnix) {

    return (new Date(dateInUnix * 1000)).toUTCString().substr(0, 16)
});

Handlebars.registerHelper("numberToOneDigitDisplayFix", function (numberToBeFixed) {

    return Number(numberToBeFixed).toFixed(1)
});

// Could be use and could not be used. Up to us.
Handlebars.registerHelper("displayWeatherIcon", function (iconNumber) {

    return ("http://openweathermap.org/img/w/" + iconNumber + ".png")
});