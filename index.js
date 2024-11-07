#!/usr/bin/env node

import displayBanner from "./src/welcome.js";
import { Command } from "commander";
import {
  checkProjectExists,
  getTaskFromInput,
  openPostman,
  openProjectFromName,
  openProjects,
  openSpotify,
  readConfig,
  writeConfig,
} from "./src/actions.js";
import {
  initializeProjectTodos,
  addTodo,
  getTodos,
  markTodosAsDone,
} from "./src/utils/db.js";
import { mapProjects } from "./src/utils/listDir.js";
import inquirer from "inquirer";
import { styleTask } from "./src/helpers/styleTasks.js";

import { getMainDir } from "./src/helpers/getMainDir.js";

const program = new Command();

program
  .description("CLI Tool for managing projects")
  .version("1.0.10")
  .action(displayBanner);

async function main() {
  program
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
  program
    .command("init-todos")
    .description("initialize a todo database for each project")
    .action(async () => {
      const mainDir = getMainDir();

      const projectList = await mapProjects(mainDir);
      initializeProjectTodos(projectList);
    });
  // Command to add a todo to a specific project
  program
    .command("add-todo")
    .description("Add a new todo task to a specific project")
    .argument("<projectName>", "Name of the project")
    .action(async (projectName) => {
      if (!checkProjectExists(projectName)) {
        console.error("Could not find Project ", projectName);
        return;
      }
      const taskData = await getTaskFromInput(projectName);

      if (!taskData) {
        return;
      }
      const { task, priority } = taskData;
      addTodo(projectName, task, priority);
      console.log(`Added task "${task}" to project "${projectName}"`);
    });

  program
    .command("list-todos")
    .description("List all todos for a specific project")
    .argument("<projectName>", "Name of the project")
    .action(async (projectName) => {
      if (!checkProjectExists(projectName)) {
        console.error("Could not find Project ", projectName);
        return;
      }
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

  program
    .command("open")
    .description("List all projects and open the selected one in Vs Code")
    .argument("[projectName]", "name of project to open")
    .option("-s, --spotify", "Open Spotify alongside project")
    .option("-p, --postman", "Open Postman alongside project")
    .action(async (projectName, options) => {
      if (options.spotify) openSpotify();
      if (options.postman) openPostman();
      projectName
        ? await openProjectFromName(projectName)
        : await openProjects();
    });

  program.parse(process.argv);
}
main();
