/*
* Controller to create a user for this system. Each user must enter the relevant
* information in order for an account to be created for them.
* @author Georgia Hardy & Andy Tyler
* @version 1.0 (June 1, 2018)
*/

// require the models file
const models = require('../models/model');

module.exports = {

    signUp: function(req, res) {

        // User Schema
        const user = new models.User({
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        });

        // Saving user to the database and also displaying error if encounted.
        user.save(function(err, user){
            if(err){
                res.send("There was an error signing you up: "+err);
            } else {
                res.redirect('/');
            }
        });

    }

};
