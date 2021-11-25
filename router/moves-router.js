const express = require('express');
const router = express.Router();

const movesController = require('../controller/moves-controller');


router.get('/', movesController.list);
router.get('/:id', movesController.getById);
router.post('/', movesController.add);
router.put('/:id', movesController.update);
router.delete('/:id', movesController.delete);

module.exports = router