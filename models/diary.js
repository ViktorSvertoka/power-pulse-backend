const { Schema, model } = require('mongoose');
const { handleMongooseError } = require('../helpers');

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
          required: true,
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

const Diary = model('diary', diarySchema, 'diary');

module.exports = Diary;
