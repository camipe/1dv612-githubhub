const express = require('express');
const axios = require('axios');
const Apollo = require('apollo-fetch');

const uri = 'https://api.github.com/graphql';
const apolloFetch = Apollo.createApolloFetch({ uri });

apolloFetch.use(({ req, options }, next) => {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers.Authorization = 'Bearer 7e248d347da31be4cef73112d5f1284dd123b872';

  next();
});

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
  const query = `query {
    viewer {
      organizations(last:10) {
        edges {
          node {
            name
            repositories(first:10) {
              edges {
                node {
                  name
                  issues(last:20) {
                    edges {
                      node {
                        createdAt
                        title
                        state
                        author {
                          login
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`
apolloFetch({ query })
.then((response) => {
  console.log(response);
  res.json(response);
})
.catch(error => console.error(error));
});

module.exports = router;
