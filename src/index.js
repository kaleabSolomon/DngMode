#!/usr/bin/env node

import displayBanner from "./welcome.js";
import { Command } from "commander";
import {
  getTaskFromInput,
  openPostman,
  openProjectFromName,
  openProjects,
  openSpotify,
  readConfig,
  writeConfig,
} from "./actions.js";
import {
  initializeProjectTodos,
  addTodo,
  getTodos,
  markTodosAsDone,
} from "./utils/db.js";
import { mapProjects } from "./utils/listDir.js";
import inquirer from "inquirer";
import { styleTask } from "./helpers/styleTasks.js";

import { getMainDir } from "./helpers/getMainDir.js";

const program = new Command();

const dng = program
  .command("dng")
  .description("CLI Tool for managing projects")
  .version("1.0.0")
  .action(displayBanner);

async function main() {
  dng
    .command("register")
    .description("Register a main directory for your projects")
    .action(async () => {
      const { mainDir } = await inquirer.prompt([
        {
          type: "input",
          name: "mainDir",
          message: "Enter the main directory path for your projects:",
          validate: (input) =>
            input.length > 0 || "Please enter a valid directory path",
        },
      ]);
      writeConfig(mainDir);
    });
  dng
    .command("init-todos")
    .description("initialize a todo database for each project")
    .action(async () => {
      const mainDir = getMainDir();

      const projectList = await mapProjects(mainDir);
      initializeProjectTodos(projectList);
    });
  // Command to add a todo to a specific project
  dng
    .command("add-todo")
    .description("Add a new todo task to a specific project")
    .argument("<projectName>", "Name of the project")
    .action(async (projectName) => {
      const { task, priority } = await getTaskFromInput(projectName);
      addTodo(projectName, task, priority);
      console.log(`Added task "${task}" to project "${projectName}"`);
    });

  dng
    .command("list-todos")
    .description("List all todos for a specific project")
    .argument("<projectName>", "Name of the project")
    .action(async (projectName) => {
      const todos = getTodos(projectName);
      if (todos.length === 0) {
        console.log(`No tasks were found for ${projectName}`);
      }

      // get the todos in an inquirer checkbox format
      const todoChoices = todos.map((todo) => ({
        name: styleTask(todo.task, todo.priority),
        value: todo.id,
        checked: todo.isDone,
        priority: todo.priority,
      }));

      const { completedTasks } = await inquirer.prompt([
        {
          type: "checkbox",
          name: "completedTasks",
          message: `Todos for project "${projectName}" - Check to mark as done:`,
          choices: todoChoices,
        },
      ]);
      markTodosAsDone(completedTasks);
      console.log("Updated Completed Tasks.");
    });

  dng
    .command("open")
    .description("List all projects and open the selected one in Vs Code")
    .argument("[projectName]", "name of project to open")
    .option("-s, --spotify", "Open Spotify alongside project")
    .option("-p, --postman", "Open Postman alongside project")
    .action(async (projectName, options) => {
      try {
        if (options.spotify) openSpotify();
        if (options.postman) openPostman();
        projectName ? openProjectFromName(projectName) : await openProjects();
      } catch (error) {
        if (
          error.name === "ExitPromptError" ||
          error.message.includes("force closed")
        ) {
          console.log("Prompt canceled by the user. Exiting...");
        } else {
          console.error("An error occurred:", error);
        }
      }
    });

  process.on("SIGINT", () => {
    console.log("\nOperation canceled. Exiting...");
    process.exit(0);
  });

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

main();
