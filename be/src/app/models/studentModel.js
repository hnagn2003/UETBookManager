const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema (
  {
    name: {
      type: String,
    },
    sdt: {
      type: String,
    }, 
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Students", studentSchema);
