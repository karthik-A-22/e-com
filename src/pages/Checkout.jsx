import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
  Card,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      customer: form,
      items: cartItems,
      total: getCartTotal(),
      date: new Date().toISOString(),
    };
    // Save logic placeholder
    console.log("Order saved:", order);
    alert(
      `Order placed for ${form.name}!\nTotal: $${getCartTotal().toFixed(2)}`
    );
    clearCart();
  };

  return (
    <Container className="py-4">
      <Row>
        {/* Form Section */}
        <Col xs={12} md={6}>
          <h2 className="mb-4">Checkout</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter full name"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhone" className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                placeholder="Enter phone number"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Button
              type="submit"
              variant="dark"
              disabled={cartItems.length === 0}
            >
              Place Order (${getCartTotal().toFixed(2)})
            </Button>
          </Form>
        </Col>

        {/* Order Summary */}
        <Col xs={12} md={6} className="mt-5 mt-md-0">
          <Card className="shadow-sm p-3">
            <h4 className="mb-3">Order Summary</h4>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                <ListGroup variant="flush">
                  {cartItems.map(({ id, title, quantity, price }) => (
                    <ListGroup variant="flush">
                      {cartItems.map(({ id, title, quantity, price }) => (
                        <ListGroup.Item
                          key={id}
                          className="d-flex justify-content-between align-items-start flex-wrap"
                        >
                          <div
                            className="flex-grow-1 me-2"
                            style={{ wordBreak: "break-word" }}
                          >
                            {title} × {quantity}
                          </div>
                          <div className="fw-bold">
                            ${(price * quantity).toFixed(2)}
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  ))}
                </ListGroup>
                <h5 className="mt-3">Total: ${getCartTotal().toFixed(2)}</h5>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
