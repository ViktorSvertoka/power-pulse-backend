const { Schema, model } = require('mongoose');
const Joi = require('joi');


const productSchema = new Schema ({
  productId: {
    type: String,
    ref: "product",
    required: true,
  },
  date: {
    type: String,
    required: true,
     format: "dd/mm/YYYY",
  },
  amount: {
    type: Number,
    required: true,
    min: 1,
  },
  calories: {
    type: Number,
    required: true,
    min: 1,
  },
    owner: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
 
 
},
 { versionKey: false }
);

const productSchemaJoi = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/i).required(),
  amount: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const schemasProduct = {productSchemaJoi}


const Product = model("product", productSchema, "diary" );

module.exports = { Product, schemasProduct };

