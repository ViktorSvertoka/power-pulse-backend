const { Schema, model } = require("mongoose");

const exercisesNameSchema = new Schema(
  {
    bodyPart: {
      type: String,
    },

    equipment: {
      type: String,
    },
    gifUrl: {
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
  { versionKey: false }
);

const ExerciseName = model("exercise", exercisesNameSchema);

module.exports = ExerciseName;
