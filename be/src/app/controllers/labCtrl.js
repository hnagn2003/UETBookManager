const Labs = require("../models/labModel");
const Books = require("../models/bookModel");

const labCtrl = {
  getAllLabs: async (req, res) => {
    try {
      const labs = await Labs.find();
      if (labs) {
        res.json(labs);
      } else {
        res.json({ msg: "Not labs" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getLabById: async (req, res) => {
    try {
      const id = req.params.id;
      const books = await Books.find({lab : id});
      const lab = await Labs.findOne({_id : id});

      if (books && lab) {
        res.json({books, lab});
      } else {
        res.json({ msg: "Not lab" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateAmount: async (req, res) => {
    try {
      const { id, storage } = req.body;

      const lab = await Labs.findOne({ _id: id });
      if (!lab) {
        return res.status(400).json({ msg: "lab not found" });
      }

      await Labs.findByIdAndUpdate(
        id,
        { storage:  storage},
        { new: true }
      );

      res.json({ msg: "Lab updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = labCtrl;
