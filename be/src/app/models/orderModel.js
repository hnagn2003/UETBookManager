const mongoose = require("mongoose");

const orderModel = new mongoose.Schema (
  {
    idLab: {
      type: String,
    },
    nameLab: {
      type: String,
    },
    idStudent: {
      type: String,
    },
    idBook: {
      type: String,
    },
    nameBook: {
      type: String,
    },
    price: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderModel);
