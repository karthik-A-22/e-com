import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import "../styles/ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const { cartItems, addToCart, decrementQuantity } = useCart();

  useEffect(() => {
    const prod = productsData.find((p) => p.id === parseInt(id));
    if (prod) {
      setProduct(prod);
      setMainImage(prod.images?.[0] || "/placeholder.png");
    } else {
      setProduct(false);
    }
  }, [id]);

  if (product === null) return <Container>Loading...</Container>;
  if (product === false) return <Container>Product not found</Container>;

  // Get product quantity from cart
  const cartItem = cartItems.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <Container className="mt-4">
      <Row className="align-items-start">
        {/* Image Section */}
        <Col xs={12} md={5} className="mb-4 mb-md-0">
          <img
            src={mainImage}
            alt={product.title}
            className="main-product-image"
          />
          {/* Thumbnails */}
          <div className="d-flex gap-2 mt-2 flex-wrap">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setMainImage(img)}
                className={`product-thumbnail ${
                  mainImage === img ? "active" : ""
                }`}
              />
            ))}
          </div>
        </Col>

        {/* Product Info Section */}
        <Col xs={12} md={7}>
          <h2>{product.title}</h2>
          <p className="mb-1">
            <strong>Price:</strong> ${product.price.toFixed(2)}
          </p>
          {product.rating && (
            <p className="mb-1">
              <strong>Rating:</strong>{" "}
              <Badge bg="success">
                {product.rating} ★ ({product.reviews} reviews)
              </Badge>
            </p>
          )}
          {product.platform && (
            <p className="mb-1">
              <strong>Platform:</strong> {product.platform}
            </p>
          )}
          {product.brand && (
            <p className="mb-1">
              <strong>Brand:</strong> {product.brand}
            </p>
          )}
          {product.color && (
            <p className="mb-1">
              <strong>Color:</strong> {product.color}
            </p>
          )}
          {product.connectivity && (
            <p className="mb-1">
              <strong>Connectivity:</strong> {product.connectivity}
            </p>
          )}
          {product.stock !== undefined && (
            <p className="mb-1">
              <strong>In Stock:</strong>{" "}
              {product.stock > 0 ? `${product.stock} units` : "Out of stock"}
            </p>
          )}
          {product.warranty && (
            <p className="mb-1">
              <strong>Warranty:</strong> {product.warranty}
            </p>
          )}
          {product.shippingInfo && (
            <p className="mb-1">
              <strong>Shipping:</strong> {product.shippingInfo}
            </p>
          )}

          <hr />
          <p>{product.description}</p>

          {/* Add to Cart / Quantity Controls */}
          {product.stock === 0 ? (
            <Button variant="secondary" disabled className="mt-3">
              Out of Stock
            </Button>
          ) : quantity > 0 ? (
            <div className="d-flex align-items-center gap-2 mt-3">
              <Button
                variant="outline-dark"
                onClick={() => decrementQuantity(product.id)}
              >
                -
              </Button>
              <span className="fw-bold">{quantity}</span>
              <Button variant="outline-dark" onClick={() => addToCart(product)}>
                +
              </Button>
            </div>
          ) : (
            <Button
              variant="dark"
              onClick={() => addToCart(product)}
              className="mt-3"
            >
              Add to Cart
            </Button>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
