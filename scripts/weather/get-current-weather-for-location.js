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

    functionThatReturnCurrentWeatherData(getCurrentWeatherForCity($cityName))
        .then(data => {
            //console.log("CURRENT WEATHER for");
            //console.log(data.name);
            //console.log(data);
            return {
                lat: data.coord.lat,
                long: data.coord.lon
            };
        })

        .then(coordinates => {
            console.log(coordinates.lat);
            console.log(coordinates.long);

            initializeMap(coordinates.lat, coordinates.long, locationElement);
        })
        .catch(error => console.log(error));

    function getCurrentWeatherForCity(cityName) {
        return $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&APPID=a28f075ad9633624934634a4d49a37c5');
    }

    // To initialize the map, we need to refer to google maps API in index.html.
    function initializeMap(latitude, longitude, idSelector) {
        let myCenter = new google.maps.LatLng(latitude, longitude),

            // Create map with center and type
            mapProp = {
                center: myCenter,
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        // Attach it to selector.
        let map = new google.maps.Map((idSelector), mapProp);

        // Get little red marker in map center.
        new google.maps.Marker({
            position: myCenter,
            map: map
        });
    }

    return functionThatReturnCurrentWeatherData(getCurrentWeatherForCity($cityName));
};

export {getWeatherOneDay};

