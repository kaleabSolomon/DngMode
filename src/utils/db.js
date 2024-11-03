import Database from "better-sqlite3";

const db = new Database("projects-todo.db");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    projectName TEXT NOT NULL,
    task TEXT NOT NULL,
    isDone BOOLEAN DEFAULT 0
    )
    `
).run();

export async function initializeProjectTodos(projectList) {
  const projectNames = projectList.map((project) => project.name);

  projectNames.forEach((projectName) => {
    const projectExists = db
      .prepare(`SELECT 1 FROM todos WHERE projectName = ?`)
      .get(projectName);

    if (!projectExists) {
      // If not, add an initial entry for the project
      db.prepare(`INSERT INTO todos (projectName, task) VALUES (?, ?)`).run(
        projectName,
        "Initial setup task"
      );
      console.log(`Initialized to-do list for project: ${projectName}`);
    }
  });
}

export function addTodo(projectName, task) {
  const stmt = db.prepare(
    `INSERT INTO todos (projectName, task) VALUES (?, ?)`
  );
  stmt.run(projectName, task);
}
// Retrieve all to-dos for a specific project
export function getTodos(projectName) {
  const stmt = db.prepare(`SELECT * FROM todos WHERE projectName = ?`);
  return stmt.all(projectName);
}
