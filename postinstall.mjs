import semver from 'semver';
import colors from 'colors/safe.js';

const { default: { engines: { node: nodeVersion }} } = await import('./package.json', {
  with: { type: 'json' },
});

if (!semver.satisfies(process.version, nodeVersion)) {
  process.emitWarning(
    colors.red(`
      For this task we are strictly recommend you to use node ${nodeVersion}.
      Now you are using node ${process.version}, if you are using any of features that not supported by node ${nodeVersion}, score won't be submitted
    `)
  );
}
