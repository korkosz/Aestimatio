var express = require('express');

var config = require('./config');
var api = require('./api');

module.exports.isLoggedIn = api.isLoggedIn;

//config auth routes
module.exports.router = require('./routes')(express.Router());

module.exports.passportConfig = config;
