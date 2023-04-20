const Products = require("../models/productModel.js");

const productCtrl = {
  //lấy danh sách gợi ý
  autocomplete: async (req, res) => {
    try {
      const keyword = req.query.searchValue;
      const products = await Products.find({
        $or: [
          { code: { $regex: keyword, $options: 'i' } },
          { name: { $regex: keyword, $options: 'i' } },
        ]
      }).limit(5);
      console.log(products);
      if (products) {
        res.json(products);
      } else {
        const products = await Products.aggregate([
          {
            $search: {
              "autocomplete": {
                "query": keyword,
                "path": ["name", "code"],
                "fuzzy": {
                  "maxEdits": 2,
                  "prefixLength": 2
                }
              }
            }
          },
        ]).limit(5);
        if (products) {
          res.json(products);
        } else {
          res.json({ msg: "Not found products" });
        }
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const { code, name, description, image, price } = req.body;

      const product = await Products.findOne({ code: code });
      if (product) {
        return res.json({ msg: "Code product registered", create: false });
      }
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
      await Products.findByIdAndUpdate(id, req.body, { new: true });
      res.json({ msg: "Product updated", update: true });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const { id } = req.body;
      const product = await Products.findOne({ _id: id });
      if (!product) return res.json({ msg: "Product not found" });
      await Products.findByIdAndDelete(id);
      res.json({ msg: "Product deleted", delete: true });
    } catch (error) {
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
        res.json({ msg: "Not found products" });
      }
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
};

module.exports = productCtrl;
