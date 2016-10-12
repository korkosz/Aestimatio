var path = require('path');
var auth = require('./auth').router;
var user = require('./api/user');
var _class = require('./api/class/class.routes.js');
var city = require('./api/city/city.routes.js');

module.exports = function (app) {
    // app.get('/static', function (req, res) {
    //     res.sendFile(path.resolve('client/index.html'));
    // });

    app.use('/auth', auth);
    app.use('/api/user', user);
    app.use('/api/class', _class);
    app.use('/api/city', city);
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('client/index.html'));
    });
};