const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const routes = require('./config/routes');
const Db = require('./config/Db');

const port = 3000;

app.use(bodyParser.json());

new Db('mongo', '27017', 'node-docker').connect();

app.use('/', routes);
app.listen(port, () => {
    console.log(`My REST API running on port ${port}`);
});