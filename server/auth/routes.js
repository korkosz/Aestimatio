var passport = require('passport');
var Account = require('./account/account.model');
var User = require('../api/user/user.model');

module.exports = function (router) {
    router.post('/login', passport.authenticate('local'), function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        } 
        res.end();
    });

    router.post('/register', function (req, res) {
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
                    res.redirect('/#/class/search'); 
                });
            });
        });
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/user/', function (req, res) {
        var account = req.user;
        if (account && account._doc)
            User.findOne({ account: account._doc._id }).then(function (_user) {
                _user._doc.userId = _user._doc._id;

                var mutual = Object.assign({}, _user._doc, account._doc);

                delete mutual._id;
                res.json(mutual);
            });
        else
            res.json(null);
    });
};
