import User from "../models/user.model";
import config from "config";
import axioClient from "../utils/axioClient";
import axios from "axios";
import jwt from "jsonwebtoken";

const createClass = async (req, res) => {
  const { name } = req.body;
  const { clientId, clientSecret }: { clientId: string; clientSecret: string } =
    config.get("zoom");
  console.log("creating class ", name);

  axios
    .post(
      "https://zoom.us/oauth/token?code=6n3j3SSAK8_hdWPTQTkROWfEPvDcHVuoQ&grant_type=authorization_code&redirect_uri=https://nxgep.com",
      {},
      {
        auth: {
          basic: Buffer.from(clientId + ":" + clientSecret).toString("base64"),
        },
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
        json: true,
      }
    )
    .then(function (responseToken) {
      // res.send("create class result: " + JSON.stringify(response));
      console.log("access_token: ", JSON.stringify(responseToken));
      axios
        .post(
          "https://api.zoom.us/v2/groups",
          {
            directory_privacy: 3,
            in_directory: true,
            name,
          },
          {
            auth: {
              bearer: responseToken.access_token,
            },
            headers: {
              "User-Agent": "Zoom-api-Jwt-Request",
              "content-type": "application/json",
            },
            json: true,
          }
        )
        .then(function (response) {
          res.send("create class result: " + JSON.stringify(response));
        })
        .catch(function (error) {
          // console.log(error);
          res
            .status(400)
            .send("class creation failed: " + JSON.stringify(error));
        });
    })
    .catch(function (error) {
      // console.log(error.response);
      res.status(400).send("class creation failed: " + JSON.stringify(error));
    });
};

const getAllClasss = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const updateClass = async (req, res) => {
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

const deleteClass = async (req, res) => {
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

const getClass = async (req, res) => {
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
  createClass,
  getAllClasss,
  getClass,
  updateClass,
  deleteClass,
};
