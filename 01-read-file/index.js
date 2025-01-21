const { createReadStream } = require('node:fs');
const { stdout } = require('node:process');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const read = async (fileName) => {
  const path = join(__dirname, fileName);
  const input = createReadStream(path);

  await pipeline(input, stdout);
};

(async () => {
  try {
    const fileName = 'text.txt';

    await read(fileName);
  } catch (error) {
    console.error(error);
  }
})();
