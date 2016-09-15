var mongoose = require('mongoose').Schema;

var ClassSchema = new Schema({
    // name: String,
    // grade: {
    //     startDate: Number,
    //     endDate: Number
    // },
    subjects: [String],
    timetable: [{
        day: Number,
        subjects: [String]
    }],
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