const { createWriteStream } = require('node:fs');
const { stdin, stdout, exit: exitProcess } = require('node:process');
const { createInterface } = require('node:readline/promises');
const { join } = require('node:path');

const handleExit = (targetStream, farewellMessage) => {
  console.log(farewellMessage);

  targetStream.end();
  exitProcess(0);
};

const writeToFile = async ({
  output,
  exitCommand,
  messages: { welcome, farewell, prompt },
}) => {
  console.log(welcome);

  const targetPath = join(__dirname, output);

  const targetStream = createWriteStream(targetPath, { flags: 'a' });

  const readLine = createInterface({
    input: stdin,
    output: stdout,
    prompt,
  });

  readLine.prompt();

  readLine.on('line', (line) => {
    if (line.trim() === exitCommand) {
      handleExit(targetStream, farewell);
    } else {
      targetStream.write(`${line}\n`);

      readLine.prompt();
    }
  });

  readLine.on('SIGINT', () => handleExit(targetStream, farewell));
};

(async () => {
  try {
    const output = 'text.txt';
    const exitCommand = 'exit';

    const welcome = 'Welcome!\n';
    const farewell = '\nGoodbye!';
    const prompt = 'Write to file:';

    await writeToFile({
      output,
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
