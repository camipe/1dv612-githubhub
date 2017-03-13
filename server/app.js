const express = require('express')
const app = express()
const routes = require('./api/routes')

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*')
    // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    // Pass to next layer of middleware
  next()
})

app.get('/test', routes)

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log('App is running at localhost:' + port)
})
