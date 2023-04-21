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
      const students = await Students.find();
      if (rents && lab) {
        res.json({
          rents: rents,
          nameLab: lab.name,
          books: books,
          students: students,
        });
      } else {
        res.json({ msg: "Not rents" });
      }
      // console.log(lab.name);

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createRent: async (req, res) => {
    try {
      const {
        idLab,
        nameLab,
        studentCode,
        idBook,
      } = req.body;
      // const newStudent = new Students({
      //   name: nameStudent,
      //   sdt: sdt,
      //   address: address,
      // })

      // await newStudent.save();
      console.log(typeof(req.body.studentID));

      const student = await Students.findOne({studentID: parseInt(req.body.studentID)})

      const book = await Books.findOne({_id: idBook})
      console.log(student);


      const newRent = new Rents({
        idLab: idLab,
        nameLab: nameLab,
        idStudent: student._id,
        idBook: idBook,
        nameBook: book.name,
        // price: price,
        status: 'Chưa trả',
      })
      newRent.save();
      res.json({create: true, msg: 'Create rent'});

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = rentCtrl;
