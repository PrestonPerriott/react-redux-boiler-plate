'use strict'

var express = require('express')
var router = express.Router()
var passport = require('passport')
var Auth = require('../Middleware/jwt-auth')

var routeExclusion = [
    '/api/login',
    '/api/register',
    '/api/logout',
    '/api/home'
]

router.all('*', async function (req, res, next) {
    var willExclude = false
    for (var i = 0; i < routeExclusion.length; i++) {
        var route = routeExclusion[i]
        if (route == req.originalUrl) {
            willExclude = true
            break;
        }
    }
    if (willExclude == true) {
        console.log('exclusion url')
        return next()
    } else { ///Where our middleware for ahecking token auth happens 
        passport.use(Auth.jwtStrategy)
        await passport.authenticate('jwt', function(err, user){
            if (err) {
                ///TODO: handle error
                console.log('Failed with error: ' + err)
            } else if (!user) {
                console.log('Unable to find a user with given token');
                return ({error: 'JWT Auth could not find a user with token provided'});
            } else if (user) {
                console.log('Returning the user to client: ' + JSON.stringify(user))
                return (res.send(user))
            } 
        })(req, res, next)
        console.log('Finished Authenticating')
    }
})

module.exports = router