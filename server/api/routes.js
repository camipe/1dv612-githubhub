const express = require('express');
const axios = require('axios');

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

router.get('/org', (req, res) => {
  const query = `
    query {
      repository(owner:"isaacs", name:"github") {
        issues(states:CLOSED) {
          totalCount
        }
      }
    }`;

  fetch('https://api.github.com/graphql', {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    },
  }).then(response => response.text())
    .then(body => console.log(body)) // {"data":{"repository":{"issues":{"totalCount":247}}}}
    .catch(error => console.error(error));
  res.json('Sucess');
});

module.exports = router;
