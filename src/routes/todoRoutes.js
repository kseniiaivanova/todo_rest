const express = require("express");
const router = express.Router();
const {
  getAllTodos,
  getTodoById,
  createNewTodo,
  updateTodoById,
  deleteTodoById,
} = require("../controllers/todoController");

// Routes
// GET /api/v1/projects - Get all projects
router.get("/", getAllTodos);

// GET /api/v1/projects/:projectId - Get project by id
router.get("/:todoId", getTodoById);

// POST /api/v1/projects - Create new project
router.post("/", createNewTodo);

// PUT /api/v1/projects/:projectId - Update project (by id)
router.put("/:todoId", updateTodoById);

// DELETE /api/v1/projects/:projectId - Delete project (by id)
router.delete("/:todoId", deleteTodoById);

module.exports = router;
