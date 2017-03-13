'use strict'

const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: String,
  login: String,
  userID: String
})

module.exports = mongoose.model('User', UserSchema)
