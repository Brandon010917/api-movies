const express = require("express");

// Controllers
const {
  getAllActors,
  createNewActor,
  getActorById,
  updateActor,
  deleteActor,
} = require("../controllers/actors.controller");

const router = express.Router();

router.get("/", getAllActors);

router.post("/", createNewActor);

router.get("/:id", getActorById);

router.patch("/:id", updateActor);

router.delete("/:id", deleteActor);

module.exports = {
  actorsRouter: router,
};
