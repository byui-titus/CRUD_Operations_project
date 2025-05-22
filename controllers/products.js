const mongodb = require('../data/database');
 const ObjectId = require('mongodb').ObjectId;



  const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('products').find();
    result.toArray().then((products) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products);
    });
    };

    
 const getSingle = async (req, res) => {
    const productId = new ObjectId(req.params.id); 
    const result = await mongodb.getDatabase().db().collection('products').find({_id: productId});
    result.toArray().then((products) =>{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(products[0]);
    });
 };

 const createProduct = async (req, res) => {
  const product  = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock,
    brand: req.body.brand,
    createdAt: req.body.createdAt
  };
 
   try {
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(204).send();
  } 
 } catch (err) {
    res.status(500).json(response.error || 'some error occured while creatiing product.');
 }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);


  const product  = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock,
    brand: req.body.brand,
    createdAt: req.body.createdAt
  };
  
  try {
    const response = await mongodb.getDatabase().db().collection('products').replaceOne({_id: productId}, product);
    if (response.modifiedCount >  0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occured creating product.');
    }
  } catch (err) {
    res.status(500).json(response.error || 'some error occured while creatiing product.');
  }
};

const deleteProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);

  try {
    const response = await mongodb.getDatabase().db().collection('products').deleteOne({_id: productId});
    if (response.deletedCount >  0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'some error occured while deleting product.');
    }
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product', error: err });
  }
};


 

 

  module.exports = {
  getAll,
  getSingle,
  createProduct,
  updateProduct,
  deleteProduct
};
