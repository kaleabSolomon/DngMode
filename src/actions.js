import inquirer from "inquirer";
import { spawn } from "child_process";
import { mapProjects } from "./utils/listDir.js";
import path from "path";
import fs from "fs";

const configPath = path.join(process.cwd(), "dng.config.json");

export async function chooseProject(projectList) {
  const projectNames = projectList.map((project) => project.name);

  const { selectedProject } = await inquirer.prompt([
    {
      type: "list",
      name: "selectedProject",
      message: "select a project to open",
      choices: projectList,
    },
  ]);
  const path = projectList.find(
    (project) => project.name === selectedProject
  ).path;
  return path;
}

export function openProject(path) {
  const process = spawn("code", [path], { stdio: "inherit" });

  process.on("spawn", () => console.log("Opened Project successfully"));
  process.on("error", (err) => {
    console.error(`Failed to open ${path} in VS Code:`, err);
  });

  process.on("close", (code) => {
    if (code !== 0) {
      console.error(`VS Code exited with code ${code}`);
    }
  });
}
export async function openProjects() {
  try {
    const mainDir = readConfig().mainDirectory;
    if (!mainDir) {
      console.log(
        "No main directory registered. Please run the register command first."
      );
      return;
    }

    const projectList = await mapProjects(mainDir);
    const selectedProjectPath = await chooseProject(projectList);
    openProject(selectedProjectPath);
  } catch (error) {
    console.error("an error occured", error);
  }
}

export async function openProjectFromName(projectName) {
  try {
    const mainDir = readConfig().mainDirectory;
    if (!mainDir) {
      console.log(
        "No main directory registered. Please run the register command first."
      );
      return;
    }

    const projectList = await mapProjects(mainDir);
    const selectedProjectPath = projectList.find(
      (project) => project.name === projectName
    ).path;
    if (!selectedProjectPath) console.log("not found");
    openProject(selectedProjectPath);
  } catch (err) {
    console.error("an error occured", err);
  }
}
export function openSpotify() {
  const spotifyProcess = spawn("spotify", [], {
    stdio: ["inherit", "inherit", "ignore"],
  });
  spotifyProcess.on("error", (error) => {
    console.error("Error opening Spotify:", error.message);
  });
}
export function openPostman() {
  const spotifyProcess = spawn("postman", [], {
    stdio: ["inherit", "inherit", "ignore"],
  });
  spotifyProcess.on("error", (error) => {
    console.error("Error opening Postman:", error.message);
  });
}
export async function getTaskFromInput(projectName) {
  const { task } = await inquirer.prompt([
    {
      type: "input",
      name: "task",
      message: `Enter a task for the project "${projectName}":`,
    },
  ]);

  // Validate task input
  if (!task || task.trim() === "") {
    console.error("Task cannot be empty. Please enter a valid task.");
    return; // or throw an error, or exit, etc.
  }

  const { priority } = await inquirer.prompt([
    {
      type: "list",
      name: "priority",
      message: "Select Priority Level: ",
      choices: ["Low", "Medium", "High"],
      default: "Medium",
    },
  ]);

  return { task, priority };
}
// Function to read configuration
export function readConfig() {
  try {
    const configData = fs.readFileSync(configPath, "utf8");
    return JSON.parse(configData);
  } catch (error) {
    console.error("Error reading config file:", error);
    return { mainDirectory: "" };
  }
}
// Function to write configuration
export function writeConfig(mainDirectory) {
  fs.writeFileSync(configPath, JSON.stringify({ mainDirectory }, null, 2));
}
