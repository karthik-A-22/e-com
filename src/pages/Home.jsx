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
    <Container>
      {/* Responsive Filter Controls */}
      <Row className="mb-4">
        <Col xs={12} md={4} className="mb-2">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </Col>
        <Col xs={12} md={4} className="mb-2">
          <CategoryFilter
            categories={categories}
            selected={categoryFilter}
            onChange={setCategoryFilter}
          />
        </Col>
        <Col xs={12} md={4} className="mb-2">
          <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        </Col>
      </Row>

      {/* Product Cards */}
      <Row>
        {sorted.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
