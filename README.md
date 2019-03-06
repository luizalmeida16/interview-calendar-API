# interview-calendar-API
A simple interview calendar API

# Requirements to run the API
* Docker -> (https://www.docker.com/)

## Installation
Clone this repository and install the project with the following command:
* run command docker-compose up

#### Run tests
Go to the project folder and run the following command:
* docker-compose run --rm app npm test

## Usage
After installation make the requests to the following endpoints:

### https://documenter.getpostman.com/view/2007242/S11NPHWg -> this link contains all of the API available endpoint with Examples


| Description | Endpoint | Body |
|---------------------------------|-------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| insert Candidates | POST http://localhost:9000/candidates | {"name": "Candidate test", "availability": [   {"day":"2019/05/04", "from":"1pm", "to":"4pm"},   {"day":"2019/05/05", "from":"9am", "to":"2pm"}, ] } |
| insert Interviewers | POST http://localhost:9000/interviewers | {"name": "Interviewer test", "availability": [ {"day":"2019/05/04", "from":"2pm", "to":"3pm"}, {"day":"2019/05/05", "from":"8am", "to":"10am"} ] } |
| get interview time slot matches | GET http://localhost:9000/candidates/${candidateId}/matches?interviewers=Interviewer test,Interviewer test2 | Returns a list of availability |
| get Candidates List | GET http://localhost:9000/candidates | Returns a list of candidates |

Recommended software to make API requests: Postman<br>Get postman free: https://www.getpostman.com/apps


### This Software was buit using the following technologies:
- Docker
- Node.js
- MongoDB
- Express
- Mocha
