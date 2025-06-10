import ImageCarousel from "./Carousel";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

const ProductCard = ({ product }) => {
  const { id, title, price, images } = product;

  return (
    <Card className="product-card h-100 shadow-sm">
      <ImageCarousel images={images} interval={3000} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <div>
          <Card.Title className="product-title">{title}</Card.Title>
          <Card.Text className="product-price">${price.toFixed(2)}</Card.Text>
        </div>
        <Link to={`/product/${id}`} className="mt-2">
          <Button variant="primary" className="w-100 btn-sm">
            View Details
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
