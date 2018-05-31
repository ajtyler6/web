const models = require('../models/model');

module.exports = {

    writeReview: function(req, res) {

        const review = new models.Review({
            userId: "do this when implemented",
            restaurantId: req.query.token,
            rating: req.body.rating,
            text: req.body.text
        });

        review.save(function (err, review) {
            if (err) return console.error(err);
            // send the restaurant page
            res.send(JSON.stringify({review: review}));
        });

    }

}