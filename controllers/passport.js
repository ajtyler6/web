/*
* Controller to allow Passport to serialise and deserialise user instances to
* and from the session.
* @author Georgia Hardy & Andy Tyler
* @version 1.0 (June 1, 2018)
*/

// load passport module
var LocalStrategy    = require('passport-local').Strategy;
// load up the user model
var User = require('../controllers/user');
//define a varibale for user
var user = 0;

module.exports = function(passport) {
  // passport init setup
  // serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  // deserialize the user
  passport.deserializeUser(function(id, done) {
    models.User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
