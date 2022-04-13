const express = require("express");
const { body } = require("express-validator");

// Controllers
const {
  getAllMovies,
  createNewMovie,
  getMovieById,
  updateMovie,
  deleteMovie
} = require("../controllers/movies.controller");

// Middlewares
const {
  validateSession,
  protectedAdmin
} = require("../middlewares/auth.middleware");
const { movieExits } = require("../middlewares/movies.middleware");
const {
  createMovieValidators,
  validateResult
} = require("../middlewares/validators.middleware");

// Utils
const { upload } = require("../utils/multer");

const router = express.Router();

router.use(validateSession);

router
  .route("/")
  .get(getAllMovies)
  .post(
    protectedAdmin,
    upload.single("imgUrl"),
    createMovieValidators,
    validateResult,
    createNewMovie
  );

router
  .use("/:id", movieExits)
  .route("/:id")
  .get(getMovieById)
  .patch(updateMovie)
  .delete(deleteMovie);

module.exports = {
  moviesRouter: router
};
