// Models
const { Actor } = require("../models/actor.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.actorExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const actor = await Actor.findOne({
    where: { id, status: "active" },
    attributes: {
      exclude: ["password"]
    }
  });

  if (!actor) return next(new AppError(404, "Actor not found"));

  req.actor = actor;

  next();
});
