const mongoose = require("mongoose");

const rentPenaltyModel = new mongoose.Schema (
  {
    idRent: {
      type: String,
    },   
    error: {
      type: String,
    },
    idPenalty: {
      type: String,
      default: '',
    },
    idLib: {
      type: String,
      default: '',
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RentPenalties", rentPenaltyModel);
