const jwt = require("jsonwebtoken");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const cache = require("../controller/cache-controller");
const AuthorizedController = require("../controller/authorization-controller");
const Auth = {
  async authentication(req, res, next) {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).send("Access denied!");
    try {
      req.user = jwt.verify(token, config.privateKey);
      const result = await cache.request(req.user.email + config.cacheKey);
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
      res.status(400).send("session expired");
    }
  },

  authorization(permissions) {
    return function (req, res, next) {
      const userId = req.user.id;
      AuthorizedController.getUserAuth(userId)
        .then((userAuth) => {
          console.log(userAuth);
          if (!userAuth)
            return res
              .status(400)
              .send("you not have permission to access this");
          for (let i = 0; i < permissions.length; i++) {
            let permission = permissions[i].permission;
            let table = permissions[i].table;

            let checker = userAuth.find(
              (_permission) =>
                _permission.permission === permission ||
                _permission.table === table
            );

            if (checker === undefined)
              return res
                .status(400)
                .send("you not have permission to access this");
          }

          return next();
        })
        .catch((error) => {
          return res.status(400).send(error);
        });
    };
  },
};
module.exports = Auth;
