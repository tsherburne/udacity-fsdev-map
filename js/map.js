/* global google locations */
var map;
var center = {lat: 38.0400823, lng: -78.5199934};
var initialBounds;
var markers = [];
var iconBase = 'https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png';



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

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

function setMarkers() {
    // Hide all items before resetting markers based on 'filtered' locations
    hideItems();
 
    var defaultIcon = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        scale: 5
    }          
    var hoverIcon = {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        strokeColor: 'blue',
        scale: 5
    }
    
    var largeInfowindow = new google.maps.InfoWindow();
    
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;

        var marker = new google.maps.Marker({
                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    icon: defaultIcon
                });
        markers.push(marker);
            marker.addListener('mouseover', function() {
            this.setIcon(hoverIcon);
            });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        });
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
          });
    }
}

// loop through the markers array and display them all
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