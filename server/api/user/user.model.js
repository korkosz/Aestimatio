var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    marks: [{
        subject: String,
        value: Number,
        testType: Number
    }],
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('User', UserSchema);
