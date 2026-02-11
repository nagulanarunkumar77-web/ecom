import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Cart({ cart, refreshCart }) {
  const navigate = useNavigate();

  const updateQty = async (productId, action) => {
    try {
      await API.put(`/cart/update/${productId}`, { action });
      await refreshCart();
    } catch (error) {
      alert("Failed to update quantity");
    }
  };

  const removeItem = async (productId) => {
    try {
      await API.delete(`/cart/remove/${productId}`);
      await refreshCart();
    } catch (error) {
      alert("Failed to remove item");
    }
  };

  const placeOrder = async () => {
    try {
      await API.post("/orders", { address: "Kumbakonam" });
      await refreshCart();
      alert("Order placed successfully");
      navigate("/orders");
    } catch (error) {
      alert("Failed to place order");
      navigate("/orders");
    }
  };

  const total = cart.reduce((sum, item) => {
    if (!item.productId) return sum;
    return sum + item.productId.price * item.quantity;
  }, 0);

  return (
    <div className="cart-page">
      <div className="page-header">
        <h2 className="page-title">Your Cart</h2>
      </div>

      {cart.length === 0 && (
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <p className="empty-cart-text">Your cart is empty</p>
          <p className="empty-cart-subtext">Add some products to get started!</p>
        </div>
      )}

      <div className="cart-items">
        {cart.map((item) => {
          if (!item.productId) return null;

          return (
            <div key={item._id} className="cart-item">
              {item.productId.image?.url && (
                <div className="cart-item-image">
                  <img 
                    src={item.productId.image.url} 
                    alt={item.productId.name}
                    className="cart-item-img"
                  />
                </div>
              )}
              
              <div className="cart-item-details">
                <h4 className="cart-item-name">{item.productId.name}</h4>
                <p className="cart-item-category">{item.productId.category}</p>
                <p className="cart-item-price">₹{item.productId.price}</p>

                <div className="cart-item-quantity">
                  <button 
                    className="qty-btn minus" 
                    onClick={() => updateQty(item.productId._id, "dec")}
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button 
                    className="qty-btn plus" 
                    onClick={() => updateQty(item.productId._id, "inc")}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-subtotal">
                  Subtotal: ₹{item.productId.price * item.quantity}
                </p>

                <button
                  className="remove-item-btn"
                  onClick={() => removeItem(item.productId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {cart.length > 0 && (
        <div className="cart-summary">
          <div className="cart-total">
            <span className="total-label">Total:</span>
            <span className="total-amount">₹{total}</span>
          </div>
          <button className="place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
