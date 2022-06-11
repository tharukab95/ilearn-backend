import "dotenv/config";
import cors from "cors";
import express from "express";
import path = require("path");
import cookieParser = require("cookie-parser");
import logger = require("morgan");
import errorHandler from "./middleware/errorHandler";
import verifyJWT = require("./middleware/verifyJWT");
import { connection } from "mongoose";
import config from "./config";
import { connectDatabase } from "./config/dbConn";
import credentials from "./middleware/credentials";

// import rootRouter from "./routes/root";
import usersRouter from "./routes/api/users";
import corsOptions from "./config/corsOptions";

// import authRouter = require("./routes/auth");
// import registerRouter = require("./routes/api/register");
// import refreshRouter = require("./routes/refresh");
// import meetingsRouter = require("./routes/api/meetings");
// import classesRouter = require("./routes/api/classes");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Connect to MongoDB
connectDatabase();

app.use(logger("dev"));
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

connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(config.server.port, () =>
    console.log(`Server running on port ${config.server.port}`)
  );
});

exports = app;
