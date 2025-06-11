import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo_ecom.png";
import { FaShoppingBasket } from "react-icons/fa";
import "../styles/AppNavbar.css";

const AppNavbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="md"
      sticky="top"
      className="shadow-sm"
    >
      <Container>
        {/* Logo and Brand */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-2"
        >
          <img
            src={logo}
            alt="Logo"
            height="32"
            className="d-inline-block align-top"
          />
          <span className="fw-bold fs-5 d-none d-sm-inline">Mini G-Shop</span>
        </Navbar.Brand>

        {/* Toggler for mobile */}
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <Nav className="align-items-center gap-3">
            {/* Cart Button */}
            <Nav.Link
              as={Link}
              to="/cart"
              className="position-relative d-flex align-items-center gap-1"
            >
              <FaShoppingBasket size={22} />
              <span>Cart</span>
              {totalQuantity > 0 && (
                <span
                  className="position-absolute top-1 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.65rem" }}
                >
                  {totalQuantity}
                </span>
              )}
            </Nav.Link>

            {/* Auth Display */}
            {user ? (
              <Nav.Link
                as="span"
                onClick={logout}
                style={{ cursor: "pointer" }}
              >
                Hi,{" "}
                {user.name.length > 12
                  ? user.name.slice(0, 10) + "…"
                  : user.name}
              </Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
