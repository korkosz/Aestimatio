var Account = require('../auth/account/account.model');
var Class = require('../api/class/class.model');
var City = require('../api/city/city.model');
var School = require('../api/school/school.model');
var User = require('../api/user/user.model');

Account.find({}).remove()
    .then(function () {
        Account.register(new Account({
            username: 'korkosz'
        }), 'korkosz91', function (err, acc) {
            if (err) {
                throw new Error('seed error');
            }
            City.find({}).remove().then(function () {
                City.create({ name: 'Warszawa' }).then(function (city) {
                    School.find({}).remove().then(function () {
                        School.create({ name: 'II B', city: city._doc._id })
                            .then(function (school) {
                                Class.find({}).remove().then(function () {
                                    Class.create({
                                        city: city._doc._id,
                                        school: school._doc._id,
                                        subjects: ['History', 'Math', 'Biology']
                                    }).then(function (_class) {
                                        User.find({}).remove().then(function () {
                                            User.create({
                                                class: _class._doc._id,
                                                account: acc._doc._id,
                                                marks: [
                                                    {
                                                        subject: 'Math',
                                                        value: 4,
                                                        testType: 3
                                                    }, {
                                                        subject: 'Math',
                                                        value: 2,
                                                        testType: 1
                                                    }, {
                                                        subject: 'Math',
                                                        value: 2,
                                                        testType: 1
                                                    },
                                                ]
                                            });
                                        });
                                    });
                                });
                            });
                    });
                });

            });
        });
    });
