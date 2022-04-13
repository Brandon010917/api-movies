const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { promisify } = require("util");

// Models
const { User } = require("../models/user.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return next(new AppError(401, "Invalid session"));

  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({
    where: {
      id: decodedToken.id,
      status: "active"
    },
    attributes: {
      exclude: ["password"]
    }
  });

  if (!user) return next(new AppError(401, "Invalid session"));

  req.currentUser = user;

  next();
});

exports.protectedAdmin = catchAsync(async (req, res, next) => {
  if (req.currentUser.role !== "admin") {
    next(new AppError(403, "Access denied"));
  }

  next();
});
