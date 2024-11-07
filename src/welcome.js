import chalk from "chalk";
import logo from "asciiart-logo";
export default function displayBanner() {
  console.clear();

  console.log(
    logo({
      name: "dngmode",
      font: "Banner3-D",
      lineChars: 10,
      padding: 5,
      margin: 3,
      borderColor: "green",
      logoColor: "bold-green",
      textColor: "green",
    }).render()
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
   register                      Register a main directory for your projects
   init-todos                    initialize a todo database for each project
   add-todo <projectName>        Add a new todo task to a specific project
   list-todos <projectName>      List all todos for a specific project
   open [options] [projectName]  List all projects and open the selected one in Vs Code
  `)
  );

  console.log(
    chalk.greenBright(
      "-------------------------------------------------------------\n"
    )
  );
}
