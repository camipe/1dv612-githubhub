const mongoose = require('mongoose');

// model used to keep track of subscriptions
const SubSchema = new mongoose.Schema({
  organization: String,
  subscribers: Array,
});

module.exports = mongoose.model('Sub', SubSchema);
