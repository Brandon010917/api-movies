const express = require("express");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Routes
const { usersRouter } = require("./routes/users.routes");
const { moviesRouter } = require("./routes/movies.routes");
const { actorsRouter } = require("./routes/actors.routes");

// Utils
const { AppError } = require("./utils/appError");

// Init express app
const app = express();

// Set Pug as template engine
app.set("view engine", "pug");

// Config express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Endpoints
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/movies", moviesRouter);
app.use("/api/v1/actors", actorsRouter);

app.use("*", (req, res, next) => {
  return next(
    new AppError(404, `${req.originalUrl} not found in this server.`)
  );
});

// Error Handler
app.use(globalErrorHandler);

module.exports = { app };
