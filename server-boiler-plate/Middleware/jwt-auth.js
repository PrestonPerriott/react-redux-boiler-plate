'use strict'

var jwt = require('jsonwebtoken');
var User = require('../Models/user');
var passportJWT = require('passport-jwt');
var strategyJWT = passportJWT.Strategy;

var jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_SECRET;
///set a custom function for retriveing the token from headers
jwtOptions.jwtFromRequest = function(req) {
    var token = null;
    if (req && req.headers) {
        console.log('Attempting to decode token from headers : %j', req.headers + '\n');
        token = req.headers['authorization'];
        console.log('The token is : ' + token);
    }
    return token;
};

///Signing the token against specific values
module.exports.tokenize = async function(user) {
    var token = await jwt.sign({'id' : user.id, 'name' : user.name}, jwtOptions.secretOrKey, {
        expiresIn: '1d'
    })
    return token
};

///We call our strategy when an endpoint is hit that should be blocked/not in the exclusion list
///using our secret and our jwtFromRequest to decode
module.exports.jwtStrategy = new strategyJWT(jwtOptions, async function(jwtRes, next) {

    ///The secondary function is only called if the token was decoded correctly i.e not null or undefined
    let foundUser = await User.getUserFromID(jwtRes.id);
    let stripped = await User.stripToJSON(foundUser);
    if (foundUser != null) {
        next(null, stripped);
    } else {
        let err = new Error();
        err.message = 'Failed to find user with given ID';
        next(err, null);
    }
});