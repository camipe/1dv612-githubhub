const mongoose = require('mongoose');

const SubSchema = new mongoose.Schema({
  organization: String,
  subscribers: Array,
});

module.exports = mongoose.model('Sub', SubSchema);
