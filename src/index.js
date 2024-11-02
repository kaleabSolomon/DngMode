import displayBanner from "./welcome.js";
import { Command } from "commander";
import {
  openPostman,
  openProjectFromName,
  openProjects,
  openSpotify,
} from "./commands.js";

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
    .option("-s, --spotify", "Open Spotify alongside project")
    .option("-p, --postman", "Open Postman alongside project")
    .action(async (projectName, options) => {
      if (options.spotify) openSpotify();
      if (options.postman) openPostman();
      projectName ? openProjectFromName(projectName) : await openProjects();
    });

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main();
