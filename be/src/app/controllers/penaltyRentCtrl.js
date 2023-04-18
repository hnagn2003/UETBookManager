const PenaltyRents = require("../models/rentPenaltyModel");
const Rents = require("../models/rentModel");

const penaltyRentCtrl = {
  getAllPenalties: async (req, res) => {
    try {
      const penalties = await Penalties.find();
      if (penalties) {
        res.json(penalties);
      } else {
        res.json({ msg: "Not labs" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getPenaltyById: async (req, res) => {
    try {
      const id = req.params.id;
      const penalty = await Penalties.findOne({_id : id});

      if ( penalty) {
        res.json(penalty);
      } else {
        res.json({ msg: "Not penalty" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  createPenaltyRent: async (req, res) => {
    try {
      const { idRent, error, idLab, status } = req.body;
      // console.log(idRent + " " + error + " " + idLab + " " + status);
      const rent = await Rents.findOne({ _id: idRent });
      if (!rent) {
        return res.json({
          msg: "Failure Create new Penalty Rent",
          create: true,
        });
      }
      await Rents.findByIdAndUpdate(
        idRent,
        { status: "penalty" },
        { new: true }
      );
      const newPenaltyRent = new PenaltyRents({
        idRent: idRent,
        error: error,
        idLab: idLab,
        status: status,
      });
      await newPenaltyRent.save();
      res.json({ msg: "Create new Penalty Rent", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNotPenaltyRent: async (req, res) => {
    try {
      const idPenaltyRent = req.params.id;
      console.log(idPenaltyRent);
      const penaltyRent = await PenaltyRents.findOne({
        _id: idPenaltyRent,
      });
      const rent = await Rents.findOne({ _id: penaltyRent.idRent });
      if (!rent) {
        return res.json({
          msg: "Failure update new Penalty Rent",
          update: true,
        });
      }
      if (!penaltyRent) {
        return res.json({
          msg: "Failure update new Penalty Rent",
          update: true,
        });
      }
      await Rents.findByIdAndUpdate(
        rent._id,
        { status: "not penalty" },
        { new: true }
      );
      await PenaltyRents.findByIdAndDelete(idPenaltyRent);
      res.json({ msg: "Update", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPenaltyRentByIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const penaltyRents = await PenaltyRents.find({
        idLab: id,
        status: "lab",
      });

      if (penaltyRents) {
        let bookPenalties = await Promise.all(
          penaltyRents.map(async (penaltyRent) => {
            return await Rents.findOne({ _id: penaltyRent.idRent });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          penaltyRents: penaltyRents,
        });
      } else {
        res.json({ msg: "Not penaltyRents" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPenaltyRentByIdPenalty: async (req, res) => {
    try {
      const id = req.params.id;
      const penaltyRents = await PenaltyRents.find({
        idPenalty: id,
        status: "penalty",
      });

      if (penaltyRents) {
        let bookPenalties = await Promise.all(
          penaltyRents.map(async (penaltyRent) => {
            return await Rents.findOne({ _id: penaltyRent.idRent });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          penaltyRents: penaltyRents,
        });
      } else {
        res.json({ msg: "Not penaltyRents" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getPenaltyRentByIdLib: async (req, res) => {
    try {
      const id = req.params.id;
      const penaltyRents = await PenaltyRents.find({
        idLib: id,
        status: "lib",
      });

      if (penaltyRents) {
        let bookPenalties = await Promise.all(
          penaltyRents.map(async (penaltyRent) => {
            return await Rents.findOne({ _id: penaltyRent.idRent });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          penaltyRents: penaltyRents,
        });
      } else {
        res.json({ msg: "Not penaltyRents" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateStatusPenalty: async (req, res) => {
    try {
      const idPenaltyRent = req.params.id;
      const penaltyRent = await PenaltyRents.findOne({
        _id: idPenaltyRent,
      });
      if (penaltyRent) {
        console.log(penaltyRent);
        await PenaltyRents.findByIdAndUpdate(
          idPenaltyRent,
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

module.exports = penaltyRentCtrl;
