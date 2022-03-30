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
const {
  validateSession,
  protectedAdmin
} = require("../middlewares/auth.middleware");
const {
  userExits,
  protectAccountOwner
} = require("../middlewares/users.middleware");

const router = express.Router();

router.post("/", createNewUser);

router.post("/login", loginUser);

router.use(validateSession);

router.get("/", protectedAdmin, getAllUsers);

router
  .use("/:id", userExits)
  .route("/:id")
  .get(getUserById)
  .patch(protectAccountOwner, updateUser)
  .delete(protectAccountOwner, deleteUser);

module.exports = {
  usersRouter: router
};
