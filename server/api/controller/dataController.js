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

const convert = (data) => {
  const orgs = data.viewer.organizations.edges;
  const result = {
    organisations: [],
    issues: [],
  };

  orgs.forEach((org) => {
    const orgName = org.node.name;
    result.organisations.push(orgName);
    const repos = org.node.repositories.edges;

    repos.forEach((repo) => {
      const repoName = repo.node.name;
      const issues = repo.node.issues.edges;

      issues.forEach((issue) => {
        // create new issue object with the information from each issue
        const i = {
          org: orgName,
          repo: repoName,
          title: issue.node.title,
          author: issue.node.author.login,
          status: issue.node.state,
          createdAt: issue.node.createdAt,
        };
        result.issues.push(i);
      });
    });
  });

  return result;
};

exports.getIssues = (req, res) => {
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
  }`;

  apolloFetch({ query })
    .then((response) => {
      res.json(convert(response.data));
    })
    .catch(error => console.error(error));
};
