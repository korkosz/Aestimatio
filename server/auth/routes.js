var passport = require('passport');

var ctrl = require('./controller');

module.exports = function (router) {
    router.post('/login', passport.authenticate('local'), ctrl.login);
    router.post('/register', ctrl.register);
    router.get('/logout', ctrl.logout);
    router.get('/user/', passport.authenticate('local'), ctrl.getUser);

    return router;
};
