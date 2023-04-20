const Products = require("../models/productModel.js");
const logger = require("../../../log");

const productCtrl = {

//   searchProduct: async (req, res) => {
//     try {
//         const keyword = req.query.keyword;
//         const products = await Products.find({
//           $or: [
//             { code: { $regex: keyword, $options: 'i' } },
//             { name: { $regex: keyword, $options: 'i' } },
//           ]
//         });
//         if (products.length) {
//           res.json({ msg: "Search product successfully", searchProduct: true });
//         } else {
//           res.json({ msg: "No products found" });
//         }
//       } catch (error) {
//         return res.status(500).json({ msg: error.message });
//       }
// },

  create: async (req, res) => {
    try {
      const { code, name, description, image, price } = req.body;

      const product = await Products.findOne({ code: code });
      if (product) {
        return res.json({ msg: "Code product registered", create: false });
      }
      logger.info("Tạo mới sản phẩm");
      const newProduct = new Products({
        code,
        name,
        description,
        image,
        price,
        agency: [],
        guarantee: [],
        factory: [],

      });

      // Save mongodb
      await newProduct.save();
      res.json({ msg: "Create product successfully", create: true });
    } catch (error) {
      logger.error("Lỗi tạo mới sản phẩm");
      return res.status(500).json({ msg: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const { id } = req.body;

      const product = await Products.findOne({ _id: id });
      if (!product) {
        return res.status(400).json({ msg: "Product not found" });
      }
      logger.info("Cập nhật sản phẩm");
      await Products.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Product updated", update: true });
    } catch (error) {
      logger.error("Lỗi cập nhật sản phẩm");
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const product = await Products.findOne({ _id: id });
      if (!product) return res.json({ msg: "Product not found" });
      await Products.findByIdAndDelete(id);
      logger.info("Xoá sản phẩm");
      res.json({ msg: "Product deleted", delete: true });
    } catch (error) {
      logger.error("Lỗi xoá sản phẩm");
      return res.status(500).json({ msg: error.message });
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const products = await Products.find();
      if (products) {
        res.json(products);
      } else {
        res.json({ msg: "Not products" });
      }
    } catch (error) {
      logger.error("Lỗi xem all sản phẩm");
      return res.status(500).json({ msg: error.message });
    }
  },
  getAllProductsBySearch: async (req, res) => {
    try {
      const keyword = req.query.searchValue;
      const products = await Products.find({
        $or: [
          { code: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
        ]
      });
      if (products) {
        res.json(products);
      } else {
        logger.error('Không tồn tại sản phẩm');
        res.json({ msg: "Not found products" });
      }
    } catch (error) {
      logger.error('Lỗi khi tìm sản phẩm');
      return res.status(500).json({ msg: error.message });
    }
  },

};

module.exports = productCtrl;
