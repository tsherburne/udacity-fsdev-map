/* global google locations */
var map;
var center = {lat: 38.0400823, lng: -78.5199934};
var initialBounds;
var markers = [];


function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeControl: false
    });
    
    setMarkers();
    showItems();
    
    // save the initial bounds of the map
    initialBounds = map.getBounds();

}

function setMarkers() {
    // Hide all items before resetting markers based on 'filtered' locations
    hideItems();
    
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    id: i
        });
        markers.push(marker);
    }
}

// This function will loop through the markers array and display them all.
function showItems() {
    if (markers.length > 0) {
        var bounds = new google.maps.LatLngBounds();
    
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    }
    else {
        // no markers - just blank map at initial zoom level
        map.setZoom(13);    
    }
}

// This function will loop through the items and hide them all.
function hideItems() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function mapResize() {
    console.log("Map Resized");
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
    showItems();
}