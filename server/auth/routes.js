var passport = require('passport');

var ctrl = require('./controller');
var api = require('./api');

module.exports = function (router) {
    router.post('/login', passport.authenticate('local'), ctrl.login);
    router.post('/register', ctrl.register);
    router.get('/logout', ctrl.logout);
    router.get('/user/', api.isLoggedIn, ctrl.getUser);

    return router;
};
