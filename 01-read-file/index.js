const { createReadStream } = require('node:fs');
const { stdout } = require('node:process');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const read = async () => {
  const path = join(__dirname, 'text.txt');
  const input = createReadStream(path);

  await pipeline(input, stdout);
};

(async () => {
  await read();
})();
