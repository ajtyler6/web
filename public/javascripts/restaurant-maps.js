var map;
function initMap() {
    var myLatLng = {lat: -25.363, lng: 131.044}; /*TODO this needs to be changed to the place the person is */
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 8
    });
}

function displayGoogleMaps(name, lat, lng) {
var myLatLng = {lat: lat, lng: lng};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: name
        });
}