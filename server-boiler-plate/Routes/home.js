'use strict'

var express = require('express')
var router = express.Router()

router.get('/', async function (req, res, next){
    // console.log('Our req from home is: ' + req + '\n');
    // console.log('Our res from home is: ' + res + '\n');
})

module.exports = router