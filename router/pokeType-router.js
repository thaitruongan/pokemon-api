const express = require('express');
const router = express.Router();

const pokeTypeController = require('../controller/pokeType-controller');


router.get('/', pokeTypeController.list);
router.get('/:id', pokeTypeController.getById);
router.post('/', pokeTypeController.add);
router.put('/:id', pokeTypeController.update);
router.delete('/:id', pokeTypeController.delete);

module.exports = router