const models = require('../models/model');
// const search = require('../public/javascripts/restaurant-maps.js');

//TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//FIXME GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyApmqRUl9K_tUZmUR-0Rpk0snnYx7XDaMA'
}); // GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//TODO GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU
//FIXME GET YOUR OWN FUCKING KEY. IF YOU HAND THIS IN I WILL LITERALLY KILL YOU

// var lab = search.labcount;
var x = 0;


module.exports = {

    doSearch: function(req, res){

        // print outs
        console.log("REQ REQ REQ P: " + req.query.postcode);
        console.log("REQ REQ REQ C: "  +req.query.cuisine);
        console.log("REQ REQ REQ K: "  +req.query.keywords);
        console.log("REQ REQ REQ R: "  +req.query.radius);

        var query = {};

        // Cuisine
        var cui =  req.query.cuisine;

        // keyword
        var keyword =  req.query.keywords;

        // Radius
        var radius =  10.0;
        if (radius !== ''){
            radius =  req.query.radius;
        }
        else   {
            radius = 30.0;
        }
        console.log("REQ REQ REQ P: " + req.query.postcode);
        console.log("REQ REQ REQ C: "  +cui);
        console.log("REQ REQ REQ K: "  +keyword);
        console.log("REQ REQ REQ R: "  +radius);

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
                    //const cui = response.json.results[1];
                    //radius searching

                    console.log("BEFORE");
                    console.log(radius);
                    console.log(degrees);

                    // Build Querey
                    var regex = RegExp("/.*" + keyword + ".*/");
                    var degrees = (radius / 69);//convert to lat long.

                    console.log("AFTER");
                    console.log(radius);
                    console.log(degrees);

                    var query1 = {
                        description: new RegExp('^' + keyword),
                        cuisine: cui,
                        lat: {$gt: lat - degrees, $lt: lat + degrees},
                        lng: {$gt: lng - degrees, $lt: lng + degrees}
                    };
                    var query2 = {
                        cuisine: cui,
                        lat: {$gt: lat - degrees, $lt: lat + degrees},
                        lng: {$gt: lng - degrees, $lt: lng + degrees}
                    };
                    var query3 = {
                        description: new RegExp('^' + keyword),
                        lat: {$gt: lat - degrees, $lt: lat + degrees},
                        lng: {$gt: lng - degrees, $lt: lng + degrees}
                    };
                    var query4 = {
                        lat: {$gt: lat - degrees, $lt: lat + degrees},
                        lng: {$gt: lng - degrees, $lt: lng + degrees}
                    };


                    if (keyword !== '' && cui !== ''){
                        query = query1;
                        console.log("Querey 1 chosen: " + query);
                    }
                    if (keyword === '' && cui !== ''){
                        query = query2;
                        console.log("Querey 2 chosen: " + query2);
                    }
                    if (keyword !== '' && cui === ''){
                        query = query3;
                        console.log("Querey 3 chosen: " + query3);
                    }
                    if (keyword === '' && cui === ''){
                        query = query4;
                        console.log("Querey 4 chosen: " + query4);
                        console.log(lat);
                        console.log(lng);
                        console.log(degrees);
                    }

                    // these are the restaurants that match the postcode & cuisine
                    models.Restaurant.find(query, function (err, restaurants) {
                        res.render('search', {
                            query: req.query.postcode,
                            restaurants: restaurants,
                            lat: lat,
                            lng: lng
                        });
                        console.log("RESTAURANTS: " + restaurants + "END");
                    });
                }
            } else {
                res.render('search', { query: "Sorry there was an error with the query: "+req.query.postcode, restaurants: [], lat: 0, lng: 0});
            }
        }); //end of maps section
    }, //end of dosearch

    homePage: function(req, res){
        res.render('index', { title: 'Restaurant Assignment' });
    }

};