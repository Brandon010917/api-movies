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

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createNewUser);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

router.post("/login", loginUser);

module.exports = {
  usersRouter: router
};
