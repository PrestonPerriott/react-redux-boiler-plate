'use strict'

var express = require('express')
var router = express.Router()
const userController = require('../Controllers/user.ctrl')

router.get('/', async function (req, res, next) {
    
})

router.post('/', async function (req, res, next) {
    userController.loginUser(req, res, next)
})

module.exports = router