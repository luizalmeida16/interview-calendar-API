const Interviewer = require('../Models/Interviewer');
const moment = require('moment');

class InterviewerController{
    constructor(){}

    async getInterviewers(req, res) {
        try {
            let interviewers = await Interviewer.find();
    
            return res.status(200).send(interviewers);
        } catch(err) {
            return res.status(500).send(err);
        }
    }

    async createInterviewer(req, res) {
        let timeSlots = this.toTimeSlots(req.body.availability);
        const newInterviewer = new Interviewer({
            name: req.body.name, 
            availability: timeSlots
        });
        
        try {
            let interviewer = await newInterviewer.save();
            
            return res.status(200).send(interviewer);
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

}

module.exports = InterviewerController;