const { Schema, model } = require("mongoose");

const bodyPartsSchema = new Schema(
  {
    filter: {
      type: String,
    },

    name: {
      type: String,
    },

    imgURL: {
      type: String,
    }
  },
  { versionKey: false }
);

const Bodyparts= model("bodyparts", bodyPartsSchema, "filters");

module.exports = Bodyparts;
