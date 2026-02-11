import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar({ cartCount }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  let isLoggedIn = false;
  let isAdmin = false;

  if (token) {
    isLoggedIn = true;
    try {
      const decoded = jwtDecode(token);
      isAdmin =  decoded.role === "admin"
    } catch (err) {
      console.error("Invalid token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <nav className="navbar">
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h2>FOOD PRODUCTS</h2>
      </Link>

      <div className="nav-links">
        {location.pathname !== "/" && (
          <button onClick={goBack} className="nav-btn nav-button-btn back-btn-nav">
            ← Back
          </button>
        )}

        {isLoggedIn && !isAdmin &&  (
        <Link to="/cart" className="nav-btn nav-link-btn">🛒 Cart ({cartCount})</Link>
      )}
      {isLoggedIn && !isAdmin &&(
                <>
                  <Link to="/orders" className="nav-btn nav-link-btn">Orders</Link>
                  </>
      )}


       {isAdmin && (
                <>
                  <Link to="/admin" className="nav-btn nav-link-btn">Orders</Link>
                  <Link to="/admin/products" className="nav-btn nav-link-btn">
                    Products
                  </Link>
                </>
)}

        {isLoggedIn ? (
          <button onClick={logout} className="nav-btn nav-button-btn logout-btn-nav">
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="nav-btn nav-button-btn login-btn-nav">Login</button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
