const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

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
      default: true,
    },
    calories: {
      type: Number,
      required: true,
      min: 1,
    },
    amount: {
      type: Number,
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

productSchema.post('save', handleMongooseError);

const productSchemaJoi = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/i)
    .required()
    .messages({
      'any.required': `Formate date is wrong`,
    }),
  calories: Joi.number().min(1).required(),
  category: Joi.string().required(),
  recommended: Joi.boolean().required(),
  title: Joi.string().required(),
  amount: Joi.number().min(1).required(),
  weight: Joi.number().min(1).required(),
});

const delProductSchemaJoi = Joi.object({
  id: Schema.Types.ObjectId,

});

const schemasProduct = { productSchemaJoi, delProductSchemaJoi };

const Product = model('diaryproduct', productSchema);

module.exports = { Product, schemasProduct };
