const express = require("express");
const projectController = require("../controllers/projectController");
const { validateCreateProject, validateUpdateProject } = require("../middleware/validateProject");

const router = express.Router();

router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.post("/", validateCreateProject, projectController.createProject);
router.put("/:id", validateUpdateProject, projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
