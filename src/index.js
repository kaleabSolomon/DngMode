import chalk from "chalk";
import figlet from "figlet";
export function displayBanner() {
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
    "NerdMode"
  )} - Your Development Workflow, Simplified!
  Choose projects, manage to-dos, and kick off your work effortlessly.
  ${chalk.greenBright(
    "-------------------------------------------------------------"
  )}
  `)
  );
}

displayBanner();
