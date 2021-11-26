const express = require('express');
const router = express.Router();

const typeEffectController = require('../controller/typeEffect-controller');


router.get('/', typeEffectController.list);
router.get('/:id', typeEffectController.getById);
router.post('/', typeEffectController.add);
router.put('/:id', typeEffectController.update);
router.delete('/:id', typeEffectController.delete);

module.exports = router