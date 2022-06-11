const express = require("express");
const router = express.Router();
const productController = require("../../controllers/productsController");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

router.route("/search").get(productController.searchProducts);

router.route("/:id").get(productController.getProduct);

module.exports = router;
