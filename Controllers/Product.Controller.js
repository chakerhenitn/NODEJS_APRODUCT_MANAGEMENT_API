const createError = require('http-errors')
const mongoose = require('mongoose')

const Product = require("../Models/product.model");
module.exports = {
  getAllProducts: async (req, res, next) => {
    try {
      const result = await Product.find({}, { __v: 0 });
      //const result = await Product.find({},{price: 1, name: 1, _id:0 })
      //const result = await Product.find({price: 250},{})
      res.send(result);
    } catch (error) {
      console.log(error.message);
    }
  },

  findProductById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await Product.findById(id, { __v: 0 });
      //const product = await Product.findOne({_id: id} ,{__v:0});
      if (!product) {
        throw createError(404, "Product not exist");
      }
      res.send(product);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },

  UpdateProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const updBodyPara = req.body;
      const result = await Product.findByIdAndUpdate(id, updBodyPara, {
        new: true,
      });
      if (!result) {
        throw createError(404, "Product not exist");
      }

      res.send({ result, new: true });
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await Product.findByIdAndDelete(id, { __v: 0 });
      //const product = await Product.findOne({_id: id} ,{__v:0});
      if (!result) {
        throw createError(404, "Product not exist");
      }
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error instanceof mongoose.CastError) {
        next(createError(404, "Invalid Product ID"));
        return;
      }
      next(error);
    }
  },

  createNewProduct: async (req, res, next) => {
    try {
      const product = new Product(req.body);
      const result = await product.save();
      res.send(result);
    } catch (error) {
      console.log(error.message);
      if (error.name === "ValidationError") {
        next(createError(422, error.message));
        return;
      }
      next(error);
    }
    /* const product = new Product({
                name: req.body.name,
                price: req.body.price
            }) */
    /*  product.save()
            .then(result => {
                console.log(result);
                res.send({"The result is":result})
            }) */
    /*     .catch(err =>{
                console.log(err.message);
            })*/
  },
};
