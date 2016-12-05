var express = require('express');
var jsonpatch = require('fast-json-patch');

var router = express.Router();

var Class = require('./class.model');

router.get('/', function (req, res, next) {
    return Class.find(req.query.school || {})
        .then(function (entities) {
            res.json(entities);
        })
        .catch(function (err) {
            next(err);
        });
});

router.get('/:id', function (req, res, next) {
    return Class.findById(req.params.id)
        .then(function (entity) {
            res.json(entity);
        })
        .catch(function (err) {
            next(err);
        });
});

/**
 * Te metode zamienic na patch 
 */
router.post('/:id', function (req, res, next) {
    Class.findByIdAndUpdate(req.params.id, req.body)
        .then(function () {
            return res.status(200).end();
        })
        .catch(function (err) {
            next(err);
        });
});

router.post('/', function (req, res, next) {
    Class.create(req.body).then(function (result) {
        res.status(201).send({
            id: result._id,
            name: result.name
        });
    }).catch(function (err) {
        return next(err);
    });
});

router.patch('/:id', function (req, res, next) {
    Class.findById(req.params.id)
        .then(function (_class) {
            var patches = req.body;
            jsonpatch.apply(_class, patches);
            _class.save();
            res.end();
        })
        .catch(function (err) {
            next(err);
        });
});

router.use(function (err, req, res, next) {//eslint-disable-line
    console.error(err.message || err); //eslint-disable-line
    res.status(500).send(err.message || err);
});

module.exports = router;