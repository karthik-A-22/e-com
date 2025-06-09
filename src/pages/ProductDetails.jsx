import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const prod = productsData.find((p) => p.id === parseInt(id));
    setProduct(prod ?? false); // false means not found
  }, [id]);

  if (product === null) return <div className="container">Loading...</div>;
  if (product === false)
    return <div className="container">Product not found</div>;

  return (
    <div
      className="container"
      style={{ display: "flex", gap: "40px", marginTop: "20px" }}
    >
      <img
        src={
          product.images && product.images.length > 0
            ? product.images[0]
            : "/placeholder.png"
        }
        alt={product.title}
        width="300px"
      />
      <div>
        <h2>{product.title}</h2>
        <p>
          <b>Price:</b> ${product.price.toFixed(2)}
        </p>
        <p>{product.description}</p>
        <button
          onClick={() => addToCart(product)}
          style={{
            padding: "10px 20px",
            backgroundColor: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
