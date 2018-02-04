/* global google */
var map;
var uluru = {lat: 38.0400823, lng: -78.5199934};


function initMap() {


    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: uluru
    });

    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function mapResize() {
    console.log("Map Resized")
    google.maps.event.trigger(map, 'resize');
    map.setCenter(uluru)
}