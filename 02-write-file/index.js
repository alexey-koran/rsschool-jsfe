const { createWriteStream } = require('node:fs');
const { stdin, stdout, exit: exitProcess } = require('node:process');
const { createInterface } = require('node:readline/promises');
const { join } = require('node:path');

const handleExit = (writeableStream, farewellMessage) => {
  console.log(farewellMessage);

  writeableStream.end();
  exitProcess(0);
};

const writeToFile = async ({
  fileName,
  exitCommand,
  messages: { welcome, farewell, prompt },
}) => {
  console.log(welcome);

  const path = join(__dirname, fileName);

  const writeableStream = createWriteStream(path, { flags: 'a' });

  const readLine = createInterface({
    input: stdin,
    output: stdout,
    prompt,
  });

  readLine.prompt();

  readLine.on('line', (line) => {
    if (line.trim() === exitCommand) {
      handleExit(writeableStream, farewell);
    } else {
      writeableStream.write(`${line}\n`);

      readLine.prompt();
    }
  });

  readLine.on('SIGINT', () => handleExit(writeableStream, farewell));
};

(async () => {
  try {
    const fileName = 'text.txt';
    const exitCommand = 'exit';

    const welcome = 'Welcome!\n';
    const farewell = '\nGoodbye!';
    const prompt = 'Write to file:';

    await writeToFile({
      fileName,
      exitCommand,
      messages: {
        welcome,
        farewell,
        prompt,
      },
    });
  } catch (error) {
    console.error(error);
  }
})();
