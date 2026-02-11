const User = require("../models/User");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const user = req.user; // from auth middleware
    const { productId, quantity } = req.body;

    // check if product already in cart
    const existingItem = user.cart.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      user.cart.push({
        productId,
        quantity: quantity || 1
      });
    }

    await user.save();

    res.status(200).json({ message: "Added to cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("cart.productId");

    // 🔥 filter broken products
    user.cart = user.cart.filter(item => item.productId);

    await user.save();

    res.status(200).json(user.cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const updateCartQuantity = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.params;
    const { action } = req.body; // "inc" or "dec"

    const item = user.cart.find(
      (i) => i.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "inc") {
      item.quantity += 1;
    }

    if (action === "dec") {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        user.cart = user.cart.filter(
          (i) => i.productId.toString() !== productId
        );
      }
    }

    await user.save();
    res.status(200).json(user.cart);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// REMOVE FROM CART
const removeFromCart = async (req, res) => {
  try {
    const user = req.user;
    const { productId } = req.params;

    user.cart = user.cart.filter(
      (item) => item.productId.toString() !== productId
    );

    await user.save();

    res.status(200).json({ message: "Removed from cart", cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartQuantity
};
