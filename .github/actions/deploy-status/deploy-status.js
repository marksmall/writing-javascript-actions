const github = require("@actions/github");

const handleError = (args) => console.error(...args);

async function setDeploymentStatus(
  token,
  repo,
  environment,
  prNumber,
  status,
  inactive
) {
  console.log(
    "Setting Deployment Status: ",
    token,
    repo,
    environment,
    prNumber,
    status,
    inactive
  );
  const octokit = new github.getOctokit(token, {
    previews: ["flash-preview", "ant-man-preview"],
  });
  const details = repo.split("/");

  // Lookup the deployment ID from the environment name
  const deployments = await octokit.repos
    .listDeployments({
      owner: details[0],
      repo: details[1],
      environment: environment,
    })
    .catch(handleError);

  if (deployments.data.length < 1) {
    handleError(
      `Error: No deployments found for repo ${repo} environment ${environment}`
    );
  } else {
    // The first one should be the most recent
    const deploymentId = deployments.data[0].id;

    console.log(`Setting deployment ${deploymentId} to status success`);

    const payload = {
      owner: details[0],
      repo: details[1],
      deployment_id: deploymentId,
      state: status,
      auto_inactive: inactive,
    };
    console.log("PAYLOAD: ", payload);
    // await octokit.repos.createDeploymentStatus(payload).catch(handleError);
  }
}

module.exports = setDeploymentStatus;
