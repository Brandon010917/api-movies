const express = require("express");

// Controllers
const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser
} = require("../controllers/users.controller");

// Middlewares
const { validateSession } = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/", validateSession, getAllUsers);

router.post("/", createNewUser);

router.get("/:id", validateSession, getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", loginUser);

module.exports = {
  usersRouter: router
};
