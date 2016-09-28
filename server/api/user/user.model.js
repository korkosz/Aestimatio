var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    grades: [{
        subject: String,
        value: Number,
        gradeType: String
    }],
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
});

module.exports = mongoose.model('User', UserSchema);
