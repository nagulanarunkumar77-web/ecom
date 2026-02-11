import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (error) {
      alert("Failed to load orders");
    }
  };

  const confirmOrder = async (orderId) => {
    try {
      await API.put(`/orders/${orderId}/confirm`);
      alert("Order confirmed");
      fetchOrders(); // refresh list
    } catch (error) {
      alert("Failed to confirm order");
    }
  };
  const cancelHandler = async (id) => {
  if (!window.confirm("Cancel this order?")) return;

  await API.put(`/orders/${id}/cancel`);
  fetchOrders();
};


  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2 className="page-title">Admin Dashboard</h2>
      </div>

      {orders.length === 0 && (
        <div className="empty-state">
          <p>No orders found</p>
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

            <div className="order-details">
              <p><b>User:</b> {order.user.name}</p>
              <p><b>Email:</b> {order.user.email}</p>
            </div>

            {order.status === "Pending" && (
              <div className="order-actions">
                <button 
                  className="btn btn-success"
                  onClick={() => confirmOrder(order._id)}
                >
                  Confirm Order
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => cancelHandler(order._id)}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
