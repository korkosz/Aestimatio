var mongoose = require('mongoose');

var day = {
    day: String,
    subjects: [String]
};

var gradeTypeSchema = new mongoose.Schema({
    name: String,
    rate: Number
}, { _id: false });

var testSchema = new mongoose.Schema({
    subject: String,
    date: Number,
    type: String,
    description: String
});

var userSchema = new mongoose.Schema({
    name: String
});

var ClassSchema = new mongoose.Schema({
    name: String,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    students: [userSchema],
    moderators: [String],
    subjects: [String],
    timetable: {
        type: [day],
        default() {
            return [
                {
                    day: 'Monday',
                    subjects: []
                },
                {
                    day: 'Tuesday',
                    subjects: []
                },
                {
                    day: 'Wednesday',
                    subjects: []
                },
                {
                    day: 'Thursday',
                    subjects: []
                },
                {
                    day: 'Friday',
                    subjects: []
                }];
        }
    },
    gradeTypes: [gradeTypeSchema],
    tests: [testSchema]
});

module.exports = mongoose.model('Class', ClassSchema);