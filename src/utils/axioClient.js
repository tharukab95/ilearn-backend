const axios = require("axios");
const jwt = require("jsonwebtoken");
const zoomConfig = require("../../config/zoomConfig");

const payload = {
  iss: zoomConfig.APIKey,
  exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, zoomConfig.APISecret);

const instance = axios.create({
  baseURL: "https://api.zoom.us/v2/",
});

instance.defaults.headers.post["Content-Type"] =
  "application/json;charset=UTF-8";
instance.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
instance.defaults.headers.post["User-Agent"] = "Zoom-api-Jwt-Request";
instance.defaults.headers.common["Authorization"] = zoomConfig.APIKey;

module.exports = instance;
