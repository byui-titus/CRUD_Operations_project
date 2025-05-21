const express = require('express');
const router = express.Router();

const ProductCotroller = require('../controllers/products');

router.get('/', ProductCotroller.getAll);

router.get('/:id', ProductCotroller.getSingle);

// router.post('/', ProductCotroller.createContact);

// router.put('/:id', ProductCotroller.updateContact);

// router.delete('/:id', ProductCotroller.deleteContact);

module.exports = router;