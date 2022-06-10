const User = require("../model/User");
const jwt = require("jsonwebtoken");
const zoomConfig = require("../config/zoomConfig");
const rp = require("request-promise");
var generate = require("../utils/jitsiMeetAuth");
const fs = require("fs");
var uuid = require("uuid-random");

const payload = {
  iss: zoomConfig.APIKey,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, zoomConfig.APISecret);

const createMeetingToken = async (req, res) => {
  // const { email } = req.body;
  const appId = "vpaas-magic-cookie-965f4ec3424540f0ae7feebfe84831c4";

  // var privateKey = fs.readFileSync("jitsiauth.key", "utf-8").trim();

  // console.log(privateKey);

  // var token =
  //   "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTY1ZjRlYzM0MjQ1NDBmMGFlN2ZlZWJmZTg0ODMxYzQvNWQ2MWYzLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2NTE1MjA5ODIsImV4cCI6MTY1MTUyODE4MiwibmJmIjoxNjUxNTIwOTc3LCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTY1ZjRlYzM0MjQ1NDBmMGFlN2ZlZWJmZTg0ODMxYzQiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJ0aGFydWthYmFuZGFyYTk1IiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwODY3MjUwNTkxMzAzNjg2MzA5OSIsImF2YXRhciI6Imh0dHBzOi8vMzY1d2VicmVzb3VyY2VzLmNvbS93cC1jb250ZW50L3VwbG9hZHMvMjAxNi8wOS9GUkVFLVBST0ZJTEUtQVZBVEFSUy5wbmciLCJlbWFpbCI6InRoYXJ1a2FiYW5kYXJhOTVAZ21haWwuY29tIn19LCJyb29tIjoiKiJ9.n-ng3sU8-A68pA6uEGZlNE_yTGPD0uWuMf-og5IbJ8BtxG1c9UKWs5PSV0pZE97TGWtKgZwuiVxZReLZ_VT4Vq1CPKoBck0Z14siX_fiULd3IhLpXV5t3gzI5UM73vTmbPhMihvqSF7n-7PlqVzrCTk2XjApNRcV5dA2DQmC325fqgzxiOP1F5vkSfGANrLtPBjbYdOIL6aJlvAMTTW4mKbog_05WOPQSGNEkd1_c6HlSWKdExV0y3tU15VrIFz_Wy1chJNSNLM3ZaPWJEX3h_52j1-E3XhDQsEk9QeFaRBTX3aRvz7Seb6kx4zk_xq0rARdFWuKvwKGT0lf_4whWw";

  try {
    // const token = generate(privateKey, {
    //   id: uuid(),
    //   name: "tharukabandara95",
    //   email: email,
    //   avatar:
    //     "https://365webresources.com/wp-content/uploads/2016/09/FREE-PROFILE-AVATARS.png",
    //   appId,
    //   kid: "vpaas-magic-cookie-965f4ec3424540f0ae7feebfe84831c4/5d61f3-SAMPLE_APP",
    // });
    // console.log("token: ", token);

    const token =
      "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTY1ZjRlYzM0MjQ1NDBmMGFlN2ZlZWJmZTg0ODMxYzQvNWQ2MWYzLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE2NTE5MTIzMjgsImV4cCI6MTY1MTkxOTUyOCwibmJmIjoxNjUxOTEyMzIzLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTY1ZjRlYzM0MjQ1NDBmMGFlN2ZlZWJmZTg0ODMxYzQiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJtb2RlcmF0b3IiOnRydWUsIm5hbWUiOiJ0aGFydWthYmFuZGFyYTk1IiwiaWQiOiJnb29nbGUtb2F1dGgyfDEwODY3MjUwNTkxMzAzNjg2MzA5OSIsImF2YXRhciI6IiIsImVtYWlsIjoidGhhcnVrYWJhbmRhcmE5NUBnbWFpbC5jb20ifX0sInJvb20iOiIqIn0.pHJDYnbbYMN2-S8yBwrXy_YrRw42TvR9tGxlilpxuWgEv9ELJXly1ESQm0JFn4O5oK_Jgc7Eh_c3JgZjC8feF5dpKmn2HiF6hl92bHCHg3UJ1JTGX9_VP8anWKvjJzwmFGPliCH6L-OPZMM7gzjUjMn9O2Zkc494dbuIarwzcLx-opXzBrbAKjmxPqV6wRV_q8YkUpzFwo3Qou3OEgnl2jk3qSaNAxh7PIDnDbB7fUaX5ClJ6yQLZRbJXrGpEJAn1e4jKG1w362eJnV6t3GbQTfhPSWIoTlkEj9UEJ9N0I5uUDL7isbEgcdd1lppGCOH15NwzhvEMOzKuEnJh1ZHTg";

    res.status(200).json({
      appId,
      token,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const createMeeting = async (req, res) => {
  const { email } = req.body;
  console.log("crete meeting, user email: ", email);
  var options = {
    method: "POST",
    uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
    body: {
      topic: "Meeting",
      type: 1,
      settings: {
        host_video: "true",
        participant_video: "false",
      },
    },
    auth: {
      bearer: zoomConfig.JwtToken,
    },
    headers: {
      "User-Agent": "Zoom-api-Jwt-Request",
      "content-type": "application/json",
    },
    json: true, //Parse the JSON string in the response
  };

  rp(options)
    .then(function (response) {
      console.log("response is: ", response.join_url);
      // response.status(200).json(response);
      let dataRes = {
        join_url: response.join_url,
      };
      res.status(200).json(dataRes);

      res.send("create meeting result: " + JSON.stringify(response));
    })
    .catch(function (err) {
      // res
      console.log(err);
      //   .status(400)
      //   .json({ message: "meeting creation failed, reason ", err });
    });
};

const getAllMeetings = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const updateMeeting = async (req, res) => {
  const { userName, ...updateParameters } = req.body;
  console.log(userName);
  console.log(updateParameters);
  if (!userName) {
    return res.status(400).json({ message: "userName is required." });
  } else if (!updateParameters) {
    return res
      .status(400)
      .json({ message: "fields to be updated not present." });
  }
  try {
    const result = await User.findOneAndUpdate(
      { userName: userName },
      updateParameters
    );
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const deleteMeeting = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "User ID required." });
  }

  const user = await User.findOne({ _id: id }).exec();
  if (!user) {
    return res.status(204).json({ message: `No user matches ID ${id}.` });
  }
  const result = await user.deleteOne({ _id: id });
  res.json(result);
};

const getMeeting = async (req, res) => {
  const { uid } = req.params;
  console.log(uid);
  if (!uid) return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ firebaseUid: uid }, { __v: 0 });
  if (!user) {
    return res.status(204).json({ message: `User ID ${uid} not found` });
  }

  res.status(200).json(user);
};

module.exports = {
  createMeeting,
  getAllMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
  createMeetingToken,
};
