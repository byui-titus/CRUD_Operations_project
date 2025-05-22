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

  const { name, description, price, category, inStock, brand, createdAt } = req.body;

  // ✅ Simple validation
  if (!name || name.length < 2) {
    return res.status(400).json({ message: 'Name is required and must be at least 2 characters.' });
  }

  if (!description || description.length < 5) {
    return res.status(400).json({ message: 'Description must be at least 5 characters.' });
  }

const parsedPrice = parseFloat(price);
if (isNaN(parsedPrice) || parsedPrice < 0) {
  return res.status(400).json({ message: 'Price must be a non-negative number.' });
}

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be a boolean.' });
  }

  if (!brand) {
    return res.status(400).json({ message: 'Brand is required.' });
  }

  const product = {
    name,
    description,
    price,
    category: category || null,
    inStock,
    brand,
    createdAt: createdAt ? new Date(createdAt) : new Date()
  };
   try {
    const response = await mongodb.getDatabase().db().collection('products').insertOne(product);
    if (response.acknowledged) {
        res.status(204).send();
  } else {
        res.status(500).json(response.error || 'some error occured creating product.');
  }
 } catch (err) {
    res.status(500).json(response.error || 'some error occured while creatiing product.');
 }
};

const updateProduct = async (req, res) => {
  const productId = new ObjectId(req.params.id);

 const { name, description, price, category, inStock, brand, createdAt } = req.body;

  // ✅ Simple validation
  if (!name || name.length < 2) {
    return res.status(400).json({ message: 'Name is required and must be at least 2 characters.' });
  }

  if (!description || description.length < 5) {
    return res.status(400).json({ message: 'Description must be at least 5 characters.' });
  }

  if (typeof price !== 'number' || price < 0) {
    return res.status(400).json({ message: 'Price must be a positive number.' });
  }

  if (typeof inStock !== 'boolean') {
    return res.status(400).json({ message: 'inStock must be a boolean.' });
  }

  if (!brand) {
    return res.status(400).json({ message: 'Brand is required.' });
  }

  const product = {
    name,
    description,
    price,
    category: category || null,
    inStock,
    brand,
    createdAt: createdAt ? new Date(createdAt) : new Date()
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
