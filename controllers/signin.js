const models = require('../models/model');

module.exports = {

  signIn: function(req, res, next)  {
    var u = req.body.u;
    var p = req.body.p;
    var log = "logged in";

    models.User.findOne({username: new RegExp(u,"i")}, function (err, results)  {
      if(err) {return console.error(err)};

      console.log(results);
      if(results !== null)  {
        if (u === results.username.toLowerCase() && p === results.password)  {
          req.session.token = results._id;
          //res.redirect(req.session.prevURL);
          res.render('signin', { signedIn: true, log: log, error: "signed in"});
        }
        else  {
          res.render('signin', { signedIn: false,  log: log, error: "Username and password are incorrect"});
        }
      }
      else  {
        res.render('signin', { signedIn: false,  log: log, error: "Incorrect sign-in details"});
      }
    });
  }
}
