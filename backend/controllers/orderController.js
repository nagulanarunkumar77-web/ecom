const Order = require("../models/Order");
const User = require("../models/User");
const sendEmail = require("../config/mail");


// PLACE ORDER
const placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("cart.productId");
    const { address } = req.body;

    if (user.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = user.cart.map((item) => ({
      product: item.productId._id,
      quantity: item.quantity
    }));

    const totalPrice = user.cart.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: user._id,
      items,
      totalPrice,
      address
    });

    user.cart = [];
    await user.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ADMIN: GET ALL ORDERS
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADMIN: CONFIRM ORDER
const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Confirmed";
    await order.save();

    await sendEmail(
      order.user.email,
      "Order Confirmed",
      `Hello ${order.user.name},

Your order has been confirmed successfully.

Order ID: ${order._id}
Total Amount: ₹${order.totalPrice}

For Cancelling Order Contact: 9345559896, Email: nagulanarunkumar77@gmail.com

Thank you for choosing us.`
    );

    res.status(200).json({ message: "Order confirmed and email sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ADMIN: CANCEL ORDER
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = "Cancelled";
    await order.save();

    // ✅ send email
    await sendEmail(
      order.user.email,
      "Order Cancelled",
      `Hello ${order.user.name},

Your order has been cancelled.

Reason: Out of stock

Order ID: ${order._id}


Sorry for the inconvenience.
`
    );

    res.status(200).json({ message: "Order cancelled successfully" });

  } catch (error) {
    console.error("Cancel Order Error:", error);
    res.status(500).json({ message: error.message });
  }
};



// ✅ EXPORT ONLY AFTER EVERYTHING IS DEFINED
module.exports = {
  placeOrder,
  getUserOrders,
  confirmOrder,
  cancelOrder,
  getAllOrders
};
