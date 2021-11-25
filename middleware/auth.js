const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const cache = require("../controller/cache-controller");

module.exports = async function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("Access denied!");
  try {
    req.user = jwt.verify(token, config.privateKey);
    const result = await cache.request(req.user.email + config.cacheKey);
    console.log(result.id + "" == req.user.id + "", result.id, req.user.id);
    if (result !== null) {
      if (result.id === req.user.id && token === result.token) {
        next();
      } else {
        res.status(400).send("session expired");
      }
    } else {
      res.status(400).send("session expired");
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};
