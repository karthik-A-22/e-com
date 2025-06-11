import { Form } from "react-bootstrap";

const CategoryFilter = ({ categories, selected, onChange }) => (
  <Form.Select value={selected} onChange={(e) => onChange(e.target.value)}>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </Form.Select>
);

export default CategoryFilter;
