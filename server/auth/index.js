var express = require('express');

var config = require('./config');

//config auth routes
module.exports.router = require('./routes')(express.Router());

module.exports.passportConfig = config;