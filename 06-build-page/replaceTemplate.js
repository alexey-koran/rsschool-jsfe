const { readFile, writeFile, readdir } = require('node:fs/promises');
const { join, extname } = require('node:path');

const replaceTemplateTags = async ({
  templatePath,
  componentsPath,
  outputPath,
}) => {
  try {
    const templateContent = await readFile(templatePath);

    const componentFiles = await readdir(componentsPath, {
      withFileTypes: true,
    });

    let resultContent = templateContent;

    const promises = componentFiles.map(async (file) => {
      const path = join(componentsPath, file.name);
      const extension = extname(path);

      if (file.isFile() && extension === '.html') {
        const fileName = file.name.replace(extension, '');
        const tagName = `{{${fileName}}}`;

        const componentContent = await readFile(path);

        return { tagName, componentContent };
      }
    });

    const results = await Promise.allSettled(promises);

    results.forEach(({ status, value }) => {
      if (status === 'fulfilled' && value) {
        const { tagName, componentContent } = value;

        resultContent = resultContent.replace(
          new RegExp(tagName, 'g'),
          componentContent,
        );
      } else if (status === 'rejected') {
        console.error('Error loading component:', value);
      }
    });

    await writeFile(outputPath, resultContent);
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  replaceTemplateTags,
};
