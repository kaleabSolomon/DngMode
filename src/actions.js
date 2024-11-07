import inquirer from "inquirer";
import { spawn } from "child_process";
import { mapProjects } from "./utils/listDir.js";
import path from "path";
import fs from "fs";
import { getMainDir } from "./helpers/getMainDir.js";

process.on("SIGINT", () => {
  console.log("\nOperation canceled. Exiting...");
  process.exit(0);
});

const configPath = path.join(
  process.env.HOME || process.env.USERPROFILE,
  "dng.config.json"
);

export async function getProjectList() {
  const mainDir = getMainDir();
  return await mapProjects(mainDir);
}

export async function checkProjectExists(projectName) {
  const projectList = await getProjectList();

  const selectedProject = projectList.find(
    (project) => project.name === projectName
  );
  return !!selectedProject;
}
export async function chooseProject(projectList) {
  const projectNames = projectList.map((project) => project.name);

  try {
    const { selectedProject } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedProject",
        message: "Select a project to open",
        choices: projectNames,
      },
    ]);

    if (!selectedProject) return null;

    const path = projectList.find(
      (project) => project.name === selectedProject
    ).path;

    return path;
  } catch (error) {
    if (error.name === "ExitPromptError") {
      console.error("Prompt has been forcefully closed.");
      return null; // Return null to signify no selection
    }
    // Re-throw error if it's not handled here
    throw error;
  }
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
    const projectList = await getProjectList();
    const selectedProjectPath = await chooseProject(projectList);
    if (!selectedProjectPath) return;
    openProject(selectedProjectPath);
  } catch (error) {
    console.error("an error occured", error);
  }
}

export async function openProjectFromName(projectName) {
  try {
    const projectList = await getProjectList();
    const selectedProject = projectList.find(
      (project) => project.name === projectName
    );
    if (selectedProject === undefined) {
      console.error("No project with given name found!");
      return;
    }
    openProject(selectedProject.path);
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
  try {
    const { task } = await inquirer.prompt([
      {
        type: "input",
        name: "task",
        message: `Enter a task for the project "${projectName}":`,
      },
    ]);

    if (!task) return null;

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

    if (!priority) return null;

    return { task, priority };
  } catch (error) {
    if (error.name === "ExitPromptError") {
      console.error("Prompt has been forcefully closed.");
      return null; // Return null to signify no selection
    }
    // Re-throw error if it's not handled here
    throw error;
  }
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
