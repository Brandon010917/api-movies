// Models
const { Actor } = require("../models/actor.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/appError");
const { filterObj } = require("../utils/filterObj");

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: "active" }
  });

  res.status(200).json({
    status: "success",
    data: { actors }
  });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age, profilePic } = req.body;

  if (!name || !country || !rating || !age || !profilePic) {
    return next(
      new AppError(
        404,
        "Must provide a name, country, rating, age and profilePic for this request"
      )
    );
  }

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic
  });

  res.status(201).json({
    status: "success",
    data: {
      newActor
    }
  });
});

exports.getActorById = catchAsync(async (req, res, next) => {
  const { actor } = req;

  res.status(200).json({
    status: "success",
    data: { actor }
  });
});

exports.updateActor = catchAsync(async (req, res, next) => {
  const { actor } = req;
  const data = filterObj(req.body, "name", "country", "age");

  await actor.update({ ...data });

  res.status(204).json({
    status: "success"
  });
});

exports.deleteActor = catchAsync(async (req, res, next) => {
  const { actor } = req;

  await actor.update({ status: "deleted" });

  res.status(201).json({ status: "success" });
});
