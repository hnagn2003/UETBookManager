const mongoose = require("mongoose");

const orderPenaltyModel = new mongoose.Schema (
  {
    idOrder: {
      type: String,
    },   
    error: {
      type: String,
    },
    idLab: {
      type: String,
      default: '',
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

module.exports = mongoose.model("OrderPenalties", orderPenaltyModel);
