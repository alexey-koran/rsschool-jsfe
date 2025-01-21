const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const copyFile = async (sourceFilePath, targetFilePath) => {
  const sourceStream = createReadStream(sourceFilePath);
  const targetStream = createWriteStream(targetFilePath);
  await pipeline(sourceStream, targetStream);
};

const copyFiles = async ({ inputFolder, outputFolder }) => {
  const sourcePath = join(__dirname, inputFolder);
  const targetPath = join(__dirname, outputFolder);

  await mkdir(targetPath, { recursive: true });

  const [sourceFiles, targetFiles] = await Promise.all([
    readdir(sourcePath),
    readdir(targetPath),
  ]);

  const fileToRemove = targetFiles.filter(
    (file) => !sourceFiles.includes(file),
  );

  const operations = [
    ...fileToRemove.map((file) => rm(join(targetPath, file))),
    ...sourceFiles.map((file) =>
      copyFile(join(sourcePath, file), join(targetPath, file)),
    ),
  ];

  await Promise.allSettled(operations);
};

(async () => {
  try {
    const inputFolder = 'files';
    const outputFolder = 'files-copy';

    await copyFiles({ inputFolder, outputFolder });

    console.debug('Copying of directory files was successful!');
  } catch (error) {
    console.error('Error copying files:', error);
  }
})();
