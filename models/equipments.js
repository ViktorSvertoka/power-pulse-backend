const { Schema, model } = require("mongoose");

const equipmentsSchema = new Schema(
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

const Equipments= model("equipments", equipmentsSchema, "filters");

module.exports = Equipments;