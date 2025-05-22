const mongodb = require('../data/database');
 const ObjectId = require('mongodb').ObjectId;

  const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('customers').find();
    result.toArray().then((customers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers);
    });
    };

    
 const getSingle = async (req, res) => {
    const customerId = new ObjectId(req.params.id); 
    const result = await mongodb.getDatabase().db().collection('customers').find({_id: customerId});
    result.toArray().then((customers) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(customers[0]);
    });
 };

const createCustomer = async (req, res) => {
  const customer = {
    name: req.body.name,
    email: req.body.email
  };

  try {
    const response = await mongodb.getDatabase().db().collection('customers').insertOne(customer);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while creating customer.');
    }
  } catch (err) {
     res.status(500).json({ message: 'Failed to create customer', err });
  }
};

const updateCustomer = async (req, res) => {
  const customerId = new ObjectId(req.params.id);
 const customer = {
  name: req.body.name,
  email: req.body.email
 };

  try {
    const response = await mongodb.getDatabase().db().collection('customers').replaceOne({_id: customerId}, customer);
    if (response.modifiedCount >  0) {
        res.status(204).send();
  }
 }catch (err) {
  res.status(500).json({ message: 'Failed to update customer', err });
 }
};

const deleteCustomer = async (req, res) => {
  const customerId =  new ObjectId(req.params.id);

  try{
    const response = await mongodb.getDatabase().db().collection('customers').deleteOne({_id: customerId});
    if (response.deletedCount >  0) {
        res.status(204).send();
    }
  }catch (err) {
     res.status(500).json(response.error || 'some error occured while deleting customer.');
  }
};

  module.exports = {
  getAll,
  getSingle,
  createCustomer,
  updateCustomer,
  deleteCustomer
};