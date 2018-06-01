/*
* Controller allows users to perform a search, there are multiple search bars
* therefore enabling the user to performing different or multiple searchers.
* From this they are then able to see which restaurants within the database are
* relevant for the search based on distance and/or cuisine and/or keywords.
* This information is then outputted to the user in a list and on a map with
* markers showing the location of the restaurants.
* @author Georgia Hardy & Andy Tyler
* @version 1.0 (June 1, 2018)
*/

// require the models file
const models = require('../models/model');

// require google maps in order to output the search onto a map
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyApmqRUl9K_tUZmUR-0Rpk0snnYx7XDaMA'
});

// declaring variable
var x = 0;


module.exports = {

    doSearch: function(req, res){

        // print outs in the console
        console.log("REQ REQ REQ P: " + req.query.postcode);
        console.log("REQ REQ REQ C: "  +req.query.cuisine);
        console.log("REQ REQ REQ K: "  +req.query.keywords);
        console.log("REQ REQ REQ R: "  +req.query.radius);

        var query = {};

        // variable for cuisine
        var cui =  req.query.cuisine;

        // variable for keywords
        var keyword =  req.query.keywords;

        // variable for the radius so that the user can select how large the search is
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

        /* This function acquires the postcode that has being inputted by the user
        * to find their location on the map, the results are then dispayed on the
        * map with a marker.
        */
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

                    // handling the queries
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

                    //show in the console log to ensure working correctly
                    if (keyword !== '' && cui !== ''){
                        query = query1;
                        console.log("Query 1 chosen: " + query);
                    }
                    if (keyword === '' && cui !== ''){
                        query = query2;
                        console.log("Query 2 chosen: " + query2);
                    }
                    if (keyword !== '' && cui === ''){
                        query = query3;
                        console.log("Query 3 chosen: " + query3);
                    }
                    if (keyword === '' && cui === ''){
                        query = query4;
                        console.log("Query 4 chosen: " + query4);
                        console.log(lat);
                        console.log(lng);
                        console.log(degrees);
                    }

                    // These are the restaurants that match the postcode & cuisine
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
