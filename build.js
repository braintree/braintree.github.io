const Metalsmith  = require('metalsmith');
const inplace = require('metalsmith-in-place');
const sass  = require('metalsmith-sass');
const GitHubApi = require("github");
const jsonfile = require("jsonfile");

const githubAuthFile = process.env.GH_AUTH_FILE || ".github_api_auth";
const repositoryListFileName = process.env.REPO_LIST_FILE || "repository-list.json"

console.log("Using GH_AUTH_FILE=" + githubAuthFile);
console.log("Using REPO_LIST_FILE=" + repositoryListFileName);

var github = new GitHubApi({
  headers: {
    "user-agent": "braintree-open-source-page-builder"
  },
  followRedirects: false,
  timeout: 5000
});

github.authenticate(jsonfile.readFileSync(githubAuthFile))

async function getRepo(ownerName, repoName) {
  const repoRequest = github.repos.get({
    owner: ownerName,
    repo: repoName
  });

  const languagesRequest = github.repos.getLanguages({
    owner: ownerName,
    repo: repoName
  });

  const repoResult = await repoRequest;
  const languagesResult = await languagesRequest;

  return {
    name: repoResult.data.name,
    description: repoResult.data.description,
    url: repoResult.data.html_url,
    languages: Object.keys(languagesResult.data)
  };
}

async function fetchRepositoryData(filename) {
  const repos = jsonfile.readFileSync(filename);
  const repoRequests2d = Object.keys(repos).map((ownerName) => {
    return repos[ownerName].map((repoName) => {
      return getRepo(ownerName, repoName);
    });
  });
  const repoRequests = [].concat(...repoRequests2d);

  const result = await Promise.all(repoRequests);
  return result;
}

fetchRepositoryData(repositoryListFileName).then(repositories => {
  console.log("Updated " + repositories.length + " repositories");

  Metalsmith(__dirname)
  .metadata({
    repositories: repositories
  })
  .source('./src')
  .destination('.')
  .clean(false)
  .use(sass({
    outputDir: 'css/'
  }))
  .use(inplace())
  .build(function(err) {
    if (err) throw err;
  });
});
