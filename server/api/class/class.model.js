var mongoose = require('mongoose');

var day = {
    day: Number,
    subjects: [String]
};

var ClassSchema = new mongoose.Schema({
    // name: String,
    // grade: {
    //     startDate: Number,
    //     endDate: Number
    // },
    school: { type: mongoose.Schema.Types.ObjectId, ref: 'School' },
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
    subjects: [String],
    timetable: [day],
    testTypes: [{
        _id: Number,
        name: String,
        worth: Number
    }],
    tests: [{
        subject: String,
        date: Number,
        type: String,
        description: String
    }]
});

module.exports = mongoose.model('Class', ClassSchema);