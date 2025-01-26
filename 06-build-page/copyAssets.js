const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const copyFile = async (sourcePath, targetPath) => {
  await pipeline(createReadStream(sourcePath), createWriteStream(targetPath));
};

const copyFolderRecursive = async ({ paths: { input, output } }) => {
  await mkdir(output, { recursive: true });

  const [sourceEntries, targetEntries] = await Promise.all([
    readdir(input, { withFileTypes: true }),
    readdir(output, { withFileTypes: true }),
  ]);

  const copyOperations = sourceEntries.map(async (entry) => {
    const sourceEntryPath = join(input, entry.name);
    const targetEntryPath = join(output, entry.name);

    if (entry.isDirectory()) {
      return copyFolderRecursive({
        paths: {
          input: sourceEntryPath,
          output: targetEntryPath,
        },
      });
    } else if (entry.isFile()) {
      return copyFile(sourceEntryPath, targetEntryPath);
    }
  });

  const filesToRemove = targetEntries.filter(
    (targetFile) =>
      !sourceEntries.some((sourceFile) => sourceFile.name === targetFile.name),
  );

  const removeOperations = filesToRemove.map((dirent) =>
    rm(join(output, dirent.name), { recursive: true, force: true }),
  );

  await Promise.all([...copyOperations, ...removeOperations]);
};

const copyFolder = async ({ paths: { input, output } }) => {
  try {
    await copyFolderRecursive({ paths: { input, output } });
  } catch (error) {
    throw new Error(
      `Error copying folder: ${input} -> ${output}. ${error.message}`,
    );
  }
};

module.exports = {
  copyFolder,
};
