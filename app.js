const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
require("dotenv").config();

const app = express();

const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//Route
app.get("/api", (req, res) => {
  res.send("hihi");
});

app.use("/api/users", require("./routes/users"));

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

if (!config.privateKey) {
  console.error("FATAL ERROR: privateKey is not defined.");
  process.exit(1);
}

module.exports = app;
