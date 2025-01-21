const { createReadStream, createWriteStream } = require('node:fs');
const { readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join, extname } = require('node:path');

const mergeStyles = async ({ input, output }) => {
  const sourcePath = join(__dirname, input);

  const outputPath = join(__dirname, output);

  await rm(outputPath, { force: true });

  const sourceDirList = await readdir(sourcePath, { withFileTypes: true });

  const styles = sourceDirList.filter(
    (element) => element.isFile() && extname(element.name) === '.css',
  );

  const copyPromises = styles.map((cssFile) => {
    const sourceFilePath = join(sourcePath, cssFile.name);

    const sourceStream = createReadStream(sourceFilePath);
    const targetStream = createWriteStream(outputPath, { flags: 'a' });

    return pipeline(sourceStream, targetStream);
  });

  await Promise.all(copyPromises);
};

(async () => {
  try {
    const input = 'styles';
    const output = 'project-dist/bundle.css';

    await mergeStyles({ input, output });

    console.debug('Success!');
  } catch (error) {
    console.error(error);
  }
})();
