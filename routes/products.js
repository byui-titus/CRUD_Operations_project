const express = require('express');
const router = express.Router();

const ProductCotroller = require('../controllers/products');

router.get('/', ProductCotroller.getAll);

router.get('/:id', ProductCotroller.getSingle);

router.post('/', ProductCotroller.createProduct);

router.put('/:id', ProductCotroller.updateProduct);

router.delete('/:id', ProductCotroller.deleteProduct);

module.exports = router;