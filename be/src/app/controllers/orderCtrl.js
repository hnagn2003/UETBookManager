const Orders = require("../models/orderModel");
const Labs = require("../models/labModel");
const Books = require("../models/bookModel");
const Customers = require("../models/customerModel");

const orderCtrl = {
  getOderFromIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const orders = await Orders.find({ idLab: id });
      const lab = await Labs.findOne({ _id: id });
      const books = await Books.find();
      if (orders && lab) {
        res.json({
          orders: orders,
          nameLab: lab.name,
          books: books,
        });
      } else {
        res.json({ msg: "Not orders" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  createOder: async (req, res) => {
    try {
      const {
        idLab,
        nameLab,
        nameCustomer,
        sdt,
        address,
        price,
        idBook,
      } = req.body;
      const newCustomer = new Customers({
        name: nameCustomer,
        sdt: sdt,
        address: address,
      })

      await newCustomer.save();

      const book = await Books.findOne({_id: idBook})
      const newOrder = new Orders({
        idLab: idLab,
        nameLab: nameLab,
        idCustomer: newCustomer._id,
        idBook: idBook,
        nameBook: book.name,
        price: price,
        status: 'not guarantee',
      })
      newOrder.save();
      res.json({create: true, msg: 'Create order'});

    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = orderCtrl;
