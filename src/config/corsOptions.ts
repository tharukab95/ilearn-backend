import { CorsOptions } from "cors";
import config from ".";

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || config.cors.allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;
