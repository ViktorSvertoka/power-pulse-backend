const { Schema, model } = require('mongoose');
const Joi = require('joi');

const productSchema = new Schema(
  {
    productId: {
      type: String,
      ref: 'product',
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: false,
    },
    date: {
      type: String,
      required: true,
      format: 'dd/mm/YYYY',
    },
    category: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    recommended: {
      type: Boolean,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 1,
    },
    amount: {
      type: String,
      required: true,
      min: 1,
    },
    weight: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { versionKey: false, timestamps: true }
);

const productSchemaJoi = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/i)
    .required(),
  calories: Joi.number().min(1).required(),
  category: Joi.string().required(),
  recommended: Joi.boolean().required(),
  title: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  weight: Joi.number().min(1).required(),
});

const delProductSchemaJoi = Joi.object({
  productId: Joi.string().required(),
});

const schemasProduct = { productSchemaJoi, delProductSchemaJoi };

const Product = model('product', productSchema, 'diarys');

module.exports = { Product, schemasProduct };
