const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const inputFolder = 'files';
const outputFolder = 'files-copy';

const copyFile = async (sourceFilePath, targetFilePath) => {
  const sourceStream = createReadStream(sourceFilePath);
  const targetStream = createWriteStream(targetFilePath);

  await pipeline(sourceStream, targetStream);

  return true;
};

const cp = async () => {
  const sourcePath = join(__dirname, inputFolder);
  const targetPath = join(__dirname, outputFolder);

  await mkdir(targetPath, { recursive: true });

  const files = await readdir(sourcePath);
  const copyFiles = await readdir(targetPath);

  const fileToRemove = copyFiles.filter((file) => !files.includes(file));

  fileToRemove.forEach(async (file) => {
    const targetFilePath = join(targetPath, file);

    await rm(targetFilePath);
  });

  files.forEach(async (file) => {
    const sourceFilePath = join(sourcePath, file);
    const targetFilePath = join(targetPath, file);

    await copyFile(sourceFilePath, targetFilePath);
  });
};

(async () => {
  try {
    await cp();

    console.debug('Copy directory successful!');
  } catch (error) {
    console.error(error);
  }
})();
