var mongoose = require('mongoose');

var day = {
    day: Number,
    subjects: [String]
};

var gradeTypeSchema = new mongoose.Schema({
    name: String,
    rate: Number
}, { _id: false });

var ClassSchema = new mongoose.Schema({
    school: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'School'
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    subjects: [String],
    timetable: [day],
    gradeTypes: [gradeTypeSchema],
    tests: [{
        subject: String,
        date: Number,
        type: String,
        description: String
    }]
});

module.exports = mongoose.model('Class', ClassSchema);