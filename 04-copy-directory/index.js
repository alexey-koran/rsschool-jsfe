const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const inputFolder = '/files';
const outputFolder = '/files-copy';

const copyFile = async (sourcePath, destinationPath, file) => {
  try {
    const sourceFilePath = join(sourcePath, file);
    const destinationFilePath = join(destinationPath, file);

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
  const dirnamePath = __dirname;

  const sourcePath = join(dirnamePath, inputFolder);
  const destinationPath = join(dirnamePath, outputFolder);

  await mkdir(destinationPath, { recursive: true });

  const files = await readdir(sourcePath);
  const copyFiles = await readdir(destinationPath);

  const fileToRemove = copyFiles.filter((file) => !files.includes(file));

  fileToRemove.forEach(async (file) => {
    await rm(join(destinationPath, file));
  });

  files.forEach(async (file) => {
    await copyFile(sourcePath, destinationPath, file);
  });
};

(async () => {
  await cp();
})();
