const { createReadStream, createWriteStream } = require('node:fs');
const { readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join, extname } = require('node:path');

const inputFolder = 'styles';
const outputFolder = 'project-dist';

const bundleName = 'bundle.css';

const mergeStyles = async () => {
  const sourcePath = join(__dirname, inputFolder);
  const targetPath = join(__dirname, outputFolder);

  const bundleFilePath = join(targetPath, bundleName);

  await rm(bundleFilePath, { force: true });

  const sourceDirList = await readdir(sourcePath, {
    withFileTypes: true,
  });

  const styles = sourceDirList.filter((element) => {
    const path = join(element.parentPath, element.name);
    const extension = extname(path);

    return element.isFile() && extension === '.css';
  });

  styles.forEach(async (cssFile) => {
    const sourceFilePath = join(sourcePath, cssFile.name);

    const sourceStream = createReadStream(sourceFilePath);

    const targetStream = createWriteStream(bundleFilePath, {
      flags: 'a',
    });

    await pipeline(sourceStream, targetStream);
  });
};

(async () => {
  try {
    await mergeStyles();

    console.debug('Success!');
  } catch (error) {
    console.error(error);
  }
})();
