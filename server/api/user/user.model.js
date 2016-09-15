var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    marks: [{
        subject: String,
        value: Number,
        testType: Number
    }],
    class: String
});

module.exports = mongoose.model('User', UserSchema);
