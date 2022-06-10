const express = require("express");
const router = express.Router();
const categoryController = require("../../controllers/categoryController");

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory)
  .put(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

router.route("/:id").get(categoryController.getCategory);

module.exports = router;
