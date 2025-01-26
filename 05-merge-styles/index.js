const { createReadStream, createWriteStream } = require('node:fs');
const { readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join, extname } = require('node:path');

const mergeCSSFiles = async ({ input, output }) => {
  const sourcePath = join(__dirname, input);
  const targetPath = join(__dirname, output);

  await rm(targetPath, { force: true });

  const sourceDirList = await readdir(sourcePath, { withFileTypes: true });

  const styles = sourceDirList.filter(
    (element) => element.isFile() && extname(element.name) === '.css',
  );

  const inputFiles = await Promise.all(
    styles.map(async (cssFile) => {
      const sourceFilePath = join(sourcePath, cssFile.name);

      const sourceStream = createReadStream(sourceFilePath);
      const targetStream = createWriteStream(targetPath, { flags: 'a' });

      await pipeline(sourceStream, targetStream);

      return {
        name: cssFile.name,
      };
    }),
  );

  return {
    inputFiles,
  };
};

(async () => {
  try {
    const input = 'styles';
    const output = join('project-dist', 'bundle.css');

    console.info(`Merging css files from '${input}' folder:\n`);

    const { inputFiles } = await mergeCSSFiles({ input, output });

    const inputNames = inputFiles
      .reduce((acc, { name }) => `${acc} '${name}'`, '')
      .trim('');

    console.info(inputNames);

    console.info(`\nMerging into '${output}' was successful!`);
  } catch (error) {
    console.error(error);
  }
})();
