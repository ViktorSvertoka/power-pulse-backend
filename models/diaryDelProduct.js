const { Schema, model } = require('mongoose');
const Joi = require('joi');

const delProductSchema = new Schema(
  {
    productId: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
      format: 'dd/mm/YYYY',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const delProductSchemaJoi = Joi.object({
  productId: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/i)
    .required(),
});

const schemasDelProduct = { delProductSchemaJoi };

const delProduct = model('delProduct', delProductSchema, 'diary');

module.exports = { delProduct, schemasDelProduct };
