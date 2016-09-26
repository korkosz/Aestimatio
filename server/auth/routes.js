var passport = require('passport');
var path = require('path');
var Account = require('./account/account.model');

module.exports = function (router) {
    router.post('/login', passport.authenticate('local', {
        successRedirect: '/user/grades',
        failureRedirect: '/login'
    }));
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
};
