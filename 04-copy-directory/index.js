const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const inputFolder = 'files';
const outputFolder = 'files-copy';

const copyFile = async (sourceFilePath, destinationFilePath) => {
  try {
    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(destinationFilePath);

    await pipeline(sourceStream, destinationStream);
  } catch (error) {
    console.error(error);
    return false;
  }

  return true;
};

const cp = async () => {
  const sourcePath = join(__dirname, inputFolder);
  const destinationPath = join(__dirname, outputFolder);

  await mkdir(destinationPath, { recursive: true });

  const files = await readdir(sourcePath);
  const copyFiles = await readdir(destinationPath);

  const fileToRemove = copyFiles.filter((file) => !files.includes(file));

  fileToRemove.forEach(async (file) => {
    const destinationFilePath = join(destinationPath, file);

    await rm(destinationFilePath);
  });

  files.forEach(async (file) => {
    const sourceFilePath = join(sourcePath, file);
    const destinationFilePath = join(destinationPath, file);

    await copyFile(sourceFilePath, destinationFilePath);
  });
};

(async () => {
  try {
    await cp();
  } catch (error) {
    console.error(error);
  }
})();
