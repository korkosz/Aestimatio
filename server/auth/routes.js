var passport = require('passport');
var path = require('path');
var Account = require('./account/account.model');
var User = require('../api/user/user.model');

module.exports = function (router) {
    router.post('/login', passport.authenticate('local', {
        failureRedirect: '/login'
    }), function (req, res) {
        if (req.body.remember) {
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
        } else {
            req.session.cookie.expires = false; // Cookie expires at end of session
        }
        res.redirect('/user/grades');
    });

    router.post('/register', function (req, res) {
        Account.register(new Account({ username: req.body.username }), req.body.password, function (err, _account) { //eslint-disable-line
            if (err) {
                return res.sendFile(path.resolve('client/app/Account/register.html'));
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });
    });

    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    router.get('/user', function (req, res) {
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
