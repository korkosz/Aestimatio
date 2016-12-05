var express = require('express');
var router = express.Router();
var School = require('./school.model.js');

router.get('/:city', function (req, res) {
    var city = req.params.city;

    School.find({ city: city }, function (err, cities) {
        if (err) {
            res.status(500).end();
        }
        res.json(cities.map(function (city) {
            return {
                name: city.name,
                id: city._id
            };
        }));
    });
});

router.post('/', function (req, res, next) {
    School.create({
        city: req.body.city,
        name: req.body.name
    }).then(function () {
        res.status(200).send('School created');
    }).catch(function (err) {
        return next(err);
    });
});

module.exports = router;