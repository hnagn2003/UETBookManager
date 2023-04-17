//module guaranteeModel để thao tác với cơ sở dữ liệu
const Guarantees = require("../models/guaranteeModel");
//đối tượng bảo hành trong web
const guaranteeCtrl = {
  // Lấy tất cả các bảo hành từ cơ sở dữ liệu và trả về dưới dạng JSON. Nếu không có bảo hành nào thì trả về thông báo "Not labs".
  getAllGuarantees: async (req, res) => {
    try {
      const guarantees = await Guarantees.find();
      if (guarantees) {
        res.json(guarantees);
      } else {
        res.json({ msg: "Not labs" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  getGuaranteeById: async (req, res) => {
    try {
      const id = req.params.id;
      const guarantee = await Guarantees.findOne({_id : id});

      if ( guarantee) {
        res.json(guarantee);
      } else {
        res.json({ msg: "Not guarantee" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

};

module.exports = guaranteeCtrl;
