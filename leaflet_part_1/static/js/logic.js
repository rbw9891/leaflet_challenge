// geojson url
var geoUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_day.geojson";

// function for color gradient
function chooseColor(depth) {
    if (depth < 10.0) return "#90ee90";
    else if (depth >= 10.0 && depth < 30.0) return "#9acd32"; 
    else if (depth >= 30.0 && depth < 50.0) return "#fab733"; 
    else if (depth >= 50.0 && depth < 70.0) return "#ff8e15"; 
    else if (depth >= 70.0 && depth < 90.0) return "#ff4e11"; 
    else return "#ff0d0d";
}

// get data from url
d3.json(geoUrl).then(function (data) {
    // console.log(data.features);
    // call createQuakes function to parse GeoJSON data appropriately and display
    createQuakes(data.features);
});

// apply data to markers on map
function createQuakes(earthquakeData) {

    // onEachFeature function
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h4>Magnitude: ${feature.properties.mag}</h4><h4>Depth: ${feature.geometry.coordinates[2]}`);
    }

    // pointToLayer function
    function createMarkers(feature, latlng) {
        var options = {
            radius: feature.properties.mag*3,
            color: chooseColor(feature.geometry.coordinates[2]),
            fillColor: chooseColor(feature.geometry.coordinates[2]),
            opacity: 0.9
        }
        return L.circleMarker(latlng,options)
    };
    
    // variable that uses leaflet geoJSON method and functions created above
    var quakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: createMarkers
    });

    // create the map with function and geoJSON data from above
    createMap(quakes);
}

function createMap(quakes) {
   

    // create layer to use for map
    var topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });

    // create map
    var myMap = L.map('map', {
        center: [39.738735315486785, -105.01372654942192],
        zoom: 3,
        layers: [topo, quakes]
    });

    // create legend and add to map
    var legend = L.control.legend({
        position: "bottomleft",
        title: "Earthquake Depth",
        opacity: 0.7,
        legends: [{
            label: "<10 km",
            type: "circle",
            color: "#90ee90"
        },
                {
            label: "10-30 km",
            type: "circle",
            color: "#9acd32"
                },
                {
            label: "30-50 km",
            type: "circle",
            color: "#fab733"
                },
                {
            label: "50-70 km",
            type: "circle",
            color: "#ff8e15"
                },
                {
            label: "70-90 km",
            type: "circle",
            color: "#ff4e11"
                },
                {
            label: "90+ km",
            type: "circle",
            color: "#ff0d0d"
                }]
    });

    legend.addTo(myMap);

    
}
