const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    availability: [Date],
    date: {
        type: Date,
        default: Date.now
    }
});

let CandidateModel = mongoose.model('candidate', schema);

module.exports = CandidateModel;