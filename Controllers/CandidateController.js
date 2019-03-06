const Candidate = require('../Models/Candidate');
const Interviewer = require('../Models/Interviewer');
const TimeSpan = require('../Models/TimeSpan');
const moment = require('moment');

class CandidateController{
    constructor(){}

    async getCandidate(req, res) {
        try {
            let candidate = await Candidate.findOne({_id: req.params.id});

            return res.status(200).send(candidate);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async getCandidates(req, res) {
        try {
            let candidates = await Candidate.find();

            return res.status(200).send(candidates);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async getMatches(req, res) {
        if(!req.query.interviewers)
            return res.status(400).send("Iterviewers names are required");
        let interviewers = req.query.interviewers.split(",");
        try {
            let candidate = await Candidate.findOne({_id: req.params.id});

            if(!candidate) return res.status(404).send("Candidate not found");
            let matches = await Interviewer.getInterviewMatches(candidate.availability, interviewers);

            if(!matches.length) return res.status(200).send([]);

            return res.json(this.toReadableTimeSpans(matches[0]));

            return res.status(200).send(matches[0]);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async createCandidate(req, res) {
        let timeSlots = this.toTimeSlots(req.body.availability);
        const newCandidate = new Candidate({
            name: req.body.name, 
            availability: timeSlots
        });
        
        try {
            let candidate = await newCandidate.save();
    
            return res.status(200).send(candidate);
        } catch(err) {
            return res.status(500).send(err)
        }
    }

    toTimeSlots(timeIntervals) {
        let timeSlots = [];

        timeIntervals.forEach((timeInterval) => {
            let startTime = moment(`${timeInterval.day} ${timeInterval.from}`, "YYYY/MM/DD HA");
            let endTime = moment(`${timeInterval.day} ${timeInterval.to}`, "YYYY/MM/DD HA");
    
            while(startTime < endTime) {
                timeSlots.push(new Date(startTime));
                startTime.add(1, 'hours');
            }
        });
        return timeSlots;
    }

    toReadableTimeSpans(matches) {
        if(!matches.availabilityMatches) return [];
        let availability = [];
        matches.availabilityMatches = matches.availabilityMatches.sort();

        matches.availabilityMatches.forEach((match, index) => {
            let day = moment(match).format("YYYY/MM/DD");
            let from = moment(match).format("HA");
            let nextHour = moment(match).add(1, 'hours');
            let to = nextHour.format("HA");

            if(matches.availabilityMatches.length >= index + 1 && moment(matches.availabilityMatches[index + 1]) != nextHour){
                availability.push(new TimeSpan(day, from, to));
            }
        });
        return availability;
    }

}

module.exports = CandidateController;