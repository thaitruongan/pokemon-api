const express = require('express');
const router = express.Router();

const movesEffectController = require('../controller/movesEffect-controller');


router.get('/', movesEffectController.list);
router.get('/:id', movesEffectController.getById);
router.post('/', movesEffectController.add);
router.put('/:id', movesEffectController.update);
router.delete('/:id', movesEffectController.delete);

module.exports = router