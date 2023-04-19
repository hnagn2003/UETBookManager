const Books = require("../models/bookModel.js");

const bookCtrl = {

  create: async (req, res) => {
    try {
      const { code, name, description, image, price, author, category, language, publishYear, lib, lab } = req.body;

      const book = await Books.findOne({ code: code });
      if (book) {
        return res.json({ msg: "Code book registered", create: false });
      }
      const newBook = new Books({
        code,
        name,
        description,
        image,
        price,
        author, 
        category, 
        language, 
        publishYear, 
        lab: [],
        lib: [],

      });

      // Save mongodb
      await newBook.save();
      res.json({ msg: "Create book successfully", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.body;

      const book = await Books.findOne({ _id: id });
      if (!book) {
        return res.status(400).json({ msg: "Book not found" });
      }
      await Books.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Book updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const book = await Books.findOne({ _id: id });
      if (!book) return res.json({ msg: "Book not found" });
      await Books.findByIdAndDelete(id);
      res.json({ msg: "Book deleted", delete: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllBooks: async (req, res) => {
    try {
      const books = await Books.find();
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "Not books" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllBooksLib: async (req, res) => {
    try {
      const id = req.params.id;
      const books = await Books.find({lib: id});
      if (books) {
        res.json(books);
      } else {
        res.json({ msg: "Not books" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

};

module.exports = bookCtrl;