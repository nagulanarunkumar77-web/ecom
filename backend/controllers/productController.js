const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");


// ADMIN: ADD PRODUCT
const createProduct = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    let imageData = {};

    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "products" }
      );

      imageData = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      stock: req.body.stock,
      description: req.body.description,
      image: imageData
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


// ADMIN: UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // update normal fields
    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.category = req.body.category || product.category;
    product.description = req.body.description || product.description;

    // 🔥 image update only if new image is sent
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder: "products" }
      );

      product.image = {
        public_id: result.public_id,
        url: result.secure_url
      };
    }

    await product.save();
    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// ADMIN: DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUBLIC: GET PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts
};

