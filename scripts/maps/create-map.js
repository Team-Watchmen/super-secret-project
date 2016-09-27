const MapProvider = (() => {
    class MapProvider {
        constructor() {

        }

        // To initialize the map, we need to refer to google maps API in index.html.
        initializeMap(latitude, longitude, idSelector) {
            if (!(idSelector instanceof HTMLElement)) {
                idSelector = document.getElementById(idSelector);
            }

            const myCenter = new google.maps.LatLng(latitude, longitude);

            // Create map with center and type
            const mapProp = {
                center: myCenter,
                zoom: 7,
                mapTypeId: google.maps.MapTypeId.HYBRID
            };

            // Attach it to selector.
            const map = new google.maps.Map((idSelector), mapProp);

            // Get little red marker in map center.
            new google.maps.Marker({
                position: myCenter,
                map: map
            });
        }
    }

    return MapProvider;
})();

export { MapProvider };