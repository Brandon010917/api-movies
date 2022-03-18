// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "active" }
  });

  res.status(200).json({
    status: "success",
    data: { users }
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return next(
      new AppError(
        404,
        "Must provide a username, email and password for this request"
      )
    );
  }

  const newUser = await User.create({
    username,
    email,
    password,
    role
  });

  res.status(201).json({
    status: "success",
    data: {
      newUser
    }
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});
