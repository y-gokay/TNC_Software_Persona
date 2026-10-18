const express = require("express");
const userController = require("../controllers/userController");
const { validateCreateUser, validateUpdateUser } = require("../middleware/validateUser");

const router = express.Router();

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post("/", validateCreateUser, userController.createUser);
router.put("/:id", validateUpdateUser, userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
