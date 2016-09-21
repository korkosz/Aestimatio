var path = require('path');
var auth = require('./auth').router;
var _class = require('./api/class/class.routes.js');

module.exports = function (app) {
    // app.get('/static', function (req, res) {
    //     res.sendFile(path.resolve('client/index.html'));
    // });

    app.use(auth);
    app.use('/api/class', _class);
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve('client/index.html'));
    });
};