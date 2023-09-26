const { Schema, model } = require('mongoose');
const Joi = require('joi');

const delProductSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const delProductSchemaJoi = Joi.object({
  productId: Joi.string().required(),
});

const schemasDelProduct = { delProductSchemaJoi };

const delProduct = model('delProduct', delProductSchema, 'diary');

module.exports = { delProduct, schemasDelProduct };
