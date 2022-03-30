const { ref, uploadBytes } = require("firebase/storage");

// Models
const { Movie } = require("../models/movie.model");
const { AppError } = require("../utils/appError");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");
const { storage } = require("../utils/firebase");

exports.getAllMovies = catchAsync(async (req, res, next) => {
  const movies = await Movie.findAll({
    where: {
      status: "active"
    }
  });

  res.status(200).json({
    status: "success",
    data: { movies }
  });
});

exports.createNewMovie = catchAsync(async (req, res, next) => {
  const { title, description, duration, rating, genre } = req.body;

  if (!title || !description || !duration || !rating || !genre) {
    return next(
      new AppError(
        404,
        "Must provide a title, description, duration, rating, img and genre for this request"
      )
    );
  }

  const imageRef = ref(
    storage,
    `images/${Date.now()}-${req.file.originalname}`
  );

  const result = await uploadBytes(imageRef, req.file.buffer);

  console.log(result.metadata.fullPath);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    imgUrl: result.metadata.fullPath,
    genre
  });

  res.status(201).json({
    status: "success",
    data: { newMovie }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: "active" } });

  if (!movie) return next(new AppError(404, "Actor not found"));

  res.status(200).json({
    status: "success",
    data: { movie }
  });
});

exports.updateMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(req.body, "title", "description", "duration", "genre");

  const movie = await Movie.findOne({ where: { id, status: "active" } });

  if (!movie) return next(new AppError(404, "Movie not found"));

  await movie.update({ ...data });

  res.status(204).json({
    status: "success"
  });
});

exports.deleteMovie = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({ where: { id, status: "active" } });

  if (!movie) return next(new AppError(404, "Actor not found"));

  await movie.update({ status: "deleted" });

  res.status(200).json({
    status: "success"
  });
});
