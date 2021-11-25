const express = require('express');
const router = express.Router();

const categoryController = require('../controller/category-controller');


router.get('/', categoryController.list);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.add);
router.put('/:id', categoryController.update);
router.delete('/:id', categoryController.delete);

module.exports = router