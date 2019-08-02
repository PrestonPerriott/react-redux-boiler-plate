'use strict';

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session =  require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');
const Grid = require('gridfs-stream');
const path = require('path');

var app = express()
dotenv.config({path: '.env'})

var url = 'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
try {
    mongoose.connect(url, {
        //useMongoClient: true,
        useNewUrlParser: true
    })    
} catch (error) {
    ///TODO: Handle error
    console.log("Couldn't connect to DB")
}
var db = mongoose.connection
console.log('Connected to mongo db : ' + url)

///Initialize our stream
let gfs
db.once('open', function(){
    gfs = Grid(db.db, mongoose.mongo)
    gfs.collection('documents')
})

//app.use(validator()) -> Legacy API - Validator is now used differently https://stackoverflow.com/questions/56711444/typeerror-validator-is-not-a-function-after-installing-and-requiring-express
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
//app.use(cookieParser)

//Making our db accessible to the router 
app.use(function(req, res, next) {
    req.db = db
    next()
})

app.use(session({
    secret: (process.env.secret || 'secret'),
    saveUninitialized: true,
    resave: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/api/world', (req, res) => {
    console.log(req.body);
    res.send(
      `I received your POST request. This is what you sent me: ${req.body.post}`,
    );
  });

app.get('/api/logout', (req, res) => {
    console.log(req.body);
    res.send(
      `the fuck out`,
    );
  });
  
app.use(require('./Middleware'));
app.use(require('./Routes')); ///If route has any expection, error middleware needs to come after.


app.use(express.static(path.resolve(__dirname, '..' , 'client/public')))
app.use(express.static(path.resolve(__dirname, '..' ,'node_modules')))
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'client/public', 'index.html'))
})

// Truthy vs Falsey values
// If it has a value it is a truthy value
app.set('port', (process.env.PORT || 8080))
app.listen(app.get('port'), function() {
    console.log('App was started on port: ' + app.get('port'))
})


