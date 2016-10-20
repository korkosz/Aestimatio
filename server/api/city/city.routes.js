var express = require('express');
var router = express.Router();

var PlaceAutocomplete = require('../google_places/PlaceAutocomplete.js');
var config = require('../google_places/config.js');

router.get('/:query/:language', function (req, res) {

    var placeAutocomplete = new PlaceAutocomplete(config.apiKey, config.outputFormat);

    var parameters = {
        input: req.params.query,
        types: '(cities)',
        language: req.params.language
    };
    placeAutocomplete(parameters, `components=country:${req.params.language}`, function (error, response) {
        if (error) throw error;
        var resp = [];
        if (response.predictions) {
            response.predictions.forEach(function (pred) {
                var city = pred.description.split(',')[0];
                resp.push(city);
            });
        }
        res.json(resp);
    });
});

module.exports = router;