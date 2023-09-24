const { Schema, model } = require("mongoose");


const productCategorySchema = new Schema({
  weight: {
    type: Number,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  groupBloodNotAllowed: {
    type: Object
  }
});


const ProductCategory= model("productCategory", productCategorySchema , "products");

module.exports = ProductCategory;