var express = require('express')

var app = express()

var data = require('./github_mock.json')

app.get('/test', function(req, res) {
  res.json(data);
})

app.listen(3000)
