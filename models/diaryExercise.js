const { Schema, model } = require('mongoose');
const Joi = require('joi');

const diaryExerciseSchema = new Schema(
  {
    exerciseId: {
      type: String,
      ref: 'exercise',
      required: true,
    },
    date: {
      type: String,
      format: 'dd/mm/YYYY',
      required: true,
    },
    time: {
      type: Number,
      min: 1,
      required: true,
    },
    calories: {
      type: Number,
      min: 1,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false }
);

const diaryExerciseSchemaJoi = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/i)
    .required()
    .messages({
      'any.required': `Formate date is wrong`,
    }),
  time: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
});

const schemas = {
  diaryExerciseSchemaJoi,
};

const diaryExercise = model('exercises', diaryExerciseSchema, 'diarys');

module.exports = {
  diaryExercise,
  schemas,
};
