const Rents = require("../models/rentModel");
const Labs = require("../models/labModel");
const Books = require("../models/bookModel");
const Students = require("../models/studentModel");

const rentCtrl = {
  getRentFromIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const rents = await Rents.find({ idLab: id });
      const lab = await Labs.findOne({ _id: id });
      const books = await Books.find();
      if (rents && lab) {
        res.json({
          rents: rents,
          nameLab: lab.name,
          books: books,
        });
      } else {
        res.json({ msg: "Not rents" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createRent: async (req, res) => {
    try {
      const {
        idLab,
        nameLab,
        nameStudent,
        sdt,
        address,
        price,
        idBook,
      } = req.body;
      const newStudent = new Students({
        name: nameStudent,
        sdt: sdt,
        address: address,
      })

      await newStudent.save();

      const book = await Books.findOne({_id: idBook})
      const newRent = new Rents({
        idLab: idLab,
        nameLab: nameLab,
        idStudent: newStudent._id,
        idBook: idBook,
        nameBook: book.name,
        price: price,
        status: 'not penalty',
      })
      newRent.save();
      res.json({create: true, msg: 'Create rent'});

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = rentCtrl;
