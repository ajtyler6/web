const models = require('../models/model');

//TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//FIXME GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyApmqRUl9K_tUZmUR-0Rpk0snnYx7XDaMA'
}); // GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//FIXME GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU

module.exports = {

    doSearch: function(req, res){

        console.log(req.query.postcode);

        googleMapsClient.geocode({
            address: req.query.postcode
        }, function(err, response) {
            if (err) console.error(err);
            if (!err) {

                if(response.json.results[0] === "undefined") {
                    console.err(response.json);
                } else {
                    const lat = response.json.results[0].geometry.location.lat;
                    const lng = response.json.results[0].geometry.location.lng;

                    models.Restaurant.find({lat: {$gt: lat-0.5, $lt: lat+0.5}, lng: {$gt: lng-0.5, $lt: lng+0.5}}, function(err, restaurants){

                        // these are the restaurantsd that match the postcode

                        res.render('search', { query: req.query.postcode, restaurants: restaurants, lat: lat, lng: lng});
                    });
                }
            } else {
                res.render('search', { query: "Sorry there was an error with the query: "+req.query.postcode, restaurants: [], lat: 0, lng: 0});
            }

        });
    },

    homePage: function(req, res){
        res.render('index', { title: 'Restaurant Assignment' });
    }

};