const express = require("express");
const session = require("express-session");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
require("dotenv").config();
const fileUpload = require('express-fileupload')

const app = express();

const env = process.env.NODE_ENV || "development";
const config = require("./config/config.json")[env];

app.use(express.static(path.join(__dirname, "public")));
app.set("views", path.join(__dirname, "views"));

// app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true
}))

//Route
app.use("/api/users", require("./routes/users"));
app.use("/api/authorization", require("./routes/authorized"));
app.use("/api/permission", require("./routes/permission"));
app.use('/api/type', require('./router/type-router'));
app.use('/api/category', require('./router/category-router'));
app.use('/api/pokemon', require('./router/pokemon-router'));
app.use('/api/moves', require('./router/moves-router'));
app.use('/api/movesEffect', require('./router/movesEffect-router'));

app.use('/api/upload',require('./router/upload-router'));

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
  res.json(err);
});

if (!config.privateKey) {
  console.error("FATAL ERROR: privateKey is not defined.");
  process.exit(1);
}

module.exports = app;
