'use strict'

const express = require('express')
const router = express.Router()

// TODO: 4. Setup API endpoint and serve current seeded data.
// TODO: 5. Setup API endpoint for user to trigger data collection from github.

router.get('/test', (req, res, next) => {
  res.json({ 'Text': 'Imported route file works.' })
})

module.exports = router
