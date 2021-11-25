const cache = require("./cache-controller");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const __permission = config.permission;
const __table = config.table;

const cacheKey = config.cacheKey;

const Authorization = require("../models").Authorized;
const APIKEY = require("../models").APIKEY;
const Permission = require("../models").Permission;

module.exports = {
  getById(id) {
    return cache
      .get(`${id}${cacheKey}`, () =>
        Authorization.findByPk(id, {
          include: [
            {
              model: Permission,
              as: "permissions",
            },
          ],
        })
      )
      .then((authorization) => {
        if (!authorization)
          return res
            .status(404)
            .send({ message: "This APIKEY is not authorized" });

        return res.status(200).send(authorization);
      })
      .catch((err) => {
        console.error(err.message);
        res.status(400).send(error.message);
      });
  },

  create(req, res) {
    const { api_key_id, permission_id } = req.body;

    return Authorization.Create({
      apy_key_id: api_key_id,
      permission_id: permission_id,
    })
      .then((authorization) => {
        res.status(201).send(authorization);
      })
      .catch((error) => {
        console.error(error.message);

        res.status(401).send(error.message);
      });
  },

  delete(req, res) {
    const { id } = req.body;
    return Authorization.findByPk(id).then((authorization) => {
      if (!authorization)
        return res.status(400).send({ message: "Authorized not found" });
    });
  },

  Verify(id, permission) {
    return;
  },
};
