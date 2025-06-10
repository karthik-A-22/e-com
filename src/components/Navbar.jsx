import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "../styles/AppNavbar.css"; // 👈 custom styles
import logo from "../assets/logo_ecom.png"; // 👈 logo image

const AppNavbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar bg="dark" variant="dark" expand="md" sticky="top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="navbar-brand d-flex align-items-center gap-2"
        >
          <img
            src={logo} // 🔁 Replace with your logo path or URL
            alt="Logo"
            height="30"
            className="d-inline-block align-top"
          />
          <span className="d-none d-sm-inline">Mini G-Shop</span>{" "}
          {/* Hide text on very small screens */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar" className="flex-wrap">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/cart">
              Cart ({totalQuantity})
            </Nav.Link>

            {user ? (
              <>
                <Navbar.Text className="me-2">Hi, {user.name}</Navbar.Text>
                <Button
                  variant="outline-light"
                  size="sm"
                  className="logout-btn"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
