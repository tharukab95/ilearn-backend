const express = require("express");
const router = express.Router();
const classesController = require("../../controllers/classesControllers");

router
  .route("/")
  .get(classesController.getAllClasss)
  .post(classesController.createClass)
  .put(classesController.updateClass)
  .delete(classesController.deleteClass);

router.route("/:id").get(classesController.getClass);

module.exports = router;
