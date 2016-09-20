var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    city: String
});

module.exports = mongoose.model('City', citySchema);
