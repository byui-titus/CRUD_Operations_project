const express = require('express');
const router = express.Router();

const ProductCotroller = require('../controllers/products');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', ProductCotroller.getAll);

router.get('/:id', ProductCotroller.getSingle);

router.post('/', isAuthenticated, ProductCotroller.createProduct);

router.put('/:id', isAuthenticated, ProductCotroller.updateProduct);

router.delete('/:id', isAuthenticated,  ProductCotroller.deleteProduct);

module.exports = router;