const express = require('express');
const router = express.Router();

const pokemonController = require('../controller/pokemon-controller');


router.get('/', pokemonController.list);
router.get('/:id', pokemonController.getById);
router.post('/', pokemonController.add);
router.put('/:id', pokemonController.update);
router.delete('/:id', pokemonController.delete);

module.exports = router