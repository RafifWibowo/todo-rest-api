const { generateUuid, getCurrentTime } = require("../helpers/utils");
const Todo = require("../models/todo");

let todos = [];

const createTodo = (title, description) => {
  const id = generateUuid();
  const created_at = getCurrentTime();

  const newTodo = new Todo(
    id,
    title,
    description,
    null,
    created_at,
    null,
    null
  );

  todos.push(newTodo);
  return todos[todos.length - 1].id;
};

const getAllTodos = () => {
  return todos;
};

const getTodoById = (id) => {
  return todos.find((todo) => todo.id === id);
};

const updateTodo = (id, title, description) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return {
      status: 404,
      success: false,
      message: "Todo not found",
    };
  }

  const todoToUpdate = todos[index];
  if (todoToUpdate.finished_at || todoToUpdate.deleted_at) {
    return {
      status: 400,
      success: false,
      message: "Todo is already finished or deleted",
    };
  }

  todoToUpdate.title = title;
  if (typeof description !== "undefined") {
    todoToUpdate.description = description;
  }
  todoToUpdate.updated_at = getCurrentTime();

  return {
    status: 200,
    success: true,
    message: "Todo updated successfully",
  };
};

const finishTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return {
      status: 404,
      success: false,
      message: "Todo not found",
    };
  }

  const todoToFinished = todos[index];
  if (todoToFinished.finished_at || todoToFinished.deleted_at) {
    return {
      status: 400,
      success: false,
      message: "Todo is already finished or deleted",
    };
  }

  todoToFinished.finished_at = getCurrentTime();

  return {
    status: 200,
    success: true,
    message: "Todo finished successfully",
  };
};

const deleteTodo = (id) => {
  const index = todos.findIndex((todo) => todo.id === id);
  if (index === -1) {
    return {
      status: 404,
      success: false,
      message: "Todo not found",
    };
  }

  const todoToDeleted = todos[index];
  if (todoToDeleted.deleted_at) {
    return {
      status: 400,
      success: false,
      message: "Todo is already deleted",
    };
  }

  todoToDeleted.deleted_at = getCurrentTime();

  return {
    status: 200,
    success: true,
    message: "Todo deleted successfully",
  };
};

module.exports = {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  finishTodo,
  deleteTodo,
};
