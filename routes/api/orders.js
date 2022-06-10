const express = require("express");
const router = express.Router();
const ordersController = require("../../controllers/ordersController");
// const ROLES_LIST = require("../../config/roles_list");
// const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(ordersController.getOrders)
  .post(ordersController.createOrder)
  .put(ordersController.updateOrder)
  .delete(ordersController.deleteOrder);

router.route("/convert").get(ordersController.convert);

router.route("/:uid").get(ordersController.getOrder);

module.exports = router;
