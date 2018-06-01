const models = require('../models/model');
var app = require('express')();


const reviews = require('../controllers/review');

//TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//FIXME GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyApmqRUl9K_tUZmUR-0Rpk0snnYx7XDaMA'
}); //TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//FIXME GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU

module.exports = {

    createRestaurant: function(req, res) {
        console.log(req.body);

        const name = req.body.name;
        const post = req.body.postcode;
        const door = req.body.doorno;
        const phno = req.body.phonenumber;
        const desc = req.body.descrip;
        const url  = req.body.url;
        const type =req.body.cuisine;
        const score =req.body.score;

        googleMapsClient.geocode({
            address: post
        }, function(err, response) {
            if (err) console.error(err);
            if (!err) {

                if(response.json.results[0] === "undefined") {
                    console.err(response.json);
                } else {
                    const lat = response.json.results[0].geometry.location.lat;
                    const lng = response.json.results[0].geometry.location.lng;

                    const restaurant = new models.Restaurant({
                        name: name,
                        lat: lat,
                        lng: lng,
                        address: door+ ', ' + post,
                        text: desc,
                        phoneNumber: phno,
                        cuisine: type,
                        score: score,
                        url: url
                    });

                    restaurant.save(function (err, restaurant) {
                        if (err) return console.error(err);
                        // send the restaurant page
                        res.redirect('/restaurant-'+name+'?token='+restaurant._id);
                    });

                }
            } else {
                res.send("There was an error creating the restaurant");
            }
        });



        // create a new restaurant

        //res.send(req.body);

    },

    showRestaurant: function(req, res) {
        console.log(req.query.token);

        console.log('SERVERSIDE: in show restaurant 3');
        models.Restaurant.find({_id:req.query.token}, function(err, restaurant){

            if (restaurant.length !== 0) {
                models.Review.find({restaurantId: restaurant[0]._id}, function(err, reviews){
                    res.render('restaurant', {restaurant: restaurant[0], reviews: reviews});
                });
            }

        });


    }

};
