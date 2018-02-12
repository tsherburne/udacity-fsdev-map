// globals
var google, locations, $, document, setMarkers, showItems,
    populateInfoWindow, window, hideItems;

var map;
var center = { lat: 38.0400823, lng: -78.5199934 };
var markers = [];
var largeInfowindow;

// setup the icons for the map markers
var defaultIcon = {};
var hoverIcon = {};


// The callback function for google maps to initialize and display the map
function initMap() {
    "use strict";
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: center,
        mapTypeControl: false
    });

    setMarkers();
    showItems();
}

// When sidebar item is selected, populate the info window
function populateInfoWindowForItem(item) {
    "use strict";
    var i = 0;
    // Find marker for item
    for (i = 0; i < markers.length; i += 1) {
        if (item.title === markers[i].title) {
            // Populate the info window using the map callback function
            populateInfoWindow(markers[i], largeInfowindow);
            return;
        }
    }
}

// The map callback to populate the info window when a map marker is clicked
function populateInfoWindow(marker, infowindow) {
    "use strict";
    var i = 0, yelpId = "", myYelpURL = "";
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker !== marker) {
        // Get Yelp Id for marker
        for (i = 0; i < locations.length; i += 1) {
            if (marker.title === locations[i].title) {
                yelpId = locations[i].yelpId;
                break;
            }
        }
        // animate the selected marker
        marker.setAnimation(google.maps.Animation.DROP);

        myYelpURL = window.location.href + "api/yelp/" + yelpId;
        // Get Yelp info for the selected item
        $.getJSON(myYelpURL, function (yelpResponse) {

            // Populate the info window from the yelp response
            infowindow.marker = marker;
            infowindow.setContent("<img src='" + yelpResponse.photos[0] +
                "' class=\"info_Image\"';'>" +
                "<div>" + "<i class='fa fa-yelp'></i> " +
                yelpResponse.name + "</div>" +
                "<div>" + yelpResponse.phone + "</div>"
                );
            infowindow.open(map, marker);
        });

        // Make sure the marker property is cleared when infowindow is closed.
        infowindow.addListener("closeclick", function () {
            infowindow.marker = null;
        });
    }
}

function setMarkers() {
    "use strict";
    var defaultIcon, hoverIcon, i, position, title, marker;
    // Hide all items before resetting markers based on 'filtered' locations
    hideItems();

    largeInfowindow = new google.maps.InfoWindow();

    // setup the icons for the map markers
    defaultIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 5
    };
    hoverIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "blue",
        scale: 6
    };
    // Create map markers for all locations
    for (i = 0; i < locations.length; i += 1) {
        // Get the position from the location array.
        position = locations[i].location;
        title = locations[i].title;

        marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            icon: defaultIcon
        });
        markers.push(marker);
        marker.addListener("mouseover", function () {
            this.setIcon(hoverIcon);
        });
        marker.addListener("mouseout", function () {
            this.setIcon(defaultIcon);
        });
        marker.addListener("click", function () {
            populateInfoWindow(this, largeInfowindow);
        });
    }
}

// loop through the markers array and display them all
function showItems() {
    "use strict";
    var bounds, i;
    if (markers.length > 0) {
        bounds = new google.maps.LatLngBounds();

        // Extend the boundaries of the map for each marker
        // and display the marker
        for (i = 0; i < markers.length; i += 1) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    } else {
        // no markers - just blank map at initial zoom level
        map.setZoom(13);
    }
}

// This function will loop through the items and hide them all.
function hideItems() {
    "use strict";
    var i;
    for (i = 0; i < markers.length; i += 1) {
        markers[i].setMap(null);
    }
    markers = [];
}

// Resize the map when side bar opened / closed
function mapResize() {
    "use strict";
    google.maps.event.trigger(map, "resize");
    map.setCenter(center);
    showItems();
}
