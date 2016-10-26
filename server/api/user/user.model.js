var mongoose = require('mongoose');

var gradeSchema = new mongoose.Schema({
    subject: String,
    value: Number,
    gradeType: String
}, { _id: false });

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    grades: [gradeSchema],
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' },
    admin: Boolean
});

module.exports = mongoose.model('User', UserSchema);
