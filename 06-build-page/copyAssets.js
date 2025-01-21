const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm, stat } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const copyFile = async (sourceFilePath, targetFilePath) => {
  try {
    const sourceStream = createReadStream(sourceFilePath);
    const targetStream = createWriteStream(targetFilePath);

    await pipeline(sourceStream, targetStream);
  } catch (error) {
    throw new Error(
      `Error copying file: ${sourceFilePath} -> ${targetFilePath}. ${error.message}`,
    );
  }
};

const copyFolderRecursive = async ({ sourcePath, targetPath }) => {
  try {
    await mkdir(targetPath, { recursive: true });

    const entries = await readdir(sourcePath, { withFileTypes: true });
    entries.forEach(async (entry) => {
      const sourceEntryPath = join(sourcePath, entry.name);
      const targetEntryPath = join(targetPath, entry.name);

      if (entry.isDirectory()) {
        await copyFolderRecursive({
          sourcePath: sourceEntryPath,
          targetPath: targetEntryPath,
        });
      } else if (entry.isFile()) {
        await copyFile(sourceEntryPath, targetEntryPath);
      }
    });

    const targetEntries = await readdir(targetPath, {
      withFileTypes: true,
    });

    targetEntries.forEach(async (destEntry) => {
      const destEntryPath = join(targetPath, destEntry.name);
      const sourceEntryPath = join(sourcePath, destEntry.name);

      try {
        await stat(sourceEntryPath);
      } catch {
        await rm(destEntryPath, { recursive: true, force: true });
      }
    });
  } catch (error) {
    throw new Error(
      `Error copying folder: ${sourcePath} -> ${targetPath}. ${error.message}`,
    );
  }
};

module.exports = {
  copyFolderRecursive,
};
