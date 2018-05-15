const express = require('express');
const dataController = require('./controller/dataController');
const subController = require('./controller/subController');
const auth = require('../handlers/auth');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', {root: `${__dirname}/dist/`});
});
// subscribe to organization's issues
router.post('/api/subscribe', auth.verifyJwt, auth.getAuth0Profile, subController.subscribe);

// usde by githubs web hook to post data
router.post('/api/hook', subController.notify);

// returns list of authenticated user's organtizations and subscriptions
router.get('/api/organizations', auth.verifyJwt, auth.getAuth0Profile, dataController.getOrganizations);

// returns list of authenticated user's organtization's issues
router.get('/api/issues', auth.verifyJwt, auth.getAuth0Profile, dataController.getIssues);

module.exports = router;
