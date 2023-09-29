const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');
const Joi = require('joi');

const diarySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    burnedCalories: {
      type: Number,
    },
    consumedCalories: {
      type: Number,
    },
    doneExercisesTime: {
      type: Number,
    },

    products: [
      {
        weight: {
          type: Number,
        },
        calories: {
          type: Number,
        },
        category: {
          type: String,
        },
        title: {
          type: String,
        },
        amount: {
          type: Number,
        },

        recommend: {
          type: Boolean,
        },
      },
    ],

    exercises: [
      {
        bodyPart: {
          type: String,
        },
        equipment: {
          type: String,
        },
        name: {
          type: String,
        },
        target: {
          type: String,
        },
        burnedCalories: {
          type: Number,
        },
        time: {
          type: Number,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

diarySchema.post('save', handleMongooseError);

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

const exerciseSchemaJoi = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/i),
  time: Joi.number().min(1).required(),
  burnedCalories: Joi.number().min(1),
  bodyPart: Joi.string(),
  equipment: Joi.string(),
  name: Joi.string(),
  target: Joi.string(),
});

const delProductSchemaJoi = Joi.object({
  id: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/i),
});

const delExerciseSchemaJoi = Joi.object({
  id: Joi.string(),
});

const schemas = {
  productSchemaJoi,
  exerciseSchemaJoi,
  delProductSchemaJoi,
  delExerciseSchemaJoi,
};

const Diary = model('diary', diarySchema);

module.exports = { Diary, schemas };
