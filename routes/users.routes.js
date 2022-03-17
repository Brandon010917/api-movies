const express = require("express");

// Controllers
const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const router = express.Router();

router.get("/", getAllUsers);

router.post("/", createNewUser);

router.get("/:id", getUserById);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = {
  usersRouter: router,
};
