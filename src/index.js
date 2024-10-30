import { mapProjects } from "./utils/listDir.js";
import displayBanner from "./welcome.js";

displayBanner();
const projectList = await mapProjects("/home/kaleab/Documents/Dev/");

console.log(projectList);
