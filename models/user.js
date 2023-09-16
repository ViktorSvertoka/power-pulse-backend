const { Schema, model } = require('mongoose');

const Joi = require('joi');

const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

const handleMongooseError = require('../helpers/handleMongooseError');

const userSchema = new Schema(
  {
    email: {
      type: String,
      match: emailRegex,
      required: [true, 'Set email for contact'],
      unique: true,
    },

    password: {
      type: String,
      minLength: 6,
      required: [true, 'Set password for contact'],
    },

    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },

    token: {
      type: String,
      default: '',
    },

    avatarURL: {
      type: String,
      required: true,
    },

    verify: {
      type: Boolean,
      default: false,
    },

    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

const registerSchema = Joi.object({
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

  password: Joi.string().min(6).required().messages({
    'any.required': `Missing required password field`,
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
