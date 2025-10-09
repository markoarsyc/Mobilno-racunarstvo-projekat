const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// CREATE (register)
router.post("/", userController.createUser);

// READ (login)
router.post("/login", userController.login);

// DELETE
router.delete("/:id", userController.deleteUser);

module.exports = router;
