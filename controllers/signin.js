const models = require('../models/model');
const passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
const passport_user = require('../controllers/passport');

passport.use('signin', new LocalStrategy({
        passReqToCallback : true
    },
    function(req, username, password, done) {
        // check in mongo if a user with username exists or not
        models.User.findOne({ 'username' :  username },
            function(err, user) {
                // In case of any error, return using the done method
                if (err)
                    return done(err);
                // Username does not exist, log error & redirect back
                if (!user){
                    console.log('User Not Found with username '+username);
                    return done(null, false,
                        req.flash('message', 'User Not found.'));
                }
                // User and password both match, return user from
                // done method which will be treated like success
                return done(null, user);
            }
        );
    }));
