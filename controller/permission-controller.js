const cache = require("./cache-controller");
const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const cacheKey = config.cacheKey;

const Permission = require("../models").Permission;

module.exports = {
  list(req, res) {
    return cache
      .get(`all-permission${cacheKey}`, () => Permission.findAll())
      .then((permissions) => {
        if (!permissions)
          return res
            .status(404)
            .send({ status: "fail", message: "Permission not found" });

        return res.status(200).send(permissions);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send(error.message);
      });
  },

  create(req, res) {
    const { _permission, _table } = req.body;
    console.log(_permission, _table);
    Permission.findOne({ where: { permission: _permission, table: _table } })
      .then((permission) => {
        console.log(permission);
        if (permission)
          return res.status(400).send({
            status: "fail",
            message: "Permission is currently exists",
          });

        Permission.create({
          permission: _permission,
          table: _table,
        })
          .then((permission) => res.status(201).send(permission))
          .catch((error) =>
            res.status(400).send({ status: "fail", message: error.message })
          );
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send({ status: "fail", message: error.message });
      });
  },

  delete(req, res) {
    const { id } = req.body;
    Permission.findByPk(id).then((permission) => {
      if (!permission)
        return res
          .status(400)
          .send({ status: "fail", message: "permission not found!" });

      permission
        .destroy()
        .then(() =>
          res.status(200).send({
            status: "succeed",
            message: "Permission was deleted successfully",
          })
        )
        .catch((error) =>
          res.status(400).send({ status: "fail", message: error.message })
        );
    });
  },
};
