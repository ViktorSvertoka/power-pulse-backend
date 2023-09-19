const { Schema, model } = require("mongoose");

const musculesSchema = new Schema(
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

const Muscules= model("muscules", musculesSchema, "filters");

module.exports = Muscules;