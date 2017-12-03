const express = require('express');

const router = express.Router();

// TODO: 4. Setup API endpoint and serve current seeded data.
// TODO: 5. Setup API endpoint for user to trigger data collection from github.

router.get('/', (req, res) => {
  res.json({ Text: 'Success' });
});

router.post('/hooks', (req, res) => {
  console.log(req.body);
  res.json({ Text: 'Success' });
});

module.exports = router;
