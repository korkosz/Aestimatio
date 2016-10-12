var Account = require('../auth/account/account.model');
var Class = require('../api/class/class.model');
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

            School.find({}).remove().then(function () {
                School.create({ name: 'Konarskiego', city: 'Warszawa' })
                    .then(function (school) {
                        Class.find({}).remove().then(function () {
                            Class.create({
                                name: 'II B',
                                school: school._doc._id,
                                subjects: ['History', 'Math', 'Biology', 'Physics', 'Chemistry', 'English'],
                                tests: [],
                                gradeTypes: [
                                    {
                                        name: 'Exam',
                                        rate: 6
                                    }, {
                                        name: 'Test',
                                        rate: 3
                                    }, {
                                        name: 'Big test',
                                        rate: 4
                                    }],
                                timetable: [{
                                    day: 'Monday',
                                    subjects: ['Math', 'Biology', 'Physics', 'Chemistry', 'English']
                                }, {
                                    day: 'Tuesday',
                                    subjects: ['Physics', 'Physics', 'Chemistry', 'Math', 'English']
                                }, {
                                    day: 'Wednesday',
                                    subjects: ['History', 'History', 'English', 'Math']
                                }, {
                                    day: 'Thursday',
                                    subjects: ['Math', 'Math', 'Physics']
                                }, {
                                    day: 'Friday',
                                    subjects: ['Physics', 'Biology', 'Biology', 'Physics']
                                }]
                            }).then(function (_class) {
                                User.find({}).remove().then(function () {
                                    User.create({
                                        class: _class._doc._id,
                                        account: acc._doc._id,
                                        grades: [
                                            {
                                                subject: 'Math',
                                                value: 4,
                                                gradeType: 'Big test'
                                            }, {
                                                subject: 'Math',
                                                value: 2,
                                                gradeType: 'Test'
                                            }, {
                                                subject: 'Biology',
                                                value: 2,
                                                gradeType: 'Exam'
                                            },
                                        ]
                                    });
                                });
                            });
                        });
                    });
                School.create({ name: 'Liceum Profilowane', city: 'Warszawa' });
                School.create({ name: 'Zawodowka', city: 'Warszawa' });
                School.create({ name: 'Szkola Korkosza', city: 'Warszawa' });
                School.create({ name: 'Technikum nr. 2', city: 'Warszawa' });
            });
        });
    });
