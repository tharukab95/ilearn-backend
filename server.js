require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const credentials = require("./middleware/credentials");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/api/users");
var authRouter = require("./routes/auth");
var registerRouter = require("./routes/api/register");
var refreshRouter = require("./routes/refresh");
var meetingsRouter = require("./routes/api/meetings");
var classesRouter = require("./routes/api/classes");
var app = express();

const PORT = process.env.PORT || 3500;

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// Connect to MongoDB
connectDB();

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

app.use("/", require("./routes/root"));
app.use("/api/auth", authRouter);
app.use("/api/register", registerRouter);
app.use("/api/refresh", refreshRouter);
app.use("/api/meetings", meetingsRouter);
// app.use(verifyJWT);
app.use("/api/users", usersRouter);

app.use("/api/classes", classesRouter);

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

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

// module.exports = app;
