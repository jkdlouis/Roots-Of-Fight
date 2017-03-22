const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');
const Product = require('../models/product.model');

//post shopping cart product

router.post('/shopping-cart', (req, res, next) => {
  const decoded = jwt.decode(req.query.token);
  User.findById(decoded.user._id, (req, res, next) => {
    if(err) {
      return res.status(500).json({
        title: 'An error occurred',
        error: err
      })
    }
    const product = new Product({
      size: req.body.size,
      quantity: req.body.quantity,
      title: req.body.title,
      price: req.body.price
    });
    product.save((err, result) => {
      if(err) {
        return res.status(500).json({
          title: 'An error occurred',
          error: err
        });
      }
      user.product.push(result);
      user.save();
      res.status(201).json({
        message: 'Saved products in shopping cart',
        obj: result
      });
    });
  });
});

module.exports = router;