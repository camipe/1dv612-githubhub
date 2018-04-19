const mongoose = require('mongoose');

// Importing environmental variables
require('dotenv').config({ path: 'variables.env' });

// Connecting to DB
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(err.message);
});

require('./api/models/Sub');

// Start app
const app = require('./app');

app.set('port', process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
