const core = require("@actions/core");

const setDeploymentStatus = require("./deploy-status");

// This script is designed to work with apps that support dynamic instances.
// Not all apps support dynamic instances.
const SUPPORTED_REPOS = ["astrosat/orbis"];

const checkRepoOption = (repo) => {
  const isSupportedRepo = SUPPORTED_REPOS.includes(repo);
  console.log("SUPPORTED REPO: ", isSupportedRepo, repo);
  return isSupportedRepo;
};

async function run() {
  try {
    const repo = core.getInput("repo");
    console.log("REPO: ", repo);

    // if (!checkRepoOption(repo)) {
    //   console.log("REPO NOT SUPPORTED");
    //   core.setFailed("Non supported repo: ", repo);
    //   return;
    // }

    const token = core.getInput("token");
    console.log("TOKEN: ", token);
    const environment = core.getInput("environment");
    console.log("ENVIRONMENT: ", environment);
    const prNumber = core.getInput("pr-number");
    console.log("PR NUMBER: ", prNumber);
    const inactive = core.getInput("auto-inactive");
    console.log("Auto-Inactive: ", inactive);

    setDeploymentStatus(token, repo, environment, prNumber, inactive);
  } catch (err) {
    core.setFailed(err.message);
  }
}

run();
