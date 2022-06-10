const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");
const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(usersController.getUsers)
  // .post(usersController.createUser)
  .put(usersController.updateUser)
  .delete(verifyRoles(ROLES_LIST.Admin), usersController.deleteUser);

// router.route("/orders").get(usersController.getOrders);
router
  .route("/payments/create-payment-intent")
  .post(usersController.createPaymentIntent);

router.route("/:uid").get(usersController.getUser);

module.exports = router;
