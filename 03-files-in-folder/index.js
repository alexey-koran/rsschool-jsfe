const { readdir, stat } = require('node:fs/promises');
const { join, extname } = require('node:path');

const folderPath = '/secret-folder';

const ls = async () => {
  const dirnamePath = join(__dirname, folderPath);

  const dirList = await readdir(dirnamePath, {
    withFileTypes: true,
  });

  const onlyFiles = dirList.filter((element) => element.isFile());

  const tablePromises = onlyFiles.map(async (element) => {
    const path = join(element.parentPath, element.name);

    const extension = extname(path);

    const extensionWithoutDot = extension ? extension.slice(1) : '';

    const { size } = await stat(path);

    const sizeInKb = size / 1000;

    return {
      name: element.name,
      extension: extensionWithoutDot,
      size: sizeInKb,
    };
  });

  (await Promise.allSettled(tablePromises)).forEach(
    ({ value: { name, extension, size } }) => {
      console.debug(`${name} - ${extension} - ${size}Kb`);
    },
  );
};

(async () => {
  await ls();
})();
