/* global google locations $ */
var map;
var center = { lat: 38.0400823, lng: -78.5199934 };
var markers = [];
var largeInfowindow;

// setup the icons for the map markers
var defaultIcon = {};
var hoverIcon = {};


// The callback function for google maps to initialize and display the map
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeControl: false
    });

    setMarkers();
    showItems();
}

// When sidebar item is selected, populate the info window
function populateInfoWindowForItem(item) {
    // Find marker for item
    for (var i = 0; i < markers.length; i++) {
        if (item.title == markers[i].title) {
            // Populate the info window using the map callback function
            populateInfoWindow(markers[i], largeInfowindow);
            return;
        }
    }
}

// The map callback to populate the info window when a map marker is clicked
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Get Yelp Id for marker
        var yelpId = "";
        for (var i = 0; i < locations.length; i++) {
            if (marker.title == locations[i].title) {
                yelpId = locations[i].yelpId;
                break;
            }
        }
        // animate the selected marker
        marker.setAnimation(google.maps.Animation.DROP);
        
        var myYelpURL = window.location.href + 'api/yelp/' + yelpId;
        // Get Yelp info for the selected item
        $.getJSON(myYelpURL, function(yelpResponse) {

            // Populate the info window from the yelp response
            infowindow.marker = marker;
            infowindow.setContent('<img src="' + yelpResponse.photos[0] + 
                '" class=\'info_Image\'";">' +
                '<div>' + '<i class="fa fa-yelp"></i> ' + 
                yelpResponse.name + '</div>' +
                '<div>' + yelpResponse.phone + '</div>'
            );
            infowindow.open(map, marker);

        });

        // Make sure the marker property is cleared when infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

function setMarkers() {
    // Hide all items before resetting markers based on 'filtered' locations
    hideItems();

    largeInfowindow = new google.maps.InfoWindow();

    // setup the icons for the map markers
    var defaultIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
    };
    var hoverIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: 'blue',
        scale: 6
    };
    // Create map markers for all locations
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

        // Extend the boundaries of the map for each marker 
        // and display the marker
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

// Resize the map when side bar opened / closed
function mapResize() {
    google.maps.event.trigger(map, 'resize');
    map.setCenter(center);
    showItems();
}
