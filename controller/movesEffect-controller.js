const cache = require("./cache-controller");
const CACHE_KEY = "movesEffect";

const Moves_effect = require("../models").Moves_effect;

module.exports = {
  list(req, res) {
    return Moves_effect.findAll({
      order: [["id", "ASC"]],
      attributes: ["id", "moves_id", "type_id", "category", "dame"],
    })
      .then((movesEffect) => {
        res.status(200).send(movesEffect);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getById(req, res) {
    return cache
      .get(`${CACHE_KEY}_${req.params.id}`, () =>
        Moves_effect.findByPk(req.params.id)
      )
      .then((movesEffect) => {
        if (!movesEffect) {
          return res.status(404).send({
            message: "Moves effect Not Found",
          });
        }
        return res.status(200).send(movesEffect);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  add(req, res) {
    return Moves_effect.create({
      moves_id: req.body.moves_id,
      type_id: req.body.type_id,
      category: req.body.category,
      dame: req.body.dame,
    })
      .then((movesEffect) => res.status(201).send(movesEffect))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Moves_effect.findByPk(req.params.id)
      .then((movesEffect) => {
        if (!movesEffect) {
          return res.status(404).send({
            message: "Moves effect Not Found",
          });
        }
        return movesEffect
          .update({
            moves_id: req.body.moves_id || movesEffect.moves_id,
            type_id: req.body.type_id || movesEffect.type_id,
            category: req.body.category || movesEffect.category,
            dame: req.body.dame || movesEffect.dame,
          })
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() =>
            res.status(200).send({
              message: "Update success",
              movesEffect: movesEffect,
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Moves_effect.findByPk(req.params.id)
      .then((movesEffect) => {
        if (!movesEffect) {
          return res.status(400).send({
            message: "Moves effect Not Found",
          });
        }
        return movesEffect
          .destroy()
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
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
