const express = require("express");
const router = express.Router();
const { cancelOrder } = require("../controllers/orderController");

const {
  placeOrder,
  getUserOrders,
  confirmOrder,
  getAllOrders
} = require("../controllers/orderController");

const { protect } = require("../middleware/authMiddleware");
const { admin } = require("../middleware/adminMiddleware");

// customer routes
// ADMIN: get all orders
router.get("/", protect, admin, getAllOrders);

router.post("/", protect, placeOrder);
router.get("/my", protect, getUserOrders);
router.put("/:id/cancel", protect, admin, cancelOrder);

// admin route
router.put("/:id/confirm", protect, admin, confirmOrder);

module.exports = router;
