import displayBanner from "./welcome.js";
import { Command } from "commander";
import {
  openPostman,
  openProjectFromName,
  openProjects,
  openSpotify,
} from "./commands.js";
import { initializeProjectTodos, addTodo, getTodos } from "./utils/db.js";
import { mapProjects } from "./utils/listDir.js";

const program = new Command();

const dng = program
  .command("dng")
  .description("CLI Tool for managing projects")
  .version("1.0.0")
  .action(displayBanner);

async function main() {
  dng
    .command("init-todos")
    .description("initialize a todo database for each project")
    .action(async () => {
      const projectList = await mapProjects("/home/kaleab/Documents/Dev/");
      initializeProjectTodos(projectList);
    });
  // Command to add a todo to a specific project
  dng
    .command("add-todo")
    .description("Add a new todo task to a specific project")
    .argument("<projectName>", "Name of the project")
    .argument("<task>", "The todo task to add")
    .action((projectName, task) => {
      addTodo(projectName, task);
      console.log(`Added task "${task}" to project "${projectName}"`);
    });

  dng
    .command("list-todos")
    .description("List all todos for a specific project")
    .argument("<projectName>", "Name of the project")
    .action((projectName) => {
      const todos = getTodos(projectName);
      console.log(`Todos for project "${projectName}":`);
      todos.forEach((todo, index) => {
        console.log(`${index + 1}. ${todo.task}`);
      });
    });

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
