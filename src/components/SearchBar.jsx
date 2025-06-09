import { Form } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm }) => (
  <Form.Control
    type="text"
    placeholder="Search products..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
);

export default SearchBar;
