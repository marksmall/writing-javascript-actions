import getJoke from "./joke";
const core = require("@actions/core");

async function run() {
  const joke = await getJoke();
  console.log("Current Joke: ", joke);
  core.setOutput("joke-output", joke);
}

console.log("Running Joke action");
run();
