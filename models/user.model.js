const { DataTypes } = require("sequelize");
// Utils
const { sequelize } = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
    defaultValue: "active",
  },
});

module.exports = { User };