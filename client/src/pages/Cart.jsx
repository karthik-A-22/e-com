import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    getCartTotal,
    addToCart,
    decrementQuantity,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Your cart is empty.</h2>
        <Link to="/">
          <Button variant="primary" className="mt-3">
            Go Shopping
          </Button>
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <Row>
        <Col xs={12} md={8}>
          <h2 className="mb-4">Your Cart</h2>
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              const { id, title, price, quantity, images } = item;
              const image = images?.[0] || "/placeholder.png";

              return (
                <ListGroup.Item
                  key={id}
                  className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-start gap-3"
                >
                  {/* Image */}
                  <Image
                    src={image}
                    alt={title}
                    rounded
                    className="flex-shrink-0"
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                    }}
                  />

                  {/* Title & Quantity - takes full width on small screens */}
                  <div className="flex-grow-1 d-flex flex-column">
                    <h6 className="mb-1">{title}</h6>

                    <div className="d-flex align-items-center mt-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => decrementQuantity(id)}
                      >
                        −
                      </Button>
                      <span className="mx-2">{quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => addToCart(item)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="text-md-end mt-2 mt-md-0 d-flex flex-column align-items-end">
                    <div className="fw-bold mb-2">
                      ${(price * quantity).toFixed(2)}
                    </div>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCart(id)}
                    >
                      Remove
                    </Button>
                  </div>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>

        {/* ✅ Summary Section */}
        <Col xs={12} md={4} className="mt-4 mt-md-0">
          <Card className="p-3 shadow-sm">
            <h4 className="mb-3">Total: ${getCartTotal().toFixed(2)}</h4>
            <Link to="/checkout">
              <Button variant="dark" className="w-100">
                Proceed to Checkout
              </Button>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
