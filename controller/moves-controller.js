const CacheController = require('./cache-controller');
const cache = new CacheController(3600);
const CACHE_KEY = 'moves'

const Moves = require('../models').Moves;

module.exports = {
    list(req,res){
        return Moves
        .findAll({
            order:[
                ['id','ASC']
            ],
            attributes:['id','name','description','type_id','category','power','energy','weather']
        })
        .then((moves)=>{
            res.status(200).send(moves)
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
    },
    getById(req, res) {
        return cache.get(`${CACHE_KEY}_${req.params.id}`, () => Moves
          .findByPk(req.params.id))
          .then((moves) => {
            if (!moves) {
              return res.status(404).send({
                message: 'Moves Not Found',
              });
            }
            return res.status(200).send(moves);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },
      add(req, res) {
        return Moves
          .create({
            name: req.body.name,
            description: req.body.description,
            type_id:req.body.type_id,
            category:req.body.category,
            power:req.body.power,
            energy:req.body.energy,
            weather:req.body.weather
          })
          .then((moves) => res.status(201).send(moves))
          .catch((error) => res.status(400).send(error));
      },
      update(req, res) {
        return Moves
          .findByPk(req.params.id)
          .then(moves => {
            if (!moves) {
              return res.status(404).send({
                message: 'Moves Not Found',
              });
            }
            return moves
              .update({
                name: req.body.name || moves.name,
                description: req.body.description || moves.description,
                type_id:req.body.type_id || moves.type_id,
                category:req.body.category || moves.category,
                power:req.body.power || moves.power,
                energy:req.body.energy || moves.energy,
                weather:req.body.weather || moves.weather
              })
              .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
              .then(() => res.status(200).send({
                message: 'Update success',
                moves:moves
              }))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Moves
          .findByPk(req.params.id)
          .then(moves => {
            if (!moves) {
              return res.status(400).send({
                message: 'Moves Not Found',
              });
            }
            return moves
              .destroy()
              .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
              .then(() => res.status(200).send({
                message: 'Delete success'
              }))
              .catch((error) => {res.status(400).send(error)});
          })
          .catch((error) => res.status(400).send(error));
      },
}