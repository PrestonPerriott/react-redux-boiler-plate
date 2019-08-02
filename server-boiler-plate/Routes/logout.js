'use strict'

var express = require('express')
var router = express.Router()
const userController = require('../Controllers/user.ctrl')

router.get('/', async function (req, res, next) {
    userController.logoutUser(req, res, next)
})

module.exports = router;