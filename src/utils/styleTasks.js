import chalk from "chalk";

export function styleTask(task, priority) {
  switch (priority) {
    case "Low":
      return chalk.green(task);
    case "Medium":
      return chalk.yellow(task);
    case "High":
      return chalk.red(task);
    default:
      return task;
  }
}
