const { Schema, model } = require('mongoose');

const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const { handleMongooseError } = require('../helpers');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 3,
      required: [true, 'Name is required'],
    },

    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Email is required'],
      unique: true,
    },

    password: {
      type: String,
      minLength: 6,
      required: [true, 'Password is required'],
    },

    height: {
      type: Number,
      default: 160,
    },
    currentWeigth: {
      type: Number,
      default: 60,
    },
    desiredWeight: {
      type: Number,
      default: 160,
    },
    birthday: {
      type: Date,

      validate: {
        validator: function (birthday) {
          const age = (new Date() - birthday) / (1000 * 60 * 60 * 24 * 365.25);
          return age >= 18;
        },
        message: 'Користувач повинен бути старше 18 років.',
      },
      default: '1987-01-08',
    },
    blood: {
      type: Number,

      enum: [1, 2, 3, 4],
      default: 1,
    },
    sex: {
      type: String,

      enum: ['male', 'female'],
      default: 'male',
    },
    levelActivity: {
      type: Number,

      enum: [1, 2, 3, 4, 5],
      default: 1,
    },

    token: {
      type: String,
      default: '',
    },
    bmr: {
    type: Number
    },
    
    avatarURL: {
      type: String,
      required: true,
    },

    // verify: {
    //   type: Boolean,
    //   default: false,
    // },

    // verificationToken: {
    //   type: String,
    //   required: [true, 'Verify token is required'],
    // },

    avatarPublicId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    'any.required': `Missing required name field`,
  }),

  email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
    'any.required': `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
    'any.required': `Missing required email field`,
  }),

  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
  }),
});

const emailSchema = Joi.object({
  email: Joi.string().pattern(new RegExp(emailRegex)).required().messages({
    'any.required': `Missing required email field`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
  emailSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
