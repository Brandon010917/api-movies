const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");

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

// Limit the times the users request to our server
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 60,
    max: 1000,
    message: "Too many requests from your IP, try after 1 hour"
  })
);

// Set more security headers
app.use(helmet());

// Compress response on the browser
app.use(compression());

// Log incoming requests in the server
app.use(morgan("dev"));

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
