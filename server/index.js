var express = require('express');
var mongoose = require('mongoose');

// Connection URL
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

var passport = require('passport');

//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

require('./config/seed');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.use('/static', express.static('client'));
app.use('/bower_components', express.static('bower_components'));

//config and setup passport
require('./auth').passportConfig(passport);
app.use(passport.initialize());
app.use(passport.session());

//configure routes
require('./routes')(app);
// All other routes should redirect to the index.html

app.listen(3000, function () {
    console.log("Server started at port 3000"); //eslint-disable-line
});