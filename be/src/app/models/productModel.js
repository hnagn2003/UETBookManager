const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema (
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    factory: {
      type: Array,
    },
    lab: {
      type: Array,
    },
    guarantee: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
