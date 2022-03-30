const express = require("express");

// Controllers
const {
  getAllMovies,
  createNewMovie,
  getMovieById,
  updateMovie,
  deleteMovie
} = require("../controllers/movies.controller");

// Utils
const { upload } = require("../utils/multer");

const router = express.Router();

router.get("/", getAllMovies);

router.post("/", upload.single("imgUrl"), createNewMovie);

router.get("/:id", getMovieById);

router.patch("/:id", updateMovie);

router.delete("/:id", deleteMovie);

module.exports = {
  moviesRouter: router
};
