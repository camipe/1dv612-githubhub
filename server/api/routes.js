'use strict'

const express = require('express')
const router = express.Router()

router.get('/test', (req, res, next) => {
  res.json({ 'Text': 'Imported route file works.' })
})

module.exports = router
