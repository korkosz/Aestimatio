var mongoose = require('mongoose');

var citySchema = new mongoose.Schema({
    name: String
});

module.exports = mongoose.model('City', citySchema);
