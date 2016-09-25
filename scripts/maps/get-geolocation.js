const geolocation = (() => {
    function getCurrentGeolocation() {
        return new Promise((resolve, reject) => {
            var options = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };

            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        })
            .then(data => {
                const coords = {
                    lat: data.coords.latitude,
                    lon: data.coords.longitude
                };

                return coords;
            });
    }

    return {
        getCurrentGeolocation
    };
})();

export { geolocation };