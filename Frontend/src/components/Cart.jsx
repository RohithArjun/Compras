import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const updateQuantity = (id, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Safe numerical subtotal calculation
  const subtotal = cart.reduce((acc, item) => {
    const itemPrice = Number(item.price) || 0;
    const itemQty = Number(item.quantity) || 1;
    return acc + itemPrice * itemQty;
  }, 0);

  return (
    <div className="app-main-layout-container" style={{ padding: "2.5rem", display: "flex", gap: "2rem" }}>
      <div style={{ flex: 2 }}>
        <h3 style={{ fontWeight: 800, color: "var(--text-main)", marginBottom: "1.5rem" }}>Your Checkout Cart</h3>
        {cart.length === 0 ? (
          <h6 style={{ fontWeight: 200, color: "var(--text-main)", marginBottom: "1.5rem" }}  >Your cart is empty.</h6>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="premium-product-card mb-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img src={item.imageUrl} alt={item.name} style={{ width: "60px", height: "60px", objectFit: "contain" }} />
                <div>
                  <h6 style={{ fontWeight: 700, margin: 0 }}>{item.name}</h6>
                  <small style={{ color: "var(--text-muted)" }}>Brand: {item.brand}</small>
                  <div style={{ color: "var(--accent-cyan)", fontWeight: 700 }}>₹ {item.price}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span style={{ fontWeight: 700 }}>{item.quantity || 1}</span>
                <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(item.id)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="premium-product-card" style={{ flex: 1, padding: "1.5rem", height: "fit-content" }}>
        <h5 style={{ fontWeight: 800 }}>Order Pricing Summary</h5>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
          <span>Subtotal:</span>
          <span style={{ fontWeight: 700 }}>₹ {subtotal}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
          <span>Shipping Cost:</span>
          <span style={{ color: "green" }}>FREE</span>
        </div>
        <hr />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 800, marginBottom: "1.5rem" }}>
          <span>Total Balance Due:</span>
          <span style={{ color: "var(--accent-cyan)" }}>₹ {subtotal}</span>
        </div>
        <button className="btn-sidebar-checkout w-100" onClick={() => alert("Proceeding to secure checkout gateway...")}>
          Proceed to Checkout Securely
        </button>
      </div>
    </div>
  );
};

export default Cart;