const models = require('../models/model');

module.exports = {

    signUp: function(req, res) {

        // User Schema
        const user = new models.User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        user.save(function(err, user){
            if(err){
                res.send("There was an error signing you up: "+err);
            } else {
                res.redirect('/');
            }
        });

    }

}