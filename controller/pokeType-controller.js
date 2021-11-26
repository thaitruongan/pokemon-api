const cache = require("./cache-controller");
const CACHE_KEY = "poke_type";
const Poke_type = require("../models").Poke_type;

module.exports = {
  list(req, res) {
    return Poke_type.findAll({
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "poke_id",
        "type_id"
      ],
    })
      .then((poke_type) => {
        res.status(200).send(poke_type);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getById(req, res) {
    return cache
      .get(`${CACHE_KEY}_${req.params.id}`, () => Poke_type.findByPk(req.params.id))
      .then((poke_type) => {
        if (!poke_type) {
          return res.status(404).send({
            message: "Poke type Not Found",
          });
        }
        return res.status(200).send(poke_type);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  add(req, res) {
    return Poke_type.create({
      poke_id: req.body.poke_id,
      type_id: req.body.type_id
    })
      .then((poke_type) => res.status(201).send(poke_type))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Poke_type.findByPk(req.params.id)
      .then((poke_type) => {
        if (!poke_type) {
          return res.status(404).send({
            message: "Poke type Not Found",
          });
        }
        return poke_type
          .update({
            poke_id: req.body.poke_id || poke_type.poke_id,
            type_id: req.body.type_id || poke_type.type_id
          })
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() =>
            res.status(200).send({
              message: "Update success",
              poke_type: poke_type,
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Poke_type.findByPk(req.body.id)
      .then((poke_type) => {
        if (!poke_type) {
          return res.status(400).send({
            message: "Poke type Not Found",
          });
        }
        return poke_type
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
