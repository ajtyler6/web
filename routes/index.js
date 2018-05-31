var express = require('express');
var router = express.Router();

const search = require('../controllers/search');
const restaurant = require('../controllers/restaurant');
const review = require('../controllers/review');
const user = require('../controllers/user');
const signin = require('../controllers/signin');

// Shows the home page
router.get('/', function(req, res, next) {
  search.homePage(req, res);
});

// Handles the search
router.get('/search*', function(req, res, next) {
    search.doSearch(req, res);
});

// Shows the create a new restaurant page
router.get('/new-restaurant', function(req, res, next) {
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
router.get('/sign-in', function(req, res, next)  {
    res.render('signin', {log: ""});
});

// Handles the sign in
router.post('/sign-in', function(req, res, next)  {
    signin.signIn(req, res);
});

module.exports = router;
