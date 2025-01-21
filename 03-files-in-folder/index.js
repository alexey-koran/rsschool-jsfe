const { readdir, stat } = require('node:fs/promises');
const { join, extname } = require('node:path');

const getFileInfo = async (path) => {
  const extension = extname(path);

  const { size } = await stat(path);

  return {
    extension,
    size: size / 1000,
  };
};

const getFilesInfo = async (dirPath) => {
  const dirList = await readdir(dirPath, { withFileTypes: true });

  const fileStats = await Promise.all(
    dirList
      .filter((element) => element.isFile())
      .map(async (element) => {
        const path = join(dirPath, element.name);

        const { extension, size } = await getFileInfo(path);

        const name = element.name.replace(extension, '');

        return {
          extension: extension.slice(1),
          name,
          size,
        };
      }),
  );

  return fileStats;
};

const ls = async (input) => {
  const dirnamePath = join(__dirname, input);

  try {
    const fileInfo = await getFilesInfo(dirnamePath);

    fileInfo.forEach(({ name, extension, size }) => {
      console.debug(`${name} - ${extension} - ${size}Kb`);
    });
  } catch (error) {
    throw new Error('Error processing directory:', error);
  }
};

(async () => {
  try {
    const input = 'secret-folder';

    await ls(input);
  } catch (error) {
    console.error(error);
  }
})();
