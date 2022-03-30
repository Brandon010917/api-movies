const express = require("express");

// Controllers
const {
  getAllActors,
  createNewActor,
  getActorById,
  updateActor,
  deleteActor
} = require("../controllers/actors.controller");

// Middlewares
const { actorExits } = require("../middlewares/actors.middleware");

const router = express.Router();

router.get("/", getAllActors);

router.post("/", createNewActor);

router
  .use("/:id", actorExits)
  .route("/:id")
  .get(getActorById)
  .patch(updateActor)
  .delete(deleteActor);

module.exports = {
  actorsRouter: router
};
