var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/', controller.query);
router.get('/:userId', controller.get);
router.post('/', controller.post);
router.patch('/:userId', controller.patch);
router.patch('/changeClass/:userId/:classId', 
    controller.changeClass);

module.exports = router;