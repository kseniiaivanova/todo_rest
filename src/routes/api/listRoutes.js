const express = require("express");
const router = express.Router();
const {
  getLists,
  createList,
  getListById,
  updateListById,
  deleteListById,
} = require("../../controllers/api/listController");

// GET /api/v1/projects - Get all projects
router.get("/", getLists);

// GET /api/v1/projects/:id - Get single project by id
router.get("/:id", getListById);

// POST /api/v1/projects - Create new project
router.post("/", createList);

// PUT /api/v1/projects/:id - Update project (by id)
router.put("/:id", updateListById);

// DELETE /api/v1/projects/:id - Delete single project (by id)
router.delete("/:id", deleteListById);

module.exports = router;
