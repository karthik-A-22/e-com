import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown from "../components/SortDropdown";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const categories = ["All", "Game CDs", "Consoles", "Accessories"];

  const filtered = products
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) =>
      categoryFilter === "All" ? true : product.category === categoryFilter
    );

  const sorted = [...filtered].sort((a, b) => {
    if (sortOption === "low") return a.price - b.price;
    if (sortOption === "high") return b.price - a.price;
    return 0;
  });

  return (
    <Container className="mt-3">
      {/* Responsive Filter Controls */}
      <Row className="mb-4 gx-2 gy-2">
        <Col xs={12} md={4}>
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
        <Col xs={12} md={4}>
          <CategoryFilter
            categories={categories}
            selected={categoryFilter}
            onChange={setCategoryFilter}
          />
        </Col>
        <Col xs={12} md={4}>
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </Col>
      </Row>

      {/* Product Cards */}
      <Row className="g-2">
        {sorted.map((product) => (
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
