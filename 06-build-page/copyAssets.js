const { createReadStream, createWriteStream } = require('node:fs');
const { mkdir, readdir, rm, stat } = require('node:fs/promises');
const { pipeline } = require('node:stream/promises');
const { join } = require('node:path');

const copyFile = async (sourcePath, targetPath) => {
  await pipeline(createReadStream(sourcePath), createWriteStream(targetPath));
};

const copyFolderRecursive = async ({ paths: { input, output } }) => {
  await mkdir(output, { recursive: true });

  const entries = await readdir(input, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const sourceEntryPath = join(input, entry.name);
      const targetEntryPath = join(output, entry.name);

      if (entry.isDirectory()) {
        return copyFolderRecursive({
          paths: { input: sourceEntryPath, output: targetEntryPath },
        });
      } else if (entry.isFile()) {
        return copyFile(sourceEntryPath, targetEntryPath);
      }
    }),
  );

  const targetEntries = await readdir(output, { withFileTypes: true });

  await Promise.all(
    targetEntries.map(async (destEntry) => {
      const destEntryPath = join(output, destEntry.name);
      const sourceEntryPath = join(input, destEntry.name);

      try {
        await stat(sourceEntryPath);
      } catch {
        await rm(destEntryPath, { recursive: true, force: true });
      }
    }),
  );
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
