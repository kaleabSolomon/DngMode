import fs from "fs";
import path from "path";

import { commonExcludes, codeExtensions } from "./constants.js";

// Check if a directory name should be excluded
function shouldExclude(dirName) {
  return commonExcludes.includes(dirName);
}

// Check if a directory contains any code files directly within it
async function containsCodeFiles(dirPath) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    if (
      !entry.isDirectory() &&
      codeExtensions.includes(path.extname(entry.name))
    ) {
      return true;
    }
  }
  return false;
}

// Recursively find source directories containing code files
export async function findSourceDirectories(currentPath) {
  const sourceDirs = [];

  try {
    const entries = await fs.promises.readdir(currentPath, {
      withFileTypes: true,
    });

    // Base case: No children, exit the directory
    if (entries.length === 0) {
      return sourceDirs; // Empty array as there are no source directories
    }

    // Check if any children have code files
    if (await containsCodeFiles(currentPath)) {
      sourceDirs.push(currentPath);

      return sourceDirs;
    }

    // Otherwise, recursively check each subdirectory
    for (const entry of entries) {
      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory() && !shouldExclude(entry.name)) {
        // Recurse into non-excluded subdirectories
        const subSourceDirs = await findSourceDirectories(entryPath);
        sourceDirs.push(...subSourceDirs);
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${currentPath}:`, err);
  }

  return sourceDirs;
}

export async function mapProjects(mainPath) {
  const projectDirs = await findSourceDirectories(mainPath);

  return projectDirs.map((path) => ({
    name: path.split("/").pop(),
    path,
  }));
}
