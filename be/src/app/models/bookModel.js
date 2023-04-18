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
    category: {
      type: String,
      require: true,
      trim: true,
    },
    author: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      trim: true
    },
    publishYear: {
      type: Number,
    },
    lib: {
      type: Array,
    },
    lab: {
      type: Array,
    },
    penalty: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Books", bookSchema);
