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

class InterviewerClass {
    static getInterviewMatches(candidateAvailability, interviewersNames){
        return this.aggregate([
            {
                "$match": {
                    name:  { $in: interviewersNames },
                    availability: { $in: candidateAvailability }
                }
            },
            {
                "$group": {
                    "_id": 0,
                    "av1": { "$first": "$availability" },
                    "av2": { "$last": "$availability" }
                }
            },
            {
                "$project": { 
                    "availabilityMatches": { "$setIntersection": [{"$setUnion": [ "$av1", "$av2" ]}, candidateAvailability] }, 
                    "_id": 0 
                }
            }
        ])
    }

}

schema.loadClass(InterviewerClass);
let InterviewerModel = mongoose.model('Interviewer', schema);

module.exports = InterviewerModel;