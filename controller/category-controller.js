const cache = require("./cache-controller");
const CACHE_KEY = "poke_category";

const Poke_category = require("../models").Poke_category;

module.exports = {
  list(req, res) {
    return Poke_category.findAll({
      order: [["id", "ASC"]],
      attributes: ["id", "name"],
    })
      .then((poke_category) => {
        res.status(200).send(poke_category);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getById(req, res) {
    return cache
      .get(`${CACHE_KEY}_${req.params.id}`, () =>
        Poke_category.findByPk(req.params.id)
      )
      .then((poke_category) => {
        if (!poke_category) {
          return res.status(404).send({
            message: "Category Not Found",
          });
        }
        return res.status(200).send(poke_category);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  add(req, res) {
    return Poke_category.create({
      name: req.body.name,
    })
      .then((poke_category) => res.status(201).send(poke_category))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Poke_category.findByPk(req.params.id)
      .then((poke_category) => {
        if (!poke_category) {
          return res.status(404).send({
            message: "Category Not Found",
          });
        }
        return poke_category
          .update({
            name: req.body.name || type.name,
          })
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() =>
            res.status(200).send({
              message: "Update success",
              poke_category: poke_category,
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Poke_category.findByPk(req.params.id)
      .then((poke_category) => {
        if (!poke_category) {
          return res.status(400).send({
            message: "Category Not Found",
          });
        }
        return poke_category
          .destroy()
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() =>
            res.status(204).send({
              message: "Delete success",
            })
          )
          .catch((error) => {
            res.status(400).send(error);
          });
      })
      .catch((error) => res.status(400).send(error));
  },
};
