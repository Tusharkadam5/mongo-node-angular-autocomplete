const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const employeeRoute = express.Router();

// Product model
// let Product = require('../models/Product');
const { Product } = require('../models/Product');
var ProductModel = mongoose.model('Product');

// Search
exports.search = (req,res, next) =>{

  ProductModel.aggregate([
    {
      $search: {
        "autocomplete": {
          "path": "name",
          "query": req.body.name,
          "tokenOrder": "any"
        }
      }
    },
    {
      $limit: 15
    },
    {
      $project: {
        "_id": 0,
        "name": 1
      }
    }
  ], function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}

// Add Product
exports.create = (req, res, next) => {
  console.log(req.body);
  var product = new ProductModel(req.body);

  // save model to database
  product.save(function (error, data) {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  });
};

// Get All Products
exports.getAllProduct = (req, res) => {
  ProductModel.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
}

// Get single Product
exports.getProductById = (req, res) => {
  Product.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
};


// Update Product
exports.updateProduct = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
}

// Delete Product
exports.deleteProduct = (req, res, next) => {
  Product.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
}

