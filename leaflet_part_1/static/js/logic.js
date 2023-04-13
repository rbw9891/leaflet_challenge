// geojson url
var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";



// get data from url
d3.json(geoUrl).then(function (data) {
    console.log(data.features);
});

// apply data to markers on map
function createQuakes(earthquakeData) {
    var quakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature
    });

    createMap(quakes);
}

function createMap(quakes) {
    // create map
    var myMap = L.map('map', {
        center: [39.738735315486785, -105.01372654942192],
        zoom: 4
    });

    // create layer to use for map
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(myMap);
}
// formatting for all things
    // magnitude = size
    // depth = color (deeper = darker)
    // popups on click w/ additional info
    // legend