const express = require("express");
const router = express.Router();
const CandidateController = require('../Controllers/CandidateController');
const InterviewerController = require('../Controllers/InterviewerController');

let candidateController = new CandidateController();
let interviewerController = new InterviewerController();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

//Candidate Routes
router.post('/candidates', (req, res) => candidateController.createCandidate(req, res));
router.get('/candidates', (req, res) => candidateController.getCandidates(req, res));
router.get('/candidate/:id', (req, res) => candidateController.getCandidate(req, res));
router.get('/candidates/:id/matches', (req, res) => candidateController.getMatches(req, res));

//Interviewers Routes
router.post('/interviewers', (req, res) => interviewerController.createInterviewer(req, res));
router.get('/interviewers', (req, res) => interviewerController.getInterviewers(req, res));


module.exports = router