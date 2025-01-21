const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

const { mergeStyles } = require('./mergeStyles.js');
const { copyFolderRecursive } = require('./copyAssets.js');
const { replaceTemplateTags } = require('./replaceTemplate.js');

const buildPage = async ({ build, css, assets, html }) => {
  const targetPath = join(__dirname, build.output);

  await mkdir(targetPath, { recursive: true });

  const cssSourcePath = join(__dirname, css.input);

  await mergeStyles({
    fileName: css.output,
    sourcePath: cssSourcePath,
    targetPath: targetPath,
  });

  const templatePath = join(__dirname, html.template);
  const componentsPath = join(__dirname, html.input);
  const outputPath = join(targetPath, html.output);

  await replaceTemplateTags({
    componentsPath,
    outputPath,
    templatePath,
  });

  const assetsSourcePath = join(__dirname, assets.input);
  const assetsOutputPath = join(targetPath, assets.output);

  await copyFolderRecursive({
    sourcePath: assetsSourcePath,
    targetPath: assetsOutputPath,
  });
};

(async () => {
  try {
    await buildPage({
      build: {
        output: 'project-dist',
      },
      css: {
        input: 'styles',
        output: 'style.css',
      },
      assets: {
        input: 'assets',
        output: 'assets',
      },
      html: {
        input: 'components',
        output: 'index.html',
        template: 'template.html',
      },
    });

    console.debug('Bundle page successful!');
  } catch (error) {
    console.error(error);
  }
})();
