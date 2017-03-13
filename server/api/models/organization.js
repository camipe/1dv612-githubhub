'use strict'

const mongoose = require('mongoose')

const OrganizationSchema = new mongoose.Schema({
  login: String,
  id: String,
  url: String,
  reposUrl: String,
  description: String,
  repos: [RepoSchema]
})

const RepoSchema = new mongoose.Schema({
  id: String,
  name: String,
  fullName: String
})

module.exports = mongoose.model('Organization', OrganizationSchema)
