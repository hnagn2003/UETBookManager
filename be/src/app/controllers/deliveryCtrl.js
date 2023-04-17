const Deliveries = require("../models/deliveryModel");
const Books = require("../models/bookModel.js");
const GuaranteeOrders = require("../models/orderGuaranteeModel");

const deliveryCtrl = {
  createDeliveryByFactory: async (req, res) => {
    try {
      const {
        from,
        nameFrom,
        to,
        nameTo,
        idBook,
        amount,
        description,
        status,
      } = req.body;
      console.log(
        from + " " + to + " " + idBook + " " + amount + " " + description
      );
      const book = await Books.findOne({ _id: idBook });
      console.log(book.code);
      const newDelivery = new Deliveries({
        from: from,
        nameFrom: nameFrom,
        to: to,
        nameTo: nameTo,
        nameBook: book.code,
        idBook: idBook,
        amount: amount,
        description: description,
        status: status,
      });
      // Save mongodb
      await newDelivery.save();
      res.json({ msg: "Delivery book successfully", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createDeliveryByLab: async (req, res) => {
    try {
      const { from, nameFrom, to, nameTo, idGuaranteeOrder, status } = req.body;
      // console.log(
      //   from + " " + nameFrom + " " + to + " " + idGuaranteeOrder + " " + status
      // );
      const guaranteeOrder = await GuaranteeOrders.findOne({
        _id: idGuaranteeOrder,
      });
      if (guaranteeOrder) {
        console.log(guaranteeOrder);
        await GuaranteeOrders.findByIdAndUpdate(
          idGuaranteeOrder,
          { 
            idGuarantee: to, 
            status: "",
          },
          { new: true }
        );
      }
      const newDelivery = new Deliveries({
        from: from,
        nameFrom: nameFrom,
        to: to,
        nameTo: nameTo,
        idGuaranteeOrder: idGuaranteeOrder,
        status: status,
      });
      // Save mongodb
      await newDelivery.save();
      res.json({ msg: "Delivery book successfully", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getDeliveriesFromId: async (req, res) => {
    try {
      const id = req.params.id;
      const deliveries = await Deliveries.find({ from: id });
      if (!deliveries) {
        return res.json("Not delivery");
      }
      return res.json(deliveries);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getDeliveriesToId: async (req, res) => {
    try {
      const id = req.params.id;
      const deliveries = await Deliveries.find({ to: id });
      if (!deliveries) {
        return res.json("Not books");
      }
      return res.json(deliveries);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateStatus: async (req, res) => {
    try {
      const id = req.params.id;
      const delivery = await Deliveries.findOne({ _id: id });
      if (!delivery) return res.json({ msg: "Delivery not found" });
      await Deliveries.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Delivery update", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = deliveryCtrl;
