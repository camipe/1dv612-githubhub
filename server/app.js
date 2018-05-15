const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./api/routes');

const app = express();

// Setup automatic parsing of request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Add headers
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  // Pass to next layer of middleware
  next();
});

app.use(express.static('./client_build/'));

// Handle routing
app.use('/', routes);

module.exports = app;
