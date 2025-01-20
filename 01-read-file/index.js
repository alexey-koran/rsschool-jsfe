const { createReadStream } = require('node:fs');
const { stdout } = require('node:process');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const fileName = 'text.txt';

const read = async () => {
  const path = join(__dirname, fileName);
  const input = createReadStream(path);

  await pipeline(input, stdout);
};

(async () => {
  try {
    await read();
  } catch (error) {
    console.error(error);
  }
})();
