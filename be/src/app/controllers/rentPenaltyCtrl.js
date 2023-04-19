const RentPenalties = require("../models/rentPenaltyModel");
const Rents = require("../models/rentModel");

const rentPenaltyCtrl = {
  getAllPenalties: async (req, res) => {
    try {
      const penalties = await RentPenalties.find();
      if (penalties) {
        res.json(penalties);
      } else {
        res.json({ msg: "Not labs" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  // getPenaltyById: async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const penalty = await RentPenalties.findOne({_id : id});

  //     if ( penalty) {
  //       res.json(penalty);
  //     } else {
  //       res.json({ msg: "Not penalty" });
  //     }
  //   } catch (error) {
  //     return res.status(500).json({ msg: error.message });
  //   }
  // },

  createRentPenalty: async (req, res) => {
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
      const newRentPenalty = new RentPenalties({
        idRent: idRent,
        error: error,
        idLab: idLab,
        status: status,
      });
      await newRentPenalty.save();
      res.json({ msg: "Create new Penalty Rent", create: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  updateNotRentPenalty: async (req, res) => {
    try {
      const idRentPenalty = req.params.id;
      console.log(idRentPenalty);
      const rentPenalty = await RentPenalties.findOne({
        _id: idRentPenalty,
      });
      const rent = await Rents.findOne({ _id: rentPenalty.idRent });
      if (!rent) {
        return res.json({
          msg: "Failure update new Penalty Rent",
          update: true,
        });
      }
      if (!rentPenalty) {
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
      await RentPenalties.findByIdAndDelete(idRentPenalty);
      res.json({ msg: "Update", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getRentPenaltyByIdLab: async (req, res) => {
    try {
      const id = req.params.id;
      const rentPenalties = await RentPenalties.find({
        idLab: id,
        status: "lab",
      });

      if (rentPenalties) {
        let bookPenalties = await Promise.all(
          rentPenalties.map(async (rentPenalty) => {
            return await Rents.findOne({ _id: rentPenalty.idRent });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          rentPenalties: rentPenalties,
        });
      } else {
        res.json({ msg: "Not rentPenalties" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getRentPenaltyByIdPenalty: async (req, res) => {
    try {
      const id = req.params.id;
      const rentPenalties = await RentPenalties.find({
        idPenalty: id,
        status: "penalty",
      });

      if (rentPenalties) {
        let bookPenalties = await Promise.all(
          rentPenalties.map(async (rentPenalty) => {
            return await Rents.findOne({ _id: rentPenalty.idRent });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          rentPenalties: rentPenalties,
        });
      } else {
        res.json({ msg: "Not rentPenalties" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  getRentPenaltyByIdLib: async (req, res) => {
    try {
      const id = req.params.id;
      const rentPenalties = await RentPenalties.find({
        idLib: id,
        status: "lib",
      });

      if (rentPenalties) {
        let bookPenalties = await Promise.all(
          rentPenalties.map(async (rentPenalty) => {
            return await Rents.findOne({ _id: rentPenalty.idRent });
          })
        );
        res.json({
          bookPenalties: bookPenalties,
          rentPenalties: rentPenalties,
        });
      } else {
        res.json({ msg: "Not rentPenalties" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  updateStatusPenalty: async (req, res) => {
    try {
      const idRentPenalty = req.params.id;
      const rentPenalty = await RentPenalties.findOne({
        _id: idRentPenalty,
      });
      if (rentPenalty) {
        console.log(rentPenalty);
        await RentPenalties.findByIdAndUpdate(
          idRentPenalty,
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

module.exports = rentPenaltyCtrl;
