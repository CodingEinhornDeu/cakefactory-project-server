const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require("../models/Product.model");

// get all products fromDB 
router.get('/products', (req, res, next) => {
  Product.find()
    .then(allProducts => res.json(allProducts))
    .catch(err => res.json(err));
});

// to create a new product
router.post('/products', (req, res, next) => {
  const { name, description, price } = req.body;
  Product.create({
    name, description, price
  })
    .then(response => res.json(response))
    .catch(err => res.json(err));
})

// to get specific product
router.get('/products/:productId', (req, res, next) => {
  const { productId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Product.findById(productId)
  .then(product => res.status(200).json(product))
  .catch(error =>res.json(error));
})

// to update product
// router.put('/products/:productId', (req, res, next) => {

// })

// to delete product
// router.delete('/products/:productsId', (req, res, next) => {

// })

module.exports = router;