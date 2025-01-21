const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

const { mergeStyles } = require('./mergeStyles.js');
const { copyFolderRecursive } = require('./copyAssets.js');

const buildPage = async ({ build, css, assets }) => {
  const destinationPath = join(__dirname, build.outputFolder);

  await mkdir(destinationPath, { recursive: true });

  const cssSourcePath = join(__dirname, css.inputFolder);

  await mergeStyles({
    bundleName: css.bundleName,
    sourcePath: cssSourcePath,
    destinationPath,
  });

  const assetsSourcePath = join(__dirname, assets.inputFolder);
  const assetsDestinationPath = join(destinationPath, assets.outputFolder);

  await copyFolderRecursive({
    sourcePath: assetsSourcePath,
    destinationPath: assetsDestinationPath,
    ignoredFiles: [css.bundleName],
  });
};

(async () => {
  try {
    await buildPage({
      build: {
        outputFolder: 'project-dist',
      },
      css: {
        inputFolder: 'styles',
        bundleName: 'style.css',
      },
      assets: {
        inputFolder: 'assets',
        outputFolder: 'assets',
      },
    });

    console.debug('Bundle page successful!');
  } catch (error) {
    console.error(error);
  }
})();
