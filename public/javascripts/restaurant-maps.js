var map;
var marker;
var counter = ["A", "B", "C"];
var i = 0;
var labcount = counter[i];

// function counterIncrease() {
//     counter++;
// }


function initMap(lat, lng) {
    var myLatLng = {lat: lat, lng: lng}; /*TODO this needs to be changed to the place the person is */
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 14
    });
}

function displayGoogleMaps(name, lat, lng, describ, cuisine, num, url) { //add in the other sections like description to display in label.
    var myLatLng = {lat: lat, lng: lng};
    marker = new google.maps.Marker({
        position: myLatLng,
        label: counter[i],
        animation: google.maps.Animation.DROP,
        map: map,
        title: name
    });
    i++;

    //add a window to the marker
    var contentString = '<div id="content">'+
        '<div id="siteNotice">'+
        '</div>'+
        '<h2 id="firstHeading" class="firstHeading">' + name + '</h2>'+
        '<div id="bodyContent">'+
        '<p><b>' + cuisine + '</b></p>'+
        '<p>' + describ + '</p>'+
        '<p><a href="' + url + '">'+
        'View Restaurant Page</a> '+
        '</p>'+
        '</div>'+
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    marker.addListener('click', function() {
        infowindow.open(map, marker);
    });




}
