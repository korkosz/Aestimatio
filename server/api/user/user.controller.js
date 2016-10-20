var jsonpatch = require('fast-json-patch');

var User = require('./user.model');

module.exports.query = function (req, res) {
    User.find().exec().then(function (users) {
        res.json(users);
    });
};

module.exports.get = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(user);
    });
};

module.exports.post = function (req, res) {
    if (req.body.user) {
        User.create(req.body.user)
            .then(function (user) {
                res.send(user.id);
            })
            .catch(function (err) {
                res.status(500, err);
            });
    }
};

module.exports.patch = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        var patches = req.body;
        jsonpatch.apply(user, patches);
        user.save();
        res.end();
    }).catch(errorHandler(res));
};

module.exports.changeClass = function (req, res) {
    User.findById(req.params.userId, function (err, user) {
        user.grades = [];
        user.class = req.params.classId;
        user.save();
        res.end();
    }).catch(errorHandler(res));
};

function errorHandler(res) {
    return function(err) {
        res.status(500).send(err);
    };    
}