import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    getCartTotal,
    addToCart,
    decrementQuantity,
  } = useCart();

  if (cartItems.length === 0)
    return (
      <div className="container">
        <h2>Your cart is empty.</h2>
      </div>
    );

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cartItems.map(({ id, title, price, quantity }) => (
          <li
            key={id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <div>
              {title} <br />
              <button onClick={() => decrementQuantity(id)}>-</button>
              <span style={{ margin: "0 10px" }}>{quantity}</span>
              <button onClick={() => addToCart({ id, title, price })}>+</button>
            </div>
            <div>
              ${(price * quantity).toFixed(2)}{" "}
              <button
                onClick={() => removeFromCart(id)}
                style={{
                  marginLeft: "10px",
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "5px 10px",
                  cursor: "pointer",
                  borderRadius: "3px",
                }}
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: ${getCartTotal().toFixed(2)}</h3>

      {/* ✅ Proceed to Checkout Button */}
      <Link to="/checkout">
        <button style={{ marginTop: "20px", padding: "10px 20px" }}>
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;
