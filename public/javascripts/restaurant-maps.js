function displayGoogleMaps(restaurant) {
var myLatLng = {lat: restaurant.lat, lng: restaurant.lng};
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: restaurant.name
        });
}