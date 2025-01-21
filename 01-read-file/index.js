const { createReadStream } = require('node:fs');
const { stdout } = require('node:process');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const read = async (input) => {
  const path = join(__dirname, input);
  const inputStream = createReadStream(path);

  await pipeline(inputStream, stdout);
};

(async () => {
  try {
    const input = 'text.txt';

    await read(input);
  } catch (error) {
    console.error(error);
  }
})();
