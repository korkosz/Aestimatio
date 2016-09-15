var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/', controller.get);

module.exports = router;