const express = require('express');
const bodyParser = require('body-parser');
const moviesRoute = require('./routes/moviesRoute');

const app = express();

app.use(bodyParser.json());

app.use('/movies', moviesRoute);

module.exports = app;
