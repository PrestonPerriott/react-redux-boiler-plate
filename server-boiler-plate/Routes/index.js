'use strict'

var express = require('express')
var router = express.Router()

router.use('/api/user', require('./user'))
router.use('/api/home', require('./home'))
router.use('/api/login', require('./login'))
router.use('/api/register', require('./register'))

module.exports = router