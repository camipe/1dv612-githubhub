const express = require('express');
const dataController = require('./controller/dataController');
const subController = require('./controller/subController');
const auth = require('../handlers/auth');

const router = express.Router();

router.get('/', auth.verifyJwt, auth.getAuth0Profile, (req, res) => {
  res.json({text: 'success'});
});

router.post('/subscribe', auth.verifyJwt, auth.getAuth0Profile, subController.subscribe);

router.post('/hook', subController.notify);

router.get('/organizations', auth.verifyJwt, auth.getAuth0Profile, dataController.getOrganizations);

router.get('/issues', auth.verifyJwt, auth.getAuth0Profile, dataController.getIssues);

module.exports = router;
