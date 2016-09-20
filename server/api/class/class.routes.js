var express = require('express');
var router = express.Router();

var Class = require('./class.model');

router.get('/:id', function (req, res, next) {
    return Class.findById(req.params.id).exec()
        .then(function (entity) {
            res.json(entity);
        })
        .catch(function (err) {
            next(err.message);
        });
});

module.exports = router;