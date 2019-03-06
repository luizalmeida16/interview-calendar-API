const assert = require('assert');
const Db = require('../config/Db');
const mongoose = require('mongoose');
const Candidate = require('../Models/Candidate');
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require('../config/routes');
const request = require('request');

describe('db-test', () => {
    it('db-connection', function(done) {
        let db = new Db('mongo', '27017', 'test');
        db.connect().then(() => {
            assert.ok(true);
            done();
        }).catch((err) => {
            assert.ok(false);
        });
    });
    it('bd-test-insert', function(done) {
        const newCandidate = new Candidate({
            name: "test",
            availability: []
        });
        newCandidate.save().then(function(candidate) {
            assert.equal(candidate.name, "test");
            done();
        });
    });
    it('db-test-find', function(done) {
        Candidate.find().then(function(candidates) {
            assert.equal(candidates.length, 1);
            done();
        });
    });
});


describe('api-tests', () => {
    it('expose-api', function(done) {
        //This is the port running in the container
        const port = 3000;
        app.use(bodyParser.json());

        app.use('/', routes);
        app.listen(port, () => {
            assert.ok(true);
            done();
        });
    });

    it('insert-candidate', function(done) {
        let jsonData = {
            "name": "Candidate test",
            "availability": [
                {"day":"2019/05/04", "from":"1pm", "to":"4pm"},
                {"day":"2019/05/05", "from":"9am", "to":"2pm"},
            ]
        };
        request.post({
            url: 'http://localhost:3000/candidates',
            body: jsonData,
            json: true
        }, function(err, response, body) {
            if(err) assert.ok(false, err);

            assert.equal(response.statusCode, 200);
            done();
        });
    });
    it('insert-interviewer', function(done) {
        let jsonData = {
            "name": "Interviewer test",
            "availability": [
                {"day":"2019/05/04", "from":"2pm", "to":"3pm"},
                {"day":"2019/05/05", "from":"8am", "to":"10am"},
            ]
        };
        request.post({
            url: 'http://localhost:3000/interviewers',
            body: jsonData,
            json: true
        }, function(err, response, body) {
            if(err) assert.ok(false, err);

            assert.equal(response.statusCode, 200);
            done();
        });
    });
    it('insert-interviewer-2', function(done) {
        let jsonData = {
            "name": "Interviewer test 2",
            "availability": [
                {"day":"2019/05/05", "from":"8am", "to":"10am"},
            ]
        };
        request.post({
            url: 'http://localhost:3000/interviewers',
            body: jsonData,
            json: true
        }, function(err, response, body) {
            if(err) assert.ok(false, err);

            assert.equal(response.statusCode, 200);
            done();
        });
    });
});
describe('match-results-test', () => {
    it('match-availability', function(done) {
        request.get('http://localhost:3000/candidates',{json: true}, function(err, resp, body) {
            if(err) assert.ok(false);

            let candidateId = resp.body[1]["_id"];
            console.log(candidateId);
            request.get(`http://localhost:3000/candidates/${candidateId}/matches?interviewers=Interviewer test,Interviewer test 2`, {json: true}, function(err, resp, body) {
                if(err) console.log(err);
                assert.equal(resp.body[0].day, '2019/05/04');
                assert.equal(resp.body[0].from, '14PM');
                assert.equal(resp.body[0].to, '15PM');
                assert.equal(resp.body[1].day, '2019/05/05');
                assert.equal(resp.body[1].from, '9AM');
                assert.equal(resp.body[1].to, '10AM');
                done();
            });
        })
    });
});

describe('remove-database', () => {
    it('remove-db', function(done) {
        mongoose.connection.db.dropDatabase();
        done()
    });
});



