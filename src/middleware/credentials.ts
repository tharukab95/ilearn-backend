import config from "../config";

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (config.cors.allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

export default
 credentials;
