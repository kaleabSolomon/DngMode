import displayBanner from "./welcome.js";
import { Command } from "commander";
import { openProjectFromName, openProjects } from "./commands.js";

const program = new Command();

const dng = program
  .command("dng")
  .description("CLI Tool for managing projects")
  .version("1.0.0")
  .action(displayBanner);

async function main() {
  dng
    .command("open")
    .description("List all projects and open the selected one in Vs Code")
    .argument("[projectName]", "name of project to open")
    .action(async (projectName) => {
      projectName ? openProjectFromName(projectName) : await openProjects();
    });

  program.parse(process.argv);

  // Display help if no command is specified
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main();
