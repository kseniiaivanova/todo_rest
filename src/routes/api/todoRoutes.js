const express = require("express");
const router = express.Router();
const {
  getTodos,
  createTodo,
  getTodoById,
  updateTodoById,
  deleteTodoById,
} = require("../../controllers/api/todoController");

// GET /api/v1/tickets - Get all tickets
router.get("/", getTodos);

// GET /api/v1/tickets/:id - Get single ticket by id
router.get("/:id", getTodoById);

// POST /api/v1/tickets - Create new ticket
router.post("/", createTodo);

// PUT /api/v1/tickets/:id - Update ticket (by id)
router.put("/:id", updateTodoById);

// DELETE /api/v1/tickets/:id - Delete single ticket (by id)
router.delete("/:id", deleteTodoById);

module.exports = router;
