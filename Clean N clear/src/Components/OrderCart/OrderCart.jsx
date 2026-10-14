
import { useEffect, useState } from "react";
import "./OrderCart.css";

import {
  getOrderCart,
  updateOrderCart,
  clearOrderCart,
} from "../../utils/OrderCart";

const WHATSAPP_NUMBER = "918147304734";

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
};

const OrderCart = () => {
  const [cart, setCart] = useState(() => getOrderCart());
  const [customer, setCustomer] = useState(emptyCustomer);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const syncCart = () => setCart(getOrderCart());

    window.addEventListener("cnc-order-cart-updated", syncCart);
    window.addEventListener("storage", syncCart);
    window.addEventListener("focus", syncCart);

    return () => {
      window.removeEventListener("cnc-order-cart-updated", syncCart);
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("focus", syncCart);
    };
  }, []);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity) || nextQuantity < 1) {
      setCart((previous) => previous.filter((item) => item.id !== id));
      return;
    }

    setCart((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    if (!cart.length) return;

    if (window.confirm("Are you sure you want to remove all products?")) {
      clearOrderCart();
      setCart([]);
    }
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitOrder = (event) => {
    event.preventDefault();

    if (!cart.length) {
      alert("Please add at least one product to your order.");
      return;
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const email = customer.email.trim();
    const company = customer.company.trim();
    const location = customer.location.trim();

    if (!name || !phone || !location) {
      alert("Please enter your name, phone number and location.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      alert("Please enter a valid phone number.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    const productDetails = cart
      .map((item, index) => {
        return [
          `${index + 1}. ${item.name || "Product"}`,
          `   Package/Unit: ${item.unit || "Not specified"}`,
          `   Quantity: ${Number(item.quantity) || 1}`,
        ].join("\n");
      })
      .join("\n\n");

    const message = [
      "Hello Clean N Clear! 👋",
      "",
      "I would like to enquire about the following products:",
      "",
      productDetails,
      "",
      "CUSTOMER DETAILS",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Company/Organization: ${company || "Not provided"}`,
      `Delivery/Location: ${location}`,
      "",
      `Additional Notes: ${notes.trim() || "None"}`,
      "",
      "Please contact me to confirm product availability and delivery details.",
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  if (cart.length === 0) {
    return (
      <main className="cnc-order-page">
        <section className="cnc-order-empty-page">
          <div className="cnc-order-empty-inner">
            <span className="cnc-order-label">MY ORDER</span>
            <div className="cnc-order-empty-icon">🛒</div>
            <h1>Your Order Is Empty</h1>
            <p>You have not added any products to your order yet.</p>
            <a href="/products" className="cnc-order-primary-btn">
              Explore Products
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="cnc-order-page">
      <section className="cnc-order-hero">
        <div className="cnc-order-container">
          <span className="cnc-order-label">MY ORDER</span>
          <h1>Order Summary</h1>
          <p>Review your selected products and enter your details to continue through WhatsApp.</p>
        </div>
      </section>

      <section className="cnc-order-content">
        <div className="cnc-order-container">
          <div className="cnc-order-layout">
            <div className="cnc-order-products">
              <div className="cnc-order-section-heading">
                <div>
                  <span>SELECTED PRODUCTS</span>
                  <h2>Your Order</h2>
                </div>
                <strong>
                  {cartCount} {cartCount === 1 ? "Item" : "Items"}
                </strong>
              </div>

              <button
                type="button"
                className="cnc-order-clear"
                onClick={handleClearCart}
              >
                Clear Order
              </button>

              <div className="cnc-order-item-list">
                {cart.map((item) => (
                  <article className="cnc-order-item" key={item.id}>
                    <div className="cnc-order-item-image">
                      {item.image && (
                        <img src={item.image} alt={item.name || "Product"} />
                      )}
                    </div>

                    <div className="cnc-order-item-info">
                      <span className="cnc-order-item-category">
                        {item.category || "Cleaning Products"}
                      </span>
                      <h3>{item.name}</h3>
                      <span className="cnc-order-item-unit">
                        {item.unit || "Unit"}
                      </span>
                    </div>

                    <div className="cnc-order-item-quantity">
                      <span>Quantity</span>
                      <div className="cnc-order-quantity-control">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, Number(item.quantity) - 1)
                          }
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          −
                        </button>
                        <strong>{item.quantity}</strong>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id, Number(item.quantity) + 1)
                          }
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="cnc-order-remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <aside className="cnc-order-sidebar">
              <div className="cnc-order-total-card">
                <span className="cnc-order-card-label">YOUR SELECTION</span>
                <h2>Order Details</h2>
                <div className="cnc-order-total-line">
                  <span>Products</span>
                  <strong>{cart.length}</strong>
                </div>
                <div className="cnc-order-total-line">
                  <span>Total Quantity</span>
                  <strong>{cartCount}</strong>
                </div>
                <p>Product availability and pricing can be confirmed with our team on WhatsApp.</p>
              </div>

              <div className="cnc-order-form-card">
                <div className="cnc-order-form-heading">
                  <span>FINAL STEP</span>
                  <h2>Customer Details</h2>
                  <p>Fill in the form below. Your details and selected products will be added to a WhatsApp message.</p>
                </div>

                <form className="cnc-order-form" onSubmit={submitOrder}>
                  <div className="cnc-order-field">
                    <label htmlFor="cnc-order-name">Full Name *</label>
                    <input
                      id="cnc-order-name"
                      type="text"
                      name="name"
                      value={customer.name}
                      onChange={handleCustomerChange}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      required
                    />
                  </div>

                  <div className="cnc-order-field">
                    <label htmlFor="cnc-order-phone">Phone Number *</label>
                    <input
                      id="cnc-order-phone"
                      type="tel"
                      name="phone"
                      value={customer.phone}
                      onChange={handleCustomerChange}
                      placeholder="Enter your phone number"
                      autoComplete="tel"
                      inputMode="tel"
                      required
                    />
                  </div>

                  <div className="cnc-order-field">
                    <label htmlFor="cnc-order-email">Email Address</label>
                    <input
                      id="cnc-order-email"
                      type="email"
                      name="email"
                      value={customer.email}
                      onChange={handleCustomerChange}
                      placeholder="Enter your email"
                      autoComplete="email"
                    />
                  </div>

                  <div className="cnc-order-field">
                    <label htmlFor="cnc-order-company">Company / Organization</label>
                    <input
                      id="cnc-order-company"
                      type="text"
                      name="company"
                      value={customer.company}
                      onChange={handleCustomerChange}
                      placeholder="Company name"
                      autoComplete="organization"
                    />
                  </div>

                  <div className="cnc-order-field">
                    <label htmlFor="cnc-order-location">Delivery / Location *</label>
                    <textarea
                      id="cnc-order-location"
                      name="location"
                      value={customer.location}
                      onChange={handleCustomerChange}
                      placeholder="Enter delivery location / address"
                      rows="3"
                      autoComplete="street-address"
                      required
                    />
                  </div>

                  <div className="cnc-order-field">
                    <label htmlFor="cnc-order-notes">Additional Notes</label>
                    <textarea
                      id="cnc-order-notes"
                      value={notes}
                      onChange={(event) => setNotes(event.target.value)}
                      placeholder="Any specific requirements?"
                      rows="4"
                    />
                  </div>

                  <div className="cnc-order-payment-note">
                    <strong>Continue with WhatsApp</strong>
                    <span>
                      Your WhatsApp message will contain your contact details and selected products. Review it and press Send in WhatsApp.
                    </span>
                  </div>

                  <button type="submit" className="cnc-order-submit">
                    Continue to WhatsApp
                  </button>
                </form>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderCart;
