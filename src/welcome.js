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
   init-todos                    initialize a todo database for each project
   add-todo <projectName>        Add a new todo task to a specific project
   list-todos <projectName>      List all todos for a specific project
   open [options] [projectName]  List all projects and open the selected one in Vs Code
   dng --help                     Show all available commands
  `)
  );

  console.log(
    chalk.greenBright(
      "-------------------------------------------------------------\n"
    )
  );
}
