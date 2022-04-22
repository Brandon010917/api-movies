const { app } = require("./app");

// Utils
const { sequelize } = require("./utils/database");
const { initModels } = require("./utils/initModels");

// 2. Establish database connection (Sequelize and must install the corresponding drivers)
sequelize
  .authenticate()
  .then(() => console.log("Database Authenticated"))
  .catch((err) => console.log(err));

// Models relations
initModels();

sequelize
  .sync({ force: true })
  .then(() => console.log("Database Synced"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("App running on port: " + PORT);
});
