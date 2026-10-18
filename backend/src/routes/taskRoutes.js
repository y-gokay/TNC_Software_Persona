const express = require("express");
const taskController = require("../controllers/taskController");
const { validateCreateTask, validateUpdateTask } = require("../middleware/validateTask");

const router = express.Router();

router.get("/search", taskController.searchTasks);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.post("/", validateCreateTask, taskController.createTask);
router.put("/:id", validateUpdateTask, taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
