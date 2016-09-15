var User = require('./user.model');
User.create({
    class: 'huj'
})
module.exports.get = function (req, res) {

    User.findOne().exec().then(function (user) {
        res.json(user);
    })
};