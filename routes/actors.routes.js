const express = require("express");
const { body } = require("express-validator");

// Controllers
const {
  getAllActors,
  createNewActor,
  getActorById,
  updateActor,
  deleteActor
} = require("../controllers/actors.controller");

// Middlewares
const {
  protectedAdmin,
  validateSession
} = require("../middlewares/auth.middleware");
const { actorExits } = require("../middlewares/actors.middleware");
const {
  createActorValidators,
  validateResult
} = require("../middlewares/validators.middleware");

// Utils
const { upload } = require("../utils/multer");

const router = express.Router();

router.use(validateSession);

router
  .route("/")
  .get(getAllActors)
  .post(
    protectedAdmin,
    upload.single("profilePic"),
    createActorValidators,
    validateResult,
    createNewActor
  );

router
  .use("/:id", actorExits)
  .route("/:id")
  .get(getActorById)
  .patch(updateActor)
  .delete(deleteActor);

module.exports = {
  actorsRouter: router
};
