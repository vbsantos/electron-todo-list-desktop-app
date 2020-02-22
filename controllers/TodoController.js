"use strict";

const { Todo } = require("../models");

class TodoController {
  create = async data => {
    const todo = await Todo.create(data);
    const { id, title, completed } = todo.get();
    return { id, title, completed };
  };

  index = async () => {
    const todos = await Todo.findAll();
    let todosRefactored = [];
    todos.forEach(element => {
      let { id, title, completed } = element.get();
      todosRefactored.push({ id, title, completed });
    });
    return todosRefactored;
  };

  show = async id => {
    const todo = await Todo.findByPk(id);
    let { title, completed } = todo.get();
    return { id, title, completed };
  };

  update = async (id, data) => {
    const todo = await Todo.update(
      { id, title: data.title, completed: data.completed },
      {
        where: {
          id
        }
      }
    );
    return todo;
  };

  destroy = async id => {
    const todo = await Todo.destroy({
      where: {
        id
      }
    });
    return todo;
  };
}

module.exports = TodoController;
