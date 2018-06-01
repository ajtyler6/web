// load passport module
      var LocalStrategy    = require('passport-local').Strategy;
      // load up the user model
      var User = require('../controllers/user');
      var user = 0;

      module.exports = function(passport) {
          // passport init setup
          // serialize the user for the session
          passport.serializeUser(function(user, done) {
              done(null, user.id);
          });
          //       deserialize the user
          passport.deserializeUser(function(id, done) {
              User.findById(id, function(err, user) {
                  done(err, user);
              });
          });
      };
