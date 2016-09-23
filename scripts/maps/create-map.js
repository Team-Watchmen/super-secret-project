const maps = (() => {
    // To initialize the map, we need to refer to google maps API in index.html.
    function initializeMap(latitude, longitude, idSelector) {
        const myCenter = new google.maps.LatLng(latitude, longitude)

        // Create map with center and type
        const mapProp = {
            center: myCenter,
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        // Attach it to selector.
        const map = new google.maps.Map((idSelector), mapProp);

        // Get little red marker in map center.
        new google.maps.Marker({
            position: myCenter,
            map: map
        });
    }

    return {
        initializeMap
    };
})();

export { maps };