const { mkdir } = require('node:fs/promises');
const { join } = require('node:path');

const { mergeStyles } = require('./mergeStyles.js');
const { copyFolder } = require('./copyAssets.js');
const { replaceTemplateTags } = require('./replaceTemplate.js');

const buildPage = async ({ build, css, assets, html }) => {
  const targetPath = join(__dirname, build.output);

  await mkdir(targetPath, { recursive: true });

  await mergeStyles({
    paths: {
      input: join(__dirname, css.input),
      output: join(targetPath, css.output),
    },
  });

  await replaceTemplateTags({
    paths: {
      input: join(__dirname, html.input),
      template: join(__dirname, html.template),
      output: join(targetPath, html.output),
    },
  });

  await copyFolder({
    paths: {
      input: join(__dirname, assets.input),
      output: join(targetPath, assets.output),
    },
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
