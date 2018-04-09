const mongoose = require('mongoose');

const SubSchema = new mongoose.Schema({
  organisation: String,
  subscribers: Array,
});

module.exports = mongoose.model('Sub', SubSchema);
