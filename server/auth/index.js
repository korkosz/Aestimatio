var express = require('express');
var Account = require('./account/account.model');
var LocalStrategy = require('passport-local').Strategy;

//config auth routes
var router = express.Router();
require('./routes')(router);

module.exports.router = router;

module.exports.passportConfig = function(_passport) {
    _passport.use(new LocalStrategy(Account.authenticate()));
    _passport.serializeUser(Account.serializeUser());
    _passport.deserializeUser(Account.deserializeUser());  
};