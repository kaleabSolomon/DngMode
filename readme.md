# DngMode 🚀

**DngMode** is a CLI tool that streamlines your development workflow by automating project setup tasks and providing quick access to frequently used tools. Built with Node.js and NestJS, **DngMode** simplifies repetitive actions for developers by opening projects in VS Code, setting up project-specific to-do lists, opening Spotify, and more. With DngMode, you can jump right into coding without hassle.

## Features ✨

- **Project Quick Access**: Choose and open projects directly in VS Code.
- **Task Management**: Maintain a to-do list for each project, with customizable task priorities.
- **Automated Launch**: Open additional tools, such as Spotify and Postman, when initializing your projects.
- **Simple Commands**: Use intuitive commands to interact with your project directories, add tasks, and manage projects efficiently.
- **Configurable Setup**: Customize your project directory and tool preferences using a config file.

## Getting Started 🚀

### Prerequisites

- **Node.js** (v20+ recommended)
- **Global Installation**: After downloading, install globally using `npm` to use the `dng` command directly.

```
npm install -g dngmode
```

## Installation

1. **Clone the repository** (if building locally).
2. Run the following command to install dependencies:

```
npm install
```

3. **Link the CLI locally** (if testing without publishing):

```
npm link
```

## Configuration

Create a `dng.config.json` file in your home directory to customize project paths and preferences.

```
{
  "mainDir": "/path/to/your/projects/directory",
}
```

## Usage 🛠️

Once installed, run commands using the `dng` keyword.

### Commands

- `dng register`: Register directory with projects.
- `dng open`: List and select a project to open in VS Code.
- `dng add-todo <projectName>`: Add a new to-do item to a specific project, with options to set task priorities.
- `dng list-todos <projectName>`: View all to-do items for a project.

### Example Usage

```bash
# Open a project in VS Code
dng open

# Add a to-do item to a project
dng add-todo "MyProject"

# View all to-do items for a specific project
dng list-todos "MyProject"
```

## Future Features 🌟

- **GitHub Integration**: Clone projects directly from GitHub and manage remote repositories from within DngMode.
- **Additional Configurations**: Customize more tool integrations and user preferences.
- **Enhanced Task Management**: Set deadlines, reminders, and enhanced prioritization for project tasks.

## Contributing 🤝

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch.
3. Submit a pull request.

## License 📜

This project is licensed under the MIT License.
