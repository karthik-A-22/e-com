import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <Container className="mt-3">
      {/* Product Cards */}
      <Row className="g-2">
        {products.map((product) => (
          <Col
            key={product.id}
            xs={6} // 2 per row on mobile
            sm={6} // 2 per row on small devices
            md={4} // 3 per row on medium
            lg={3} // 4 per row on large
            xl={2} // 6 per row on extra large
            className="d-flex justify-content-center"
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
