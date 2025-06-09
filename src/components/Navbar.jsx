import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Mini E-Shop
        </Link>
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="nav-link">
          Cart ({totalQuantity})
        </Link>

        {user ? (
          <>
            <span className="welcome-text">Hi, {user.name}</span>
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
