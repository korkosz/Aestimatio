var express = require('express');
var jsonpatch = require('fast-json-patch');

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
router.patch('/:id', function (req, res) {
    Class.findById(req.params.id, function (err, _class) {
        var patches = req.body;
        jsonpatch.apply(_class, patches);
        _class.save();
        res.end();
    }).catch(function (err) {
        return res.status(500).send(err);
    });
});
module.exports = router;