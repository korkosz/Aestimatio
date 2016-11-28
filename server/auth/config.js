var Account = require('./model');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (_passport) {

    _passport.use(new LocalStrategy({
        usernameField: 'email'
    }, Account.authenticate()));

    _passport.serializeUser(Account.serializeUser());
    _passport.deserializeUser(Account.deserializeUser());
};