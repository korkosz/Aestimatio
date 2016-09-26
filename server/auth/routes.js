var passport = require('passport');
var path = require('path');
var Account = require('./account/account.model');

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
        var user = req.user;
        if (user && user._doc)
            res.send(user._doc.username);
        else
            res.json(null);
    });
};
