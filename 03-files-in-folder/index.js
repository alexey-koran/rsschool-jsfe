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

  return await Promise.all(
    dirList
      .filter((element) => element.isFile())
      .map(async (element) => {
        const filePath = join(dirPath, element.name);

        const { extension, size } = await getFileInfo(filePath);

        const name = element.name.replace(extension, '');

        return {
          extension: extension.slice(1),
          name,
          size,
        };
      }),
  );
};

const ls = async (input) => {
  const sourcePath = join(__dirname, input);

  try {
    const filesInfo = await getFilesInfo(sourcePath);

    filesInfo.forEach(({ name, extension, size }) => {
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
