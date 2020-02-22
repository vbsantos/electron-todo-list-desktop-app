const { ipcMain } = require("electron");

const todoController = require("../controllers/TodoController.js");
const Todo = new todoController();

const databaseController = require("../controllers/DatabaseController");
const Database = new databaseController();

ipcMain.handle("todo", async (event, arg) => {
  const { method, content } = arg;
  let status;

  try {
    switch (method) {
      case "create":
        console.log("entrada:", arg);
        status = await Todo.create(content);
        console.log("saida:", status);
        break;
      case "index":
        console.log("entrada:", arg);
        status = await Todo.index();
        console.log("saida:", status);
        break;
      case "show":
        console.log("entrada:", arg);
        status = await Todo.show(content.id);
        console.log("saida:", status);
        break;
      case "update":
        console.log("entrada:", arg);
        status = await Todo.update(content.id, content);
        console.log("saida:", status);
        break;
      case "destroy":
        console.log("entrada:", arg);
        status = await Todo.destroy(content.id);
        console.log("saida:", status);
        break;
      case "migrations":
        console.log("entrada:", arg);
        status = await Database.runMigrations();
        console.log("saida:", status);
        break;
      default:
        console.log({ error: "Method do not exists." });
    }
    return status;
  } catch (error) {
    return { error };
  }
});
