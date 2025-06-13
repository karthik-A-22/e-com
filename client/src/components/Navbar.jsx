import {
  Navbar,
  Nav,
  Container,
  FormControl,
  Form,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo_ecom.png";
import { FaShoppingBasket } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa"; // Optional search icon
import dummyProducts from "../data/products.json";
import "../styles/AppNavbar.css";

const AppNavbar = () => {
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSearchDrawer, setShowSearchDrawer] = useState(false);

  useEffect(() => {
    if (search.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = dummyProducts.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setSuggestions(filtered);
  }, [search]);

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="md"
        fixed="top"
        className="shadow-sm px-3"
      >
        <Container fluid>
          {/* Brand */}
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-1 me-3"
          >
            <img
              src={logo}
              alt="Logo"
              height="32"
              className="d-inline-block align-top"
            />
            <span className="fw-bold fs-5 d-none d-sm-inline">Mini G-Shop</span>
          </Navbar.Brand>

          {/* Toggler */}
          <Navbar.Toggle aria-controls="main-navbar" />

          <Navbar.Collapse id="main-navbar">
            {/* Centered Search */}
            <div
              className="mx-auto w-100 d-none d-md-flex justify-content-center position-relative"
              style={{ maxWidth: "500px" }}
            >
              <Form className="w-100">
                <FormControl
                  type="text"
                  placeholder="Search products..."
                  className="rounded"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {suggestions.length > 0 && (
                  <ul className="suggestions-list bg-white text-dark rounded mt-1 position-absolute w-100 shadow z-3">
                    {suggestions.map((item, idx) => (
                      <li
                        key={idx}
                        className="px-3 py-1 suggestion-item"
                        onClick={() => {
                          setSearch("");
                          window.location.href = `/product/${item.id}`;
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                )}
              </Form>
            </div>

            {/* Nav Items */}
            <Nav className="ms-auto align-items-center gap-3 mt-2 mt-md-0">
              {/* Mobile Search Icon */}
              <div className="d-md-none">
                <Nav.Link onClick={() => setShowSearchDrawer(true)}>
                  <FaSearch size={18} />
                </Nav.Link>
              </div>

              {/* Cart */}
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

              {/* Auth */}
              {user ? (
                <div className="position-relative">
                  <NavDropdown
                    title={
                      <span>
                        Hi,{" "}
                        {user.name.length > 12
                          ? user.name.slice(0, 10) + "…"
                          : user.name}
                      </span>
                    }
                    id="account-dropdown"
                    align="end"
                    menuVariant="dark"
                    className="custom-account-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/orders">
                      View Orders
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/wishlist">
                      Wishlist
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/addresses">
                      Saved Addresses
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                  </NavDropdown>
                </div>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Offcanvas
        show={showSearchDrawer}
        onHide={() => setShowSearchDrawer(false)}
        placement="top"
        className="bg-light"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search Products</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <FormControl
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>

          {suggestions.length > 0 && (
            <ul className="suggestions-list bg-white text-dark rounded mt-2 shadow">
              {suggestions.map((item, idx) => (
                <li
                  key={idx}
                  className="px-3 py-2 border-bottom"
                  onClick={() => {
                    setShowSearchDrawer(false);
                    setSearch("");
                    window.location.href = `/product/${item.id}`; // or use navigate
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default AppNavbar;
