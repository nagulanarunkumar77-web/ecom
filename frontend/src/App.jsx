import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import API from "./services/api";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminProducts from "./pages/AdminProducts";

function App() {
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch {
      setCart([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route
          path="/"
          element={<Products refreshCart={fetchCart} />}
        />

        <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart cart={cart} refreshCart={fetchCart} />
              </ProtectedRoute>
            }
       />
       <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />


         <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <Orders />
              </ProtectedRoute>
            }
          />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

       <Route path="/admin/products" element={<AdminProducts />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />



        <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />



      </Routes>
    </>
  );
}

export default App;
