
var socket;

function socketInit(){
    socket = io("http://localhost:3000");
    socket.on('send-review', updatePageWithNewReview)
}

function ajaxFunction(event) {
    event.preventDefault();

    $.ajax({
        url: document.URL,
        data: JSON.stringify({
            rating: document.getElementById('rating').value,
            text: document.getElementById('descrip').value
        }),
        contentType: 'application/json',
        type: 'POST',
        dataType: "json",

        success: function (data) {

            console.log(data);

            socket.emit("new-input", data);

        },

        error: function (xhr, status, error) {
            // don't do anything lol
        }
    });
}

function updatePageWithNewReview(data){

    if (document.URL.includes(data.review.restaurantId)) {
        $( "body" ).append( "<div>\n" +
            "UserId: "+ data.review.userId+" <br>\n" +
            "Rating: "+ data.review.rating+" <br>\n" +
            "Text: "+ data.review.text+" <br>\n" +
            "</div><br>" );
    } else {
        console.log("a restuarant that is not this one received an update");
    }

}