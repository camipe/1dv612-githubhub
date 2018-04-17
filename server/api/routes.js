const express = require('express');
const dataController = require('./controller/dataController');
const subController = require('./controller/subController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ Text: 'Success' });
});

router.post('/subscribe', subController.subscribe);

router.post('/hook', subController.notify);

router.get('/organizations', dataController.getOrganizations);

router.get('/issues', dataController.getIssues);

module.exports = router;
