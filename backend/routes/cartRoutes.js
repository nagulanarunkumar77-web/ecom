const express = require("express");
const router = express.Router();

const {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

// customer only (logged in)
router.put("/update/:productId", protect, updateCartQuantity);

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.delete("/remove/:productId", protect, removeFromCart);

module.exports = router;
