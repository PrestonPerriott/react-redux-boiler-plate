'use strict'

var express = require('express')
var router = express.Router()
const userController = require('../Controllers/user.ctrl')

/* Passport should fill in the req.user object for us
So, we technically should be able to just req.user.id
and then find by id */

//Get a user
router.get('/:id', async function (req, res, next) {
    userController.getUser(req, res, next)
})

///Get a user profile
router.get('/profile/:id', async function (req, res, next) {
    userController.getProfile(req, res, next)
})

///Update user profile
router.post('/profile', async function (req, res, next) {
    userController.updateProfile(req, res, next)
})

module.exports = router