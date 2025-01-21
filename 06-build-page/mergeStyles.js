const { createReadStream, createWriteStream } = require('node:fs');
const { readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join, extname } = require('node:path');

const mergeStyles = async ({ paths: { input, output } }) => {
  await rm(output, { force: true });

  const sourceDirList = await readdir(input, { withFileTypes: true });

  const cssFiles = sourceDirList
    .filter((file) => file.isFile() && extname(file.name) === '.css')
    .map((file) => join(input, file.name));

  await Promise.all(
    cssFiles.map(async (cssFile) => {
      const targetStream = createWriteStream(output, { flags: 'a' });

      await pipeline(createReadStream(cssFile), targetStream);
    }),
  );
};

module.exports = {
  mergeStyles,
};
