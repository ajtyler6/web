const models = require('../models/model');
const googleMapsClient = require('@google/maps').createClient({
    key: 'AIzaSyAS-rdEkY_sqFv2AjbRIHIsnMon6JXbg1E'
});
module.exports = {

    doSearch: function(req, res){
        var query = {};
        var cui =  req.query.cuisine;        // Cuisine
        var keyword =  req.query.keywords;        // keyword
        var radius =  10.0;        // Radius
        if (radius !== ''){
            radius =  req.query.radius;
        }
        else   {
            radius = 30.0;
        }
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

                    // Build Query
                    var regex = RegExp("/.*" + keyword + ".*/");
                    var degrees = (radius / 69); //convert miles to lat long.

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
                    }
                    if (keyword === '' && cui !== ''){
                        query = query2;
                    }
                    if (keyword !== '' && cui === ''){
                        query = query3;
                    }
                    if (keyword === '' && cui === ''){
                        query = query4;
                    }

                    // these are the restaurants that match the params
                    models.Restaurant.find(query, function (err, restaurants) {
                        res.render('search', {
                            query: req.query.postcode,
                            restaurants: restaurants,
                            lat: lat,
                            lng: lng
                        });
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