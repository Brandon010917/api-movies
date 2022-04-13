const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const { validationResult } = require("express-validator");

// Models
const { Actor } = require("../models/actor.model");
const { Movie } = require("../models/movie.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");
const { storage } = require("../utils/firebase");

exports.getAllActors = catchAsync(async (req, res, next) => {
  const actors = await Actor.findAll({
    where: { status: "active" },
    include: [
      {
        model: Movie
      }
    ]
  });

  const actorsPromises = actors.map(
    async ({
      id,
      name,
      country,
      rating,
      age,
      profilePic,
      movies,
      createdAt,
      updatedAt
    }) => {
      const imageRef = ref(storage, profilePic);
      const imgDownloadUrl = await getDownloadURL(imageRef);

      return {
        id,
        name,
        country,
        rating,
        age,
        profilePic: imgDownloadUrl,
        movies,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedActors = await Promise.all(actorsPromises);

  res.status(200).json({
    status: "success",
    data: { actors: resolvedActors }
  });
});

exports.createNewActor = catchAsync(async (req, res, next) => {
  const { name, country, rating, age } = req.body;

  // Upload image firebase
  const imageRef = ref(
    storage,
    `images/actors/${Date.now()}-${req.file.originalname}`
  );

  const imgUploaded = await uploadBytes(imageRef, req.file.buffer);

  const newActor = await Actor.create({
    name,
    country,
    rating,
    age,
    profilePic: imgUploaded.metadata.fullPath
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
