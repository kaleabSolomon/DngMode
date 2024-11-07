import chalk from "chalk";

export function styleTask(task, priority) {
  switch (priority) {
    case "Low":
      return chalk.greenBright(task);
    case "Medium":
      return chalk.yellowBright(task);
    case "High":
      return chalk.redBright(task);
    default:
      return task;
  }
}
