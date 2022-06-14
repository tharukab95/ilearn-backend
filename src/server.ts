import "dotenv/config";
import cors from "cors";
import express from "express";
import path = require("path");
import cookieParser = require("cookie-parser");
import errorHandler from "./middleware/errorHandler";
import verifyJWT = require("./middleware/verifyJWT");
import config from "config";
import { connectMongodb } from "./utils/connectMongodb";
import credentials from "./middleware/credentials";
import logger from "./utils/logger";

// import rootRouter from "./routes/root";
import usersRouter from "./routes/api/users";
import corsOptions from "./utils/corsOptions";
import apiLogger from "./middleware/apiLogger";

// import authRouter = require("./routes/auth");
// import registerRouter = require("./routes/api/register");
// import refreshRouter = require("./routes/refresh");
// import meetingsRouter = require("./routes/api/meetings");
// import classesRouter = require("./routes/api/classes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// app.use(logger("dev"));

//log api requests
app.use(apiLogger);

app.use(credentials);
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// app.use("/", rootRouter);
// app.use("/api/auth", authRouter);
// app.use("/api/register", registerRouter);
// app.use("/api/refresh", refreshRouter);
// app.use("/api/meetings", meetingsRouter);
// app.use(verifyJWT);
app.use("/api/users", usersRouter);

// app.use("/api/classes", classesRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(config.server.port, () => {
  logger.info(`Server running on port ${config.server.port}`);

  connectMongodb();
});

// connection.once("open", () => {
//   console.log("Connected to MongoDB");
//   app.listen(config.server.port, () =>
//     console.log(`Server running on port ${config.server.port}`)
//   );
// });

exports = app;
