const { Schema, model } = require('mongoose');
const Joi = require('joi');

const diaryExerciseSchema = new Schema(
  {
    exerciseId: {
      type: Schema.Types.ObjectId,
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
  { versionKey: false, }
);

const diaryExercisesShemaJoi = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.string().regex(/^\d{2}\/\d{2}\/\d{4}$/i).required(),
  time: Joi.number().min(1).required(),
  calories: Joi.number().min(1).required(),
  
});

const schemas = {
  diaryExercisesShemaJoi,
};

const diaryExercise = model('diaryExercise', diaryExerciseSchema, 'diary');

module.exports = {
  diaryExercise,
  schemas,
};
