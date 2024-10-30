import inquirer from "inquirer";
import { spawn } from "child_process";

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
