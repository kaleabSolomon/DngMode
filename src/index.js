import { mapProjects } from "./utils/listDir.js";
import displayBanner from "./welcome.js";
import { chooseProject, openProject } from "./commands.js";
async function main() {
  try {
    displayBanner();
    const projectList = await mapProjects("/home/kaleab/Documents/Dev/");

    const selectedProjectPath = await chooseProject(projectList);
    openProject(selectedProjectPath);
  } catch (error) {
    console.error("an error occured", error);
  }
}

main();
