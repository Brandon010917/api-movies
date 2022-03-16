const { DataTypes } = require("sequelize");
// Utils
const { sequelize } = require("../utils/database");

const ActorInMovie = sequelize.define("actorInMovie", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  actorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = { ActorInMovie };
