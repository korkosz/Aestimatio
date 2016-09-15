var express = require('express');
var mongoose = require('mongoose');
var path = require('path');

// Connection URL
var url = 'mongodb://localhost:27017/test';
mongoose.connect(url);

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static('client'));


app.use(passport.initialize());
app.use(passport.session());

var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
    username: String,
    password: String
});

AccountSchema.plugin(passportLocalMongoose);
var Account = mongoose.model('Account', AccountSchema);
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



app.get('/', function (req, res) {
    res.sendFile(path.resolve('client/index.html'));
});
app.get('/login', function (req, res) {
    res.sendFile(path.resolve('client/app/account/login.html'));
});
app.get('/register', function (req, res) {
    res.sendFile(path.resolve('client/app/account/register.html'));
});

app.post('/register', function (req, res) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function (err, account) {
        if (err) {
            return res.sendFile(path.resolve('client/app/account/register.html'));
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});
app.post('/login', passport.authenticate('local'), function (req, res) {
    
    res.redirect('/');
});
app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});
app.listen(3000, function () {
    console.log("Server started at port 3003");
});