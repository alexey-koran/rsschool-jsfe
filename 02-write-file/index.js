const { createWriteStream } = require('node:fs');
const { stdin, stdout, exit: exitProcess } = require('node:process');
const { createInterface } = require('node:readline/promises');
const { join } = require('node:path');

const welcomeMessage = 'Welcome!\n';
const farewellMessage = '\nGoodbye!';
const exitCommand = 'exit';

const fileName = 'text.txt';

const handleExit = (writeableStream) => {
  console.log(farewellMessage);

  writeableStream.end();
  exitProcess(0);
};

const readLine = createInterface({
  input: stdin,
  output: stdout,
  prompt: 'Write to file:',
});

const write = async () => {
  console.log(welcomeMessage);

  const path = join(__dirname, fileName);

  const writeableStream = createWriteStream(path, { flags: 'a' });

  readLine.prompt();

  readLine.on('line', async (line) => {
    if (line.trim() === exitCommand) {
      handleExit(writeableStream);
    }

    writeableStream.write(`${line}\n`, 'utf8', (err) => {
      if (err) {
        throw new Error(`Error writing to file: ${err}`);
      }
    });

    readLine.prompt();
  });

  readLine.on('SIGINT', () => {
    handleExit(writeableStream);
  });
};

(async () => {
  try {
    await write();
  } catch (error) {
    console.error(error);
  }
})();
