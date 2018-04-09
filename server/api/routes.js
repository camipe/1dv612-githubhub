const express = require('express');
const dataController = require('./controller/dataController');
const subController = require('./controller/subController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ Text: 'Success' });
});

router.post('/subscribe', subController.subscribe);

router.post('/hook', (req, res) => {
  // ta ut organsiation från request

  // hämta organisation från db

  // // maila relevant information till till alla emails i subscribe arrayen

  console.log(req.body);
  res.json({ Text: 'Success' });
});

router.get('/org', dataController.getIssues);

module.exports = router;
