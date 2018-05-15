const mongoose = require('mongoose');
const Apollo = require('apollo-fetch');
const Sub = mongoose.model('Sub');

// setup apollo
const uri = 'https://api.github.com/graphql';
const apolloFetch = Apollo.createApolloFetch({ uri });

// function which sets the api key of the current user for the request
const configApollo = (apiKey) =>
  {apolloFetch.use(({ req, options }, next) => {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers.Authorization = `Bearer ${ apiKey }`;
    next();
  });
}

// formats organizations to be used in the client
const formatOrganizations = async (data, email) => {
  const orgs = data.viewer.organizations.edges;
  const result = [];

  const subs = await Sub.find({ subscribers: email });
  const subbedOrganizations = subs.map(sub => sub.organization);

  orgs.forEach((org) => {
    const orgName = org.node.name;
    result.push({
      name: org.node.name,
      subscribed: subbedOrganizations.includes(org.node.name)
    });
  });
  return result;
};

// formats issues to be used in the client
const formatIssues = (data) => {
  const orgs = data.viewer.organizations.edges;
  const result = [];

  orgs.forEach((org) => {
    const orgName = org.node.name;
    const orgUrl = org.node.url;
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
        result.push(i);
      });
    });
  });

  return result;
};

// request organizations from github
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

  configApollo(req.user.ghApiKey);

  apolloFetch({ query })
    .then( async (response) => {
      const organizations = await formatOrganizations(response.data, req.user.email);
      res.json(organizations);
    })
    .catch(error => console.error(error));
};

// request issues from github
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

  configApollo(req.user.ghApiKey);

  apolloFetch({ query })
    .then((response) => {
      res.json(formatIssues(response.data));
    })
    .catch(error => console.error(error));
};
