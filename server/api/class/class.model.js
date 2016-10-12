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

var ClassSchema = new mongoose.Schema({
    name: String,
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    subjects: [String],
    timetable: [day],
    gradeTypes: [gradeTypeSchema],
    tests: [testSchema]
});

module.exports = mongoose.model('Class', ClassSchema);