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
    Authorized.findAll()
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

    Authorized.findAll({
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

        return caption
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

  getUserAuth(userId) {
    return cache.get(`${userId}-auth${cacheKey}`, () =>
      Authorized.findAll({
        where: {
          user_id: userId,
        },
      })
        .then((authorizations) => {
          if (!authorizations)
            return res.status(404).send({
              status: "fail",
              meesage: "This user have no permissions",
            });

          return res.status(200).send(authorizations);
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send({ status: "fail", message: error.meesage });
        })
    );
  },
};
