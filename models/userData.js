const mongoose = require('mongoose');
const Joi = require('joi');

const userDataSchema = new mongoose.Schema({
  height: {
    type: Number,
    required: true,
    min: 150,
  },
  currentWeight: {
    type: Number,
    required: true,
    min: 35,
  },
  desiredWeight: {
    type: Number,
    required: true,
    min: 35,
  },
  birthday: {
    type: Date,
    required: true,
    validate: {
      validator: function (birthday) {
        const age = (new Date() - birthday) / (1000 * 60 * 60 * 24 * 365.25);
        return age >= 18;
      },
      message: 'Користувач повинен бути старше 18 років.',
    },
  },
  blood: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
  sex: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  levelActivity: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
});

const userValidationSchema = Joi.object({
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.date().required(),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.string().valid('male', 'female').required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

module.exports = userValidationSchema;

const UserData = mongoose.model('userdata', userDataSchema, );

module.exports = { UserData, userValidationSchema };
