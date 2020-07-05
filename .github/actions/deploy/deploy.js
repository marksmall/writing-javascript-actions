const github = require("@actions/github");

const createGithubDeployment = (octokit, { owner, repo, ref, environment }) => {
  console.debug("Creating deployment using GitHub API");
  console.log("OWNER: ", owner);
  console.log("REPO: ", repo);
  console.log("REF: ", ref);
  console.log("ENVIRONMENT: ", environment);
  // return octokit.repos.createDeployment({
  //   owner: owner,
  //   repo: repo,
  //   ref: ref,
  //   environment: environment,
  //   auto_merge: false,
  //   required_contexts: [],
  // });
};

async function createDeployment(token, repo, environment, instance, sha) {
  console.log("Creating Deployment: ", token, repo, environment, instance, sha);
  const octokit = new github.getOctokit(token);
  const details = repo.split("/");

  const payload = {
    owner: details[0],
    repo: details[1],
    ref: sha,
    environment: `${environment}-${instance}`,
  };

  createGithubDeployment(octokit, payload);
}

module.exports = createDeployment;
