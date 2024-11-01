import { mapProjects } from "./utils/listDir.js";
import displayBanner from "./welcome.js";
import { Command } from "commander";
import { chooseProject, openProject } from "./commands.js";

const program = new Command();

const dng = program
  .command("dng")
  .description("CLI Tool for managing projects")
  .version("1.0.0")
  .action(displayBanner);
async function listProjects() {
  try {
    const projectList = await mapProjects("/home/kaleab/Documents/Dev/");
    const selectedProjectPath = await chooseProject(projectList);
    openProject(selectedProjectPath);
  } catch (error) {
    console.error("an error occured", error);
  }
}
async function main() {
  dng
    .command("list")
    .description("List all projects and open the selected one in Vs Code")
    .action(async () => await listProjects());
  program.parse(process.argv);

  // Display help if no command is specified
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main();
