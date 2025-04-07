const { readFile, writeFile, readdir } = require('node:fs/promises');
const { join, extname } = require('node:path');

const replaceTemplateTags = async ({ paths: { input, template, output } }) => {
  try {
    const templateContent = await readFile(template, 'utf-8');

    const componentFiles = await readdir(input, { withFileTypes: true });

    const components = await Promise.all(
      componentFiles
        .filter((file) => file.isFile() && extname(file.name) === '.html')
        .map(async (file) => {
          const fileName = file.name.replace(extname(file.name), '');

          const tagName = `{{${fileName}}}`;

          const componentContent = await readFile(join(input, file.name));

          return { tagName, componentContent };
        }),
    );

    const resultContent = components.reduce(
      (content, { tagName, componentContent }) =>
        content.replace(new RegExp(tagName, 'g'), componentContent),
      templateContent,
    );

    await writeFile(output, resultContent, 'utf-8');
  } catch (error) {
    console.error(`Error processing template tags: ${error.message}`);

    throw new Error(error);
  }
};

module.exports = {
  replaceTemplateTags,
};
