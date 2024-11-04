import { readConfig } from "../actions.js";

export function getMainDir() {
  const mainDir = readConfig().mainDirectory;

  if (!mainDir) {
    console.log(
      "No main directory registered. Please run the register command first."
    );
    process.exit(0);
  }

  return mainDir;
}
