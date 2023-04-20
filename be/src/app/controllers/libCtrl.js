const Libs = require("../models/libModel");
const Books = require("../models/bookModel");
const Labs = require("../models/labModel");
const bcrypt = require("bcrypt");

const libCtrl = {
  getAllLibs: async (req, res) => {
    try {
      const libs = await Libs.find();
      if (libs) {
        res.json(libs);
      } else {
        res.json({ msg: "Not libs" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getLibById: async (req, res) => {
    try {
      const id = req.params.id;
      const books = await Books.find({ lib: id });
      const lib = await Libs.findOne({ _id: id });
      const labs = await Labs.find();

      if (books && lib && labs) {
        res.json({ books, lib, labs});
      } else {
        res.json({ msg: "Not books" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateAmount: async (req, res) => {
    try {
      const { id, storage } = req.body;

      const lib = await Libs.findOne({ _id: id });
      if (!lib) {
        return res.status(400).json({ msg: "lib not found" });
      }

      await Libs.findByIdAndUpdate(
        id,
        { storage:  storage},
        { new: true }
      );

      res.json({ msg: "Lib updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = libCtrl;
