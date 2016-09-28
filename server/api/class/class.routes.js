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
/**
 * Te metode zamienic na patch 
 */
router.post('/:id', function (req, res, next) {
    Class.findByIdAndUpdate(req.params.id, req.body,
        function (err) {
            if (err) {
                return next(err);
            }
            return res.status(200).end();
        });
});

module.exports = router;