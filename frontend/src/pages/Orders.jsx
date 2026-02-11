import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my")
      .then((res) => setOrders(res.data))
      .catch(() => alert("Failed to load orders"));
  }, []);

  return (
    <div className="orders-page">
      <div className="page-header">
        <h2 className="page-title">My Orders</h2>
      </div>

      {orders.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">📦</div>
          <p className="empty-state-text">No orders yet</p>
          <p className="empty-state-subtext">Your order history will appear here</p>
        </div>
      )}

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <div>
                <p className="order-id"><b>Order ID:</b> {order._id}</p>
                <p className="order-status">
                  Status: <span className={`status-badge status-${order.status.toLowerCase()}`}>{order.status}</span>
                </p>
              </div>
              <div className="order-total">
                <span className="total-label">Total</span>
                <span className="total-value">₹{order.totalPrice}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
