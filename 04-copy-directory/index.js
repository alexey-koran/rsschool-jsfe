const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const copyFile = async (input, output) => {
  const sourceStream = createReadStream(input);
  const targetStream = createWriteStream(output);

  await pipeline(sourceStream, targetStream);
};

const copyFiles = async ({ input, output }) => {
  const sourcePath = join(__dirname, input);
  const targetPath = join(__dirname, output);

  await mkdir(targetPath, { recursive: true });

  const [sourceFiles, targetFiles] = await Promise.all([
    readdir(sourcePath),
    readdir(targetPath),
  ]);

  const filesToRemove = targetFiles.filter(
    (file) => !sourceFiles.includes(file),
  );

  const operations = [
    ...filesToRemove.map((file) => rm(join(targetPath, file))),
    ...sourceFiles.map((file) =>
      copyFile(join(sourcePath, file), join(targetPath, file)),
    ),
  ];

  await Promise.all(operations);
};

(async () => {
  try {
    const input = 'files';
    const output = 'files-copy';

    await copyFiles({ input, output });

    console.debug('Copying of directory files was successful!');
  } catch (error) {
    console.error('Error copying files:', error);
  }
})();
