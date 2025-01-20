const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const inputFolder = '/files';
const outputFolder = '/files-copy';

const cp = async () => {
  const dirnamePath = __dirname;

  const sourcePath = join(dirnamePath, inputFolder);
  const destinationPath = join(dirnamePath, outputFolder);

  await mkdir(destinationPath, { recursive: true });

  const files = await readdir(sourcePath);

  files.forEach(async (file) => {
    const sourceFilePath = join(sourcePath, file);
    const destinationFilePath = join(destinationPath, file);

    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(destinationFilePath);

    await pipeline(sourceStream, destinationStream);
  });
};

(async () => {
  await cp();
})();
