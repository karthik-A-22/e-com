import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = {
      customer: form,
      items: cartItems,
      total: getCartTotal(),
      date: new Date().toISOString(),
    };
    saveOrder(order);
    alert(
      `Order placed for ${form.name}!\nTotal: $${getCartTotal().toFixed(2)}`
    );
    clearCart();
  };

  return (
    <div className="container">
      <h2>Checkout</h2>

      {/* Order Summary */}
      <div
        style={{
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <h3>Order Summary</h3>
        {cartItems.length === 0 && <p>No items in cart</p>}
        <ul>
          {cartItems.map(({ id, title, quantity, price }) => (
            <li key={id} style={{ marginBottom: "5px" }}>
              {title} x {quantity} = ${(price * quantity).toFixed(2)}
            </li>
          ))}
        </ul>
        <h4>Total: ${getCartTotal().toFixed(2)}</h4>
      </div>

      {/* Checkout Form */}
      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          onChange={handleChange}
          style={{ marginBottom: "10px", padding: "10px", width: "100%" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            background: "#333",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          disabled={cartItems.length === 0}
        >
          Place Order (${getCartTotal().toFixed(2)})
        </button>
      </form>
    </div>
  );
};

export default Checkout;
