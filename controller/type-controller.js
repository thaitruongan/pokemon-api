const CacheController = require('./cache-controller');
const cache = new CacheController(3600);
const CACHE_KEY = 'type'

const Type = require('../models').Type;

module.exports = {
    list(req,res){
        return Type
        .findAll({
            order:[
                ['id','ASC']
            ],
            attributes:['id','name','logo']
        })
        .then((types)=>{
            res.status(200).send(types)
        })
        .catch((err)=>{
            res.status(400).send(err)
        })
    },
    getById(req, res) {
        return cache.get(`${CACHE_KEY}_${req.params.id}`, () => Type
          .findByPk(req.params.id))
          .then((type) => {
            if (!type) {
              return res.status(404).send({
                message: 'Type Not Found',
              });
            }
            return res.status(200).send(type);
          })
          .catch((error) => {
            console.log(error);
            res.status(400).send(error);
          });
      },
      add(req, res) {
        return Type
          .create({
            name: req.body.name,
            logo: req.body.logo
          })
          .then((type) => res.status(201).send(type))
          .catch((error) => res.status(400).send(error));
      },
      update(req, res) {
        return Type
          .findByPk(req.params.id)
          .then(type => {
            if (!type) {
              return res.status(404).send({
                message: 'Type Not Found',
              });
            }
            return type
              .update({
                name: req.body.name || type.name,
                logo: req.body.logo || type.url,
              })
              .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
              .then(() => res.status(200).send({
                message: 'Update success',
                type:type
              }))
              .catch((error) => res.status(400).send(error));
          })
          .catch((error) => res.status(400).send(error));
      },
    
      delete(req, res) {
        return Type
          .findByPk(req.params.id)
          .then(type => {
            if (!type) {
              return res.status(400).send({
                message: 'Type Not Found',
              });
            }
            return type
              .destroy()
              .then(() => cache.delete(`${CACHE_KEY}_${req.params.id}`))
              .then(() => res.status(204).send({
                message: 'Delete success'
              }))
              .catch((error) => {res.status(400).send(error)});
          })
          .catch((error) => res.status(400).send(error));
      },
}