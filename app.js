// 1. Create an Express server
const express = require("express");

// Utils
const { sequelize } = require("./utils/database");

// Models
const { User } = require("./models/user.model");
const { Movie } = require("./models/movie.model");
const { Actor } = require("./models/actor.model");
const { Review } = require("./models/review.model");
const {
  ActorInMovie,
} = require("./models/actorInMovie.model");

// Init express app
const app = express();
const PORT = 4000;

// 2. Establish database connection (Sequelize and must install the corresponding drivers)
sequelize
  .authenticate()
  .then(() => console.log("Database Authenticated"))
  .catch((err) => console.log(err));

// 4. Establish relations between models
User.hasMany(Review);
Review.belongsTo(User);

Movie.hasMany(Review);
Review.belongsTo(Movie);

sequelize
  .sync()
  .then(() => console.log("Database Synced"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
