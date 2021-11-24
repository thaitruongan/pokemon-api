const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const CacheController = require("../controller/cache-controller");
const cache = new CacheController(604800);

module.exports = async function (req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(401).send("Access denied!");

  try {
    req.user = jwt.verify(token, config.privateKey);

    //get cached or set cached
    const result = await cache.request(req.user.email + config.cacheKey);
    if (result !== null) {
      if (result.publicKey === req.user.publicKey) {
        next();
      } else {
        res.status(400).send("Invalid token!");
      }
    } else {
      res.status(400).send("Invalid token!");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
