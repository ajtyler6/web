/*
* Index controls were the system directs the user to.
* @author Georgia Hardy & Andy Tyler
* @version 1.0 (June 1, 2018)
*/

// require the express API
const express = require('express');
// declare the router variable
var router = express.Router();
// require the passport API
const passport = require("passport");
// require the express sessions API
const session = require('express-session')
const app = express()
// require passport local which is module in passport
var LocalStrategy = require('passport-local').Strategy;

// require the search controller
const search = require('../controllers/search');
// require the restaurant controller
const restaurant = require('../controllers/restaurant');
// require the review controller
const review = require('../controllers/review');
// require the user controller
const user = require('../controllers/user');
// require the sign in controller
const signin = require('../controllers/signin');
// require the passport controller
const passport_user = require('../controllers/passport');

// Shows the home page
router.get('/', function(req, res, next) {
  search.homePage(req, res);
});

// Handles the search
router.get('/search*', function(req, res, next) {
    search.doSearch(req, res);
});

// Shows the create a new restaurant page
router.get('/new-restaurant', passport.authenticate('local-signin', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
    res.render('new-restaurant', { });
});


// Handles creating a new restaurant
router.post('/new-restaurant', function(req, res, next) {
    restaurant.createRestaurant(req, res);
});

// Shows a restaurant
router.get('/restaurant*', function(req, res, next) {
    restaurant.showRestaurant(req, res);
});

// Handles a review on a restaurant
router.post('/restaurant*', function(req, res, next) {
    review.writeReview(req, res);
});

// Shows the sign up page
router.get('/sign-up', function(req, res, next) {
    res.render('signup', {});
});

// Handles the sign up
router.post('/sign-up', function(req, res, next) {
    user.signUp(req, res);
});

// Shows the sign in page
router.get('/sign-in', function(req, res) {
  // Display the Login page with any flash message, if any
  res.render('signin', { message: req.flash('message') });
});

// Handles the sign in page
router.post('/sign-in', passport.authenticate('signin', {
  successRedirect: '/',
  failureRedirect: '/sign-in',
  failureFlash : true
}));

module.exports = router;
