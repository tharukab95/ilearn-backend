import { Router } from "express";
import config from "config";
const router = Router();
import usersController from "../../controllers/users.controller";
import verifyRoles from "../../middleware/verifyRoles";
import schemaValidator from "../../middleware/schemaValidator";
import userSchemas from "../../schemas/user.schema";

router
  .route("/")
  .get(usersController.getUsers)
  .post(schemaValidator(userSchemas.user.create), usersController.createUser)
  .put(usersController.updateUser)
  .delete(
    verifyRoles(config.get("userRoles").Admin),
    usersController.deleteUser
  );

// router.route("/orders").get(getOrders);
router
  .route("/payments/create-payment-intent")
  .post(usersController.createPaymentIntent);

router.route("/:uid").get(usersController.getUser);

export = router;
