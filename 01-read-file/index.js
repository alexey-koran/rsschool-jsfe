const { createReadStream } = require('node:fs');
const { stdout } = require('node:process');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const read = async (input) => {
  const sourcePath = join(__dirname, input);
  const sourceStream = createReadStream(sourcePath);

  await pipeline(sourceStream, stdout);
};

(async () => {
  try {
    const input = 'text.txt';

    await read(input);
  } catch (error) {
    console.error(error);
  }
})();
