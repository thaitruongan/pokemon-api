const cache = require("./cache-controller");
const CACHE_KEY = "pokemon";

const Pokemon = require("../models").Pokemon;

module.exports = {
  list(req, res) {
    return Pokemon.findAll({
      order: [["id", "ASC"]],
      attributes: [
        "id",
        "name",
        "maxcp",
        "attack",
        "def",
        "stamina",
        "description",
        "generation",
        "category_id",
        "height",
        "weight",
        "img",
      ],
    })
      .then((pokemon) => {
        res.status(200).send(pokemon);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  },
  getById(req, res) {
    return cache
      .get(`${CACHE_KEY}_${req.params.id}`, () =>
        Pokemon.findByPk(req.params.id)
      )
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).send({
            message: "Pokemon Not Found",
          });
        }
        return res.status(200).send(pokemon);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error);
      });
  },
  add(req, res) {
    return Pokemon.create({
      name: req.body.name,
      maxcp: req.body.maxcp,
      attack: req.body.attack,
      def: req.body.def,
      stamina: req.body.stamina,
      description: req.body.description,
      generation: req.body.generation,
      category_id: req.body.category_id,
      height: req.body.height,
      weight: req.body.height,
      img: req.body.img,
    })
      .then((pokemon) => res.status(201).send(pokemon))
      .catch((error) => res.status(400).send(error));
  },
  update(req, res) {
    return Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(404).send({
            message: "Pokemon Not Found",
          });
        }
        return pokemon
          .update({
            name: req.body.name || pokemon.name,
            maxcp: req.body.maxcp || pokemon.maxcp,
            attack: req.body.attack || pokemon.attack,
            def: req.body.def || pokemon.def,
            stamina: req.body.stamina || pokemon.stamina,
            description: req.body.description || pokemon.description,
            generation: req.body.generation || pokemon.generation,
            category_id: req.body.category_id || pokemon.category_id,
            height: req.body.height || pokemon.height,
            weight: req.body.height || pokemon.height,
            img: req.body.img || pokemon.img,
          })
          .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
          .then(() =>
            res.status(200).send({
              message: "Update success",
              pokemon: pokemon,
            })
          )
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  delete(req, res) {
    return Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (!pokemon) {
          return res.status(400).send({
            message: "Pokemon Not Found",
          });
        }
        return pokemon
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
