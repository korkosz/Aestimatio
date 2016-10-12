var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    city: String,
    name: String
}); 

module.exports = mongoose.model('School', schema);