const mongoose = require('mongoose');
const Apollo = require('apollo-fetch');
const Sub = mongoose.model('Sub');

const uri = 'https://api.github.com/graphql';
const apolloFetch = Apollo.createApolloFetch({ uri });

apolloFetch.use(({ req, options }, next) => {
  if (!options.headers) {
    options.headers = {};
  }
  options.headers.Authorization = 'Bearer 7e248d347da31be4cef73112d5f1284dd123b872';

  next();
});

const formatOrganizations = async (data) => {
  const orgs = data.viewer.organizations.edges;
  const result = [];

  const subs = await Sub.find({ subscribers: 'micael@gmail.com'});
  const subbedOrganizations = subs.map(sub => sub.organisation);

  orgs.forEach((org) => {
    const orgName = org.node.name;
    result.push({
      name: org.node.name,
      subscribed: subbedOrganizations.includes(org.node.name)
    });
  });
  return result;
};

const formatIssues = (data) => {
  const orgs = data.viewer.organizations.edges;
  const result = {
    organisations: [],
    issues: [],
  };

  orgs.forEach((org) => {
    const orgName = org.node.name;
    const orgUrl = org.node.url;
    result.organisations.push(orgName);
    const repos = org.node.repositories.edges;

    repos.forEach((repo) => {
      const repoName = repo.node.name;
      const repoUrl = repo.node.url;
      const issues = repo.node.issues.edges;

      issues.forEach((issue) => {
        // create new issue object with the information from each issue
        const i = {
          org: orgName,
          orgUrl,
          repo: repoName,
          repoUrl,
          title: issue.node.title,
          url: issue.node.url,
          status: issue.node.state,
          createdAt: issue.node.createdAt,
          author: {
            name: issue.node.author.login,
            url: issue.node.author.url,
          },
        }
        result.issues.push(i);
      });
    });
  });

  return result;
};

exports.getOrganizations = (req, res) => {
  const query = `query {
    viewer {
      organizations(last:10) {
        edges {
          node {
            name
          }
        }
      }
    }
  }`;

  // TODO: create table where users current subscriptions are stored
  // TODO: compare organizations and mark them as subscribed if active

  apolloFetch({ query })
    .then( async (response) => {
      const organizations = await formatOrganizations(response.data);
      res.json(organizations);
    })
    .catch(error => console.error(error));
};


exports.getIssues = (req, res) => {
  const query = `query {
    viewer {
      organizations(last:10) {
        edges {
          node {
            name
            url
            repositories(first:10) {
              edges {
                node {
                  name
                  url
                  issues(last:50) {
                    edges {
                      node {
                        createdAt
                        title
                        state
                        url
                        author {
                          login
                          avatarUrl
                          url
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
  }`;

  apolloFetch({ query })
    .then((response) => {
      res.json(formatIssues(response.data));
    })
    .catch(error => console.error(error));
};
