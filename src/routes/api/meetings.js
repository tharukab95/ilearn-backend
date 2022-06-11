const express = require("express");
const router = express.Router();
const meetingsController = require("../../controllers/meetingsController");

router
  .route("/")
  .get(meetingsController.getAllMeetings)
  .post(meetingsController.createMeeting)
  .put(meetingsController.updateMeeting)
  .delete(meetingsController.deleteMeeting);

router.route("/createMeetingToken").post(meetingsController.createMeetingToken);

router.route("/:id").get(meetingsController.getMeeting);

module.exports = router;
