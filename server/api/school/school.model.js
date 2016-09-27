var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    city: { type:  mongoose.Schema.Types.ObjectId, ref: 'City' },
    name: String
}); 

module.exports = mongoose.model('School', schema);