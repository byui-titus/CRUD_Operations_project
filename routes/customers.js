const express = require('express');
const router = express.Router();

const CustomerCotroller = require('../controllers/customers');
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', CustomerCotroller.getAll);

router.get('/:id', CustomerCotroller.getSingle);

router.post('/', isAuthenticated, CustomerCotroller.createCustomer);

router.put('/:id', isAuthenticated, CustomerCotroller.updateCustomer);

router.delete('/:id', isAuthenticated, CustomerCotroller.deleteCustomer);

module.exports = router;