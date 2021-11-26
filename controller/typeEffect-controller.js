const cache = require("./cache-controller");
const CACHE_KEY = "type_effect";
const Type_effect = require("../models").Type_effect;

module.exports = {
  list(req, res) {
    return Type_effect.findAll({
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "poke_id",
        "type_id",
        "category",
        "dame"
      ],
    })
      .then((type_effect) => {
        res.status(200).send(type_effect);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getById(req, res) {
    return cache
      .get(`${CACHE_KEY}_${req.params.id}`, () => Type_effect.findByPk(req.params.id))
      .then((type_effect) => {
        if (!type_effect) {
          return res.status(404).send({
            message: "Type effect Not Found",
          });
        }
        return res.status(200).send(type_effect);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  add(req, res) {
    return Type_effect.create({
      poke_id: req.body.poke_id,
      type_id: req.body.type_id,
      category: req.body.category,
      dame: req.body.dame,
    })
      .then((type_effect) => res.status(201).send(type_effect))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Type_effect.findByPk(req.params.id)
      .then((type_effect) => {
        if (!type_effect) {
          return res.status(404).send({
            message: "Type effect Not Found",
          });
        }
        return type_effect
          .update({
            poke_id: req.body.poke_id || type_effect.poke_id,
            type_id: req.body.type_id || type_effect.type_id,
            category: req.body.category || type_effect.category,
            dame: req.body.dame || type_effect.dame,
          })
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() =>
            res.status(200).send({
              message: "Update success",
              type_effect: type_effect,
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Type_effect.findByPk(req.body.id)
      .then((type_effect) => {
        if (!type_effect) {
          return res.status(400).send({
            message: "Type effect Not Found",
          });
        }
        return type_effect
          .destroy()
          .then(() => cache.delete(`${CACHE_KEY}_${req.body.id}`))
          .then(() =>
            res.status(200).send({
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
