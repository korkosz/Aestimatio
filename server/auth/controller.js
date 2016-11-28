var passport = require('passport');
var Account = require('./model');
var User = require('../api/user/user.model');
var _Class = require('../api/class/class.model');


var login = function (req, res) {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.expires = false; // Cookie expires at end of session
    }
    res.end();
};

var register = function (req, res) {
    Account.register(new Account({ email: req.body.email }), req.body.password, function (err, _account) { //eslint-disable-line
        if (err) {
            res.status(400).send();
        }
        User.create({
            account: _account._id,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }).then(function () {
            passport.authenticate('local')(req, res, function () {
                res.redirect('/#/search');
            });
        });
    });
};

var logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

var getUser = function (req, res) {
    var account = req.user;
    if (account && account._doc)
        User.findOne({ account: account._doc._id }).then(function (_user) {
            _user._doc.userId = _user._doc._id;

            var mutual = Object.assign({}, _user._doc, account._doc);

            delete mutual._id;

            /**
             * If user has assigned class, check if he's a moderator
             */
            if (mutual.class) {
                _Class.findById(mutual.class, 'moderators', { lean: true }).then(function (_class) {
                    mutual.moderator = _class.moderators.indexOf(
                        _user._doc.userId.toString()) !== -1;
                    res.json(mutual);
                });
            } else {
                res.json(mutual);
            }
        });
    else
        res.json(null);
};

module.exports = {
    login,
    logout,
    getUser,
    register
}