const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// PUBLIC
router.get("/", getProducts);

// ADMIN ONLY


router.delete("/:id", protect, admin, deleteProduct);
router.post("/", protect, admin, upload.single("image"), createProduct);
router.put("/:id", protect, admin, upload.single("image"), updateProduct);


module.exports = router;
