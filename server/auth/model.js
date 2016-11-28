var mongoose = require('mongoose');

var passportLocalMongoose = require('passport-local-mongoose');

var AccountSchema = new mongoose.Schema({
    email: String,
    password: String
});

AccountSchema.plugin(passportLocalMongoose, {
    usernameField: 'email'
});

module.exports = mongoose.model('Account', AccountSchema);