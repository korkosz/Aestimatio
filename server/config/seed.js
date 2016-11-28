var Account = require('../auth/model');
var Class = require('../api/class/class.model');
var School = require('../api/school/school.model'); 
var User = require('../api/user/user.model');

Account.find({}).remove()
    .then(function () {
        Account.register(new Account({
            email: 'korkosz@wp.pl'
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
                                }],
                                moderators: []
                            }).then(function (_class) {
                                User.find({}).remove().then(function () {


                                    User.create({
                                        class: _class._doc._id,
                                        firstName: 'Mateusz',
                                        lastName: 'Korkosz',
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
                                    }).then((_usr1) => {
                                        Account.register(new Account({
                                            email: 'chmieltrybulec@gmail.com'
                                        }), 'korkosz91', function (err, acc3) {
                                            if (err) {
                                                throw new Error('seed error');
                                            }

                                            User.create({
                                                class: _class._doc._id,
                                                firstName: 'Maciej',
                                                lastName: 'Chmiel',
                                                account: acc3._doc._id,
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
                                            }).then((_usr2) => {

                                                Account.register(new Account({
                                                    email: 'matrybulec@gmail.com'
                                                }), 'korkosz91', function (err, acc2) {
                                                    if (err) {
                                                        throw new Error('seed error');
                                                    }

                                                    User.create({
                                                        class: _class._doc._id,
                                                        firstName: 'Marcin',
                                                        lastName: 'Trybulec',
                                                        account: acc2._doc._id,
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
                                                    }).then((_usr) => {
                                                        _class.moderators.push(_usr._id, _usr2._id);
                                                        _class.students = [{
                                                            _id: _usr._id,
                                                            name: _usr.firstName + ' ' + _usr.lastName
                                                        }, {
                                                            _id: _usr1._id,
                                                            name: _usr1.firstName + ' ' + _usr1.lastName
                                                        }, {
                                                            _id: _usr2._id,
                                                            name: _usr2.firstName + ' ' + _usr2.lastName
                                                        }];
                                                        _class.save();
                                                    }); 
                                                });
                                            });
                                        });
                                    });
                                });

                                Class.create({
                                    name: 'I C',
                                    school: school._doc._id,
                                    subjects: ['History', 'Math', 'Chemistry', 'English', 'WOS', 'WF'],
                                    tests: [],
                                    gradeTypes: [
                                        {
                                            name: 'Exam',
                                            rate: 4
                                        }, {
                                            name: 'Test',
                                            rate: 2
                                        }, {
                                            name: 'Big test',
                                            rate: 4
                                        }],
                                    timetable: [{
                                        day: 'Monday',
                                        subjects: ['WF', 'WOS', 'Chemistry', 'English']
                                    }, {
                                        day: 'Tuesday',
                                        subjects: ['WOS', 'WOS', 'Chemistry', 'Math', 'English']
                                    }, {
                                        day: 'Wednesday',
                                        subjects: ['History', 'History', 'English', 'Math']
                                    }, {
                                        day: 'Thursday',
                                        subjects: ['Math', 'Math', 'WOS']
                                    }, {
                                        day: 'Friday',
                                        subjects: ['WOS', 'WF', 'WF']
                                    }]
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
