import { Form } from "react-bootstrap";

const SortDropdown = ({ sortOption, setSortOption }) => (
  <Form.Select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
  >
    <option value="">Sort by</option>
    <option value="low">Price: Low to High</option>
    <option value="high">Price: High to Low</option>
  </Form.Select>
);

export default SortDropdown;
