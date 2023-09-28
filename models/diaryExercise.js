const { Schema, model } = require('mongoose');
const Joi = require('joi');
const { handleMongooseError } = require('../helpers');

const diaryExerciseSchema = new Schema(
  {
   	exerciseId: {
      type: String,
      ref: 'exercise',
      required: true,
   	},
		owner: {
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
   	burnedCalories: {
      type: Number,
      min: 1,
      required: true,
   	},
		bodyPart: {
		type: String,
		required: true
		},
		equipment: {
		type: String,
		required: true
		},
		name: {
		type: String,
		required: true
		},
		target: {
		type: String,
		required: true
		}   
  },
  { versionKey: false }
);

diaryExerciseSchema.post('save', handleMongooseError);

const diaryAddExerciseSchemaJoi = Joi.object({
  exerciseId: Joi.string().required().messages({
	'any.required': `Fild exerciseId is required`,
 }),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/i)
    .required()
    .messages({
      'any.required': `Formate date is wrong`,
    }),
  time: Joi.number().min(1).required().messages({
	'any.required': `Fild time is required`,
 }),
  burnedCalories: Joi.number().min(1).required().messages({
	'any.required': `Fild burnedCalories is required`,
 }),
  bodyPart: Joi.string().required().messages({
	'any.required': `Fild bodyPart is required`,
 }),
  equipment: Joi.string().required().messages({
	'any.required': `Fild equipment is required`,
 }),
  name: Joi.string().required().messages({
	'any.required': `Fild name is required`,
 }),
  target: Joi.string().required().messages({
	'any.required': `Fild target is required`,
 }),
});

const diaryDelExerciseSchemaJoi = Joi.object({
	id: Joi.string().required(),
	// id: Schema.Types.ObjectId,
	date: Joi.string()
})

const schemas = {
	diaryAddExerciseSchemaJoi,
	diaryDelExerciseSchemaJoi,
};

const diaryExercise = model('diaryexercise', diaryExerciseSchema);

module.exports = {
  diaryExercise,
  schemas,
};
