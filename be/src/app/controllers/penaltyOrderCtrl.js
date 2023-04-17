const PenaltyOrders = require("../models/orderPenaltyModel");
const Orders = require("../models/orderModel");

const penaltyOrderCtrl = {
  createPenaltyOrder: async (req, res) => {
    try {
      const { idOrder, error, idLab, status } = req.body;
      // console.log(idOrder + " " + error + " " + idLab + " " + status);
      const order = await Orders.findOne({ _id: idOrder });
      if (!order) {
        return res.json({
          msg: "Failure Create new Penalty Order",
          create: true,
        });
      }
      await Orders.findByIdAndUpdate(
        idOrder,
        { status: "penalty" },
        { new: true }
      );
      const newPenaltyOrder = new PenaltyOrders({
        idOrder: idOrder,
        error: error,
        idLab: idLab,
        status: status,
      });
      await newPenaltyOrder.save();
      res.json({ msg: "Create new Penalty Order", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNotPenaltyOrder: async (req, res) => {
    try {
      const idPenaltyOrder = req.params.id;
      console.log(idPenaltyOrder);
      const penaltyOrder = await PenaltyOrders.findOne({
        _id: idPenaltyOrder,
      });
      const order = await Orders.findOne({ _id: penaltyOrder.idOrder });
      if (!order) {
        return res.json({
          msg: "Failure update new Penalty Order",
          update: true,
        });
      }
      if (!penaltyOrder) {
        return res.json({
          msg: "Failure update new Penalty Order",
          update: true,
        });
      }
      await Orders.findByIdAndUpdate(
        order._id,
        { status: "not penalty" },
        { new: true }
      );
      await PenaltyOrders.findByIdAndDelete(idPenaltyOrder);
      res.json({ msg: "Update", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPenaltyOrderByIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const penaltyOrders = await PenaltyOrders.find({
        idLab: id,
        status: "lab",
      });

      if (penaltyOrders) {
        let bookPenalties = await Promise.all(
          penaltyOrders.map(async (penaltyOrder) => {
            return await Orders.findOne({ _id: penaltyOrder.idOrder });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          penaltyOrders: penaltyOrders,
        });
      } else {
        res.json({ msg: "Not penaltyOrders" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPenaltyOrderByIdPenalty: async (req, res) => {
    try {
      const id = req.params.id;
      const penaltyOrders = await PenaltyOrders.find({
        idPenalty: id,
        status: "penalty",
      });

      if (penaltyOrders) {
        let bookPenalties = await Promise.all(
          penaltyOrders.map(async (penaltyOrder) => {
            return await Orders.findOne({ _id: penaltyOrder.idOrder });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          penaltyOrders: penaltyOrders,
        });
      } else {
        res.json({ msg: "Not penaltyOrders" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPenaltyOrderByIdLib: async (req, res) => {
    try {
      const id = req.params.id;
      const penaltyOrders = await PenaltyOrders.find({
        idLib: id,
        status: "lib",
      });

      if (penaltyOrders) {
        let bookPenalties = await Promise.all(
          penaltyOrders.map(async (penaltyOrder) => {
            return await Orders.findOne({ _id: penaltyOrder.idOrder });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          penaltyOrders: penaltyOrders,
        });
      } else {
        res.json({ msg: "Not penaltyOrders" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateStatusPenalty: async (req, res) => {
    try {
      const idPenaltyOrder = req.params.id;
      const penaltyOrder = await PenaltyOrders.findOne({
        _id: idPenaltyOrder,
      });
      if (penaltyOrder) {
        console.log(penaltyOrder);
        await PenaltyOrders.findByIdAndUpdate(
          idPenaltyOrder,
          req.body,
          { new: true }
        );
        return res.json({update: true});
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = penaltyOrderCtrl;
