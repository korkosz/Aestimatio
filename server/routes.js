var path = require('path');
var auth = require('./auth').router;

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.sendFile(path.resolve('client/index.html'));
    });

    app.use(auth);
};