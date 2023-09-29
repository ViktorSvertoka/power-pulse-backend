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
	   required: true,
		},
		equipment: {
		type: String,
	   required: true,
		},
		name: {
		type: String,
		required: true,
		},
		target: {
		type: String,
		required: true,
		}
	
  },
  { versionKey: false }
);

diaryExerciseSchema.post('save', handleMongooseError);

const diaryAddExerciseSchemaJoi = Joi.object({
  exerciseId: Joi.string().required(),
  date: Joi.string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/i),
  time: Joi.number().min(1).required(),
  burnedCalories: Joi.number().min(1),
  bodyPart: Joi.string(),
  equipment: Joi.string(),
  name: Joi.string(),
  target: Joi.string(),
});

const diaryDelExerciseSchemaJoi = Joi.object({
	id: Joi.string().required(),
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
