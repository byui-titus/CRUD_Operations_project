const express = require('express');
const router = express.Router();

const CustomerCotroller = require('../controllers/customers');

router.get('/', CustomerCotroller.getAll);

router.get('/:id', CustomerCotroller.getSingle);

// router.post('/', ProductCotroller.createContact);

// router.put('/:id', ProductCotroller.updateContact);

// router.delete('/:id', ProductCotroller.deleteContact);

module.exports = router;