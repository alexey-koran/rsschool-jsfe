const semver = require('semver');
const colors = require('colors/safe');

const { engines: { node: nodeVersion }} = require('./package');

console.log(`
If you enjoyed the task, please give it a star: https://github.com/Shastel/brackets
`)

if (!semver.satisfies(process.version, nodeVersion)) {
  process.emitWarning(
    colors.red(`
      For this task we are strictly recomend you to use node ${nodeVersion}.
      Now you are using node ${process.version}, if you are using any of features that not supported by node ${nodeVersion}, score won't be submitted
    `)
  );
}
