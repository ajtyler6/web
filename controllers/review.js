/*
* The function below allows users to write reviews for the restaurants, this
* includes adding a rating for the restaurent before it is saved on the server.
* @author Georgia Hardy & Andy Tyler
* @version 1.0 (June 1, 2018)
*/

// requires the models file
const models = require('../models/model');


module.exports = {

    writeReview: function(req, res) {

        // information needed for the review
        const review = new models.Review({
            userId: "do this when implemented",
            restaurantId: req.query.token,
            rating: req.body.rating,
            text: req.body.text
        });

        // saving the review
        review.save(function (err, review) {
            if (err) return console.error(err);
            // send the restaurant page
            res.send(JSON.stringify({review: review}));
        });
    }
}
