//mongod --config /usr/local/etc/mongod.conf
//require mongoose
const mongoose = require('mongoose');

// Review Schema
var schema1 = mongoose.Schema({
    userId: String,
    restaurantId: String,
    rating: Number,
    text: String
});
// Restaurant Schema
var schema2 = mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    address: String,
    text: String,
    phoneNumber: String,
    cuisine: String,
    score: Number,
    url: String
});

// User Schema
var user = mongoose.Schema({
    name: String,
    username: {type: String, index: {unique: true}},
    password: String
});

// export the models
module.exports = {
    Restaurant: mongoose.model('Restaurant', schema2),
    Review : mongoose.model('Review', schema1),
    User : mongoose.model('User', user)
};
