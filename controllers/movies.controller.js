const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Models
const { Movie } = require("../models/movie.model");
const { Actor } = require("../models/actor.model");
const { ActorInMovie } = require("../models/actorInMovie.model");

// Utils
const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");
const { storage } = require("../utils/firebase");
const { Email } = require("../utils/email");
const { User } = require("../models/user.model");

exports.getAllMovies = catchAsync(async (req, res) => {
  const movies = await Movie.findAll({
    where: {
      status: "active"
    },
    include: [{ model: Actor }]
  });

  const postsPromises = movies.map(
    async ({
      title,
      description,
      duration,
      rating,
      genre,
      imgUrl,
      actors,
      createdAt,
      updatedAt
    }) => {
      const imageRef = ref(storage, imgUrl);
      const imgDownloadUrl = await getDownloadURL(imageRef);

      return {
        title,
        description,
        duration,
        rating,
        genre,
        imgUrl: imgDownloadUrl,
        actors,
        createdAt,
        updatedAt
      };
    }
  );

  const resolvedPosts = await Promise.all(postsPromises);

  res.status(200).json({
    status: "success",
    data: { movies: resolvedPosts }
  });
});

exports.createNewMovie = catchAsync(async (req, res) => {
  const { title, description, duration, rating, genre, actors } = req.body;

  const imageRef = ref(
    storage,
    `images/movies/${Date.now()}-${req.file.originalname}`
  );

  const imgUploaded = await uploadBytes(imageRef, req.file.buffer);

  const newMovie = await Movie.create({
    title,
    description,
    duration,
    rating,
    imgUrl: imgUploaded.metadata.fullPath,
    genre
  });

  const actorsInMoviesPromises = actors.map(async (actorId) => {
    return ActorInMovie.create({ actorId, movieId: newMovie.id });
  });

  await Promise.all(actorsInMoviesPromises);

  // Find all users with active status and get their email
  const users = await User.findAll({
    where: {
      status: "active"
    }
  });

  const emailsUsers = users.map((user) => user.email);

  const movieActors = await Actor.findAll({
    include: [
      {
        model: Movie,
        through: {
          where: {
            movieId: newMovie.id
          }
        }
      }
    ]
  });

  await new Email(emailsUsers).sendNewMovie(newMovie, movieActors);

  res.status(201).json({
    status: "success",
    data: { newMovie }
  });
});

exports.getMovieById = catchAsync(async (req, res, next) => {
  const { movie } = req;

  res.status(200).json({
    status: "success",
    data: { movie }
  });
});

exports.updateMovie = catchAsync(async (req, res) => {
  const { movie } = req;

  const data = filterObj(
    req.body,
    "title",
    "description",
    "duration",
    "rating",
    "genre"
  );

  await movie.update({ ...data });

  res.status(204).json({
    status: "success"
  });
});

exports.deleteMovie = catchAsync(async (req, res) => {
  const { movie } = req;

  await movie.update({ status: "deleted" });

  res.status(200).json({
    status: "success"
  });
});
