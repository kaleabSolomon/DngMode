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

  //   const title = chalk.greenBright(
  //     figlet.textSync("DNGmode", {
  //       font: "Slant",
  //       horizontalLayout: "default",
  //       verticalLayout: "default",
  //     })
  //   );

  //   const terminalWidth = process.stdout.columns; // get terminal width
  //   const textwidth = title.split("\n")[0].length;

  //   const padding = Math.max(0, Math.floor((terminalWidth - textwidth) / 2));

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
    dng choose                   Choose Between Projects
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
