const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo.controller");

// create todo
router.post("/", (req, res) => {
  const { title, description } = req.body;
  if (!title || title === "") {
    res.status(400).json({
      success: false,
      message: "Invalid input",
    });
    return;
  }

  const id = todoController.createTodo(title, description);

  res.status(201).json({
    success: true,
    message: "Todo created successfully",
    data: id,
  });
});

// get all todos
router.get("/", (req, res) => {
  const todos = todoController.getAllTodos();

  res.status(200).json({
    success: true,
    message: "Todos retrieved successfully",
    data: todos,
  });
});

// get todo by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todoController.getTodoById(id);

  if (todo) {
    res.status(200).json({
      success: true,
      message: "Todo retrieved successfully",
      data: todo,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Todo not found",
    });
  }
});

// update todo
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  if (!title || title === "") {
    res.status(400).json({
      success: false,
      message: "Invalid input",
    });
    return;
  }
  const todo = todoController.updateTodo(id, title, description);
  res.status(todo.status).json({
    success: todo.success,
    message: todo.message,
  });
});

// finish todo
router.post("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todoController.finishTodo(id);
  res.status(todo.status).json({
    success: todo.success,
    message: todo.message,
  });
});

// soft delete todo
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const todo = todoController.deleteTodo(id);
  res.status(todo.status).json({
    success: todo.success,
    message: todo.message,
  });
});

module.exports = router;
