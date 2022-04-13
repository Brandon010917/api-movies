// Models
const { Movie } = require("../models/movie.model");

// Utils
const { AppError } = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.movieExits = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const movie = await Movie.findOne({
    where: { id, status: "active" }
  });

  if (!movie) return next(new AppError(404, "Movie not found"));

  req.movie = movie;

  next();
});
