'use strict'

var express =  require('express')
var router = express.Router()
const userController = require('../Controllers/user.ctrl')

router.get('/', async function (req, res, next) {
    next()
})

router.get('/:id', async function (req, res, next){
    console.log(req.params.id)
})

router.post('/', async function (req, res, next) {
    userController.registerUser(req, res, next)
}) 
module.exports = router

