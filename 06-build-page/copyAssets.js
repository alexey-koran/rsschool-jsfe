const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm, stat } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const copyFile = async (sourceFilePath, destinationFilePath) => {
  try {
    const sourceStream = createReadStream(sourceFilePath);
    const destinationStream = createWriteStream(destinationFilePath);

    await pipeline(sourceStream, destinationStream);
  } catch (error) {
    throw new Error(
      `Error copying file: ${sourceFilePath} -> ${destinationFilePath}. ${error.message}`,
    );
  }
};

const copyFolderRecursive = async ({
  sourcePath,
  destinationPath,
  ignoredFiles = [],
}) => {
  console.debug('destinationPath:', destinationPath);

  try {
    await mkdir(destinationPath, { recursive: true });

    const entries = await readdir(sourcePath, { withFileTypes: true });

    entries.forEach(async (entry) => {
      const sourceEntryPath = join(sourcePath, entry.name);
      const destinationEntryPath = join(destinationPath, entry.name);

      if (ignoredFiles.includes(entry.name)) {
        return;
      }

      if (entry.isDirectory()) {
        await copyFolderRecursive({
          sourcePath: sourceEntryPath,
          destinationPath: destinationEntryPath,
          ignoredFiles,
        });
      } else if (entry.isFile()) {
        await copyFile(sourceEntryPath, destinationEntryPath);
      }
    });

    const destinationEntries = await readdir(destinationPath, {
      withFileTypes: true,
    });

    destinationEntries.forEach(async (destEntry) => {
      const destEntryPath = join(destinationPath, destEntry.name);
      const sourceEntryPath = join(sourcePath, destEntry.name);

      try {
        await stat(sourceEntryPath);
      } catch {
        await rm(destEntryPath, { recursive: true, force: true });
      }
    });
  } catch (error) {
    throw new Error(
      `Error copying folder: ${sourcePath} -> ${destinationPath}. ${error.message}`,
    );
  }
};

module.exports = {
  copyFolderRecursive,
};
