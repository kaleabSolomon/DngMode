import chalk from "chalk";
import figlet from "figlet";
export default function displayBanner() {
  console.clear();

  console.log(
    chalk.greenBright(
      figlet.textSync("DNGmode", {
        font: "Slant",
        horizontalLayout: "default",
        verticalLayout: "default",
      })
    )
  );

  console.log(
    chalk.whiteBright(`
  Welcome to ${chalk.bold.blue(
    "DNGmode"
  )} - Your Development Workflow, Simplified!
  Choose projects, manage to-dos, and kick off your work effortlessly.
  ${chalk.greenBright(
    "-------------------------------------------------------------"
  )}
  `)
  );

  console.log(
    chalk.yellowBright(`
  Usage:
    dng open                     Display available projects
    dng open <project-name>      Open a specific project
    dng todo <project-name>      Manage your project to-dos
    dng help                     Show all available commands
  `)
  );

  console.log(
    chalk.greenBright(
      "-------------------------------------------------------------\n"
    )
  );
}
