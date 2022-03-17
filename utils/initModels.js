// Models
const { User } = require("../models/user.model");
const { Movie } = require("../models/movie.model");
const { Actor } = require("../models/actor.model");
const { Review } = require("../models/review.model");
const { ActorInMovie } = require("../models/actorInMovie.model");

const initModels = () => {
  // 4. Establish relations between models
  User.hasMany(Review);
  Review.belongsTo(User);

  Movie.hasMany(Review);
  Review.belongsTo(Movie);

  Movie.belongsToMany(Actor, { through: ActorInMovie });
  Actor.belongsToMany(Movie, { through: ActorInMovie });
};

module.exports = { initModels };
