const cache = require("./cache-controller");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];
const __permission = config.permission;
const __table = config.table;

const cacheKey = config.cacheKey;

const Authorized = require("../models").Authorized;
const Permission = require("../models").Permission;
const User = require("../models").User;

module.exports = {
  list(req, res) {
    Authorized.findAll({
      include: [
        {
          model: User,
          as: "user",
        },
        {
          model: Permission,
          as: "permission",
        },
      ],
    })
      .then((authorized) => {
        if (!authorized)
          return res.status(404).send({ message: "Authorization not found" });

        return res.status(200).send(authorized);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send(error.message);
      });
  },

  create(req, res) {
    const { userId, permissionId } = req.body;

    Authorized.findOne({
      where: { user_id: userId, permission_id: permissionId },
    })
      .then((authorized) => {
        if (authorized)
          return res.status(400).send({
            status: "fail",
            message: "this user was owned this permission",
          });

        Authorized.create({
          user_id: userId,
          permission_id: permissionId,
        })
          .then((authorized) => {
            cache.delete(`${userId}-auth${cacheKey}`);
            res.status(201).send(authorized);
          })
          .catch((error) => {
            console.error(error);
            res.status(401).send({ status: "fail", message: error.message });
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send({ status: "fail", message: error.message });
      });
  },

  delete(req, res) {
    const { userId, permissionId } = req.body;

    Authorized.findOne({
      where: {
        user_id: userId,
        permission_id: permissionId,
      },
    })
      .then((authorized) => {
        if (!authorized)
          return res
            .status(400)
            .send({ status: "fail", message: "authorized not found!" });

        return authorized
          .destroy()
          .then(() => {
            cache.delete(`all-auth${cacheKey}`);
            cache.delete(`${userId}-auth${cacheKey}`);
          })
          .then(() =>
            res.status(204).send({
              status: "success",
              message: "authorized was removed successfully",
            })
          )
          .catch((error) =>
            res.status(400).send({ status: "fail", message: error.message })
          );
      })
      .catch((error) =>
        res.status(400).send({ status: "fail", message: error.message })
      );
  },

  async getUserAuth(req, res) {
    const { userId } = req.body;
    const cacheResult = await cache.request(`${userId}-auth${cacheKey}`);
    console.log(cacheResult);
    if (cacheResult === null) {
      Authorized.findAll({
        include: [
          {
            model: Permission,
            as: "permission",
          },
        ],
        where: {
          user_id: userId,
        },
      })
        .then((authorizations) => {
          if (!authorizations)
            return res.status(404).send({
              status: "fail",
              message: "This user have no permissions",
            });
          let permissions = [];
          authorizations.forEach((authorization) => {
            permissions.push({
              permission: authorization.permission.permission,
              table: authorization.permission.table,
            });
          });
          cache.set(`${userId}-auth${cacheKey}`, permissions);
          return res.status(200).send(permissions);
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send({ status: "fail", message: error.meesage });
        });
    } else res.status(200).send(cacheResult);
  },
};
