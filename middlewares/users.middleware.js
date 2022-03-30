// Models
const { User } = require("../models/user.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.userExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: { id, status: "active" },
    attributes: {
      exclude: ["password"]
    }
  });

  if (!user) return next(new AppError(404, "User not found"));

  req.user = user;

  next();
});

exports.protectAccountOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req;

  if (currentUser.id !== +id) {
    return next(
      new AppError(403, "You can't update or delete other users accounts")
    );
  }

  next();
});
