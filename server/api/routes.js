const express = require('express');
const dataController = require('./controller/dataController');
const subController = require('./controller/subController');
const auth = require('../handlers/auth');

const router = express.Router();

router.get('/', auth.verifyJwt, auth.getAuth0Profile, (req, res) => {
  res.json({text: 'success'});
});

router.post('/api/subscribe', auth.verifyJwt, auth.getAuth0Profile, subController.subscribe);

router.post('/api/hook', subController.notify);

router.get('/api/organizations', auth.verifyJwt, auth.getAuth0Profile, dataController.getOrganizations);

router.get('/api/issues', auth.verifyJwt, auth.getAuth0Profile, dataController.getIssues);

module.exports = router;
