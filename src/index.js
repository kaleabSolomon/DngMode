import { findSourceDirectories } from "./utils/listDir.js";
import displayBanner from "./welcome.js";

displayBanner();
let list = [];
list = await findSourceDirectories("/home/kaleab/Documents/Dev/");

console.log(list);
