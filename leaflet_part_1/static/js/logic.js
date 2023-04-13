// geojson url
var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";



// get data from url
d3.json(geoUrl).then(function (data) {
    console.log(data.features);
    createQuakes(data.features);
});

// apply data to markers on map
function createQuakes(earthquakeData) {

    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h4>Magnitude: ${feature.properties.mag}</h4>`);
    }

    function createMarkers(feature, latlng) {
        let options = {
            radius: feature.properties.mag*3,
            color: "orange",
            fillColor: "orange",
            opacity: 0.8
        }
        return L.circleMarker(latlng,options)
    };
    

    var quakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarkers
    });

    createMap(quakes);
}

function createMap(quakes) {
   

    // create layer to use for map
    var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // create map
    L.map('map', {
        center: [39.738735315486785, -105.01372654942192],
        zoom: 4,
        layers: [topo, quakes]
    });

    
}
// formatting for all things
    // magnitude = size
    // depth = color (deeper = darker)
    // popups on click w/ additional info
    // legend