
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CleaningChemicals.css";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

// Product images
import AutoSprayRefill from "../../images/CleaningChemicals/Auto_Spray_Refill_225ml.png";
import CleaningAcid1L from "../../images/CleaningChemicals/Cleaning_Acid_1L.png";
import CleaningAcidSmallBottle from "../../images/CleaningChemicals/Cleaning_Acid_Small_Bottle.png";
import DishwashingLiquid5L from "../../images/CleaningChemicals/Dishwashing_Liquid_5L.png";
import FloorCleaner500ml5L from "../../images/CleaningChemicals/Floor_Cleaner_500ml_5L.png";
import FloorCleanerSmallBottle from "../../images/CleaningChemicals/Floor_Cleaner_Small_Bottle.png";
import GlassCleaner500ml5L from "../../images/CleaningChemicals/Glass_Cleaner_500ml_5L.png";
import GlassCleanerSmallBottle from "../../images/CleaningChemicals/Glass_Cleaner_Small_Bottle.png";
import HandWash5L from "../../images/CleaningChemicals/Hand_Wash_5L.png";
import HerbalFloorCleaner1L5L from "../../images/CleaningChemicals/Herbal_Floor_Cleaner_1L_5L.png";
import HerbalFloorCleanerSmallBottle from "../../images/CleaningChemicals/Herbal_Floor_Cleaner_Small_Bottle.png";
import MultiProLiquidSoap1L5L from "../../images/CleaningChemicals/Multi_Pro_Liquid_Soap_1L_5L.png";
import MultiProLiquidSoapSmallBottle from "../../images/CleaningChemicals/Multi_Pro_Liquid_Soap_Small_Bottle.png";
import SodiumHypochlorite5L from "../../images/CleaningChemicals/Sodium_Hypochlorite_5L.png";
import ToiletCleaner500ml5L from "../../images/CleaningChemicals/Toilet_Cleaner_500ml_5L.png";
import ToiletCleanerSmallBottle from "../../images/CleaningChemicals/Toilet_Cleaner_Small_Bottle.png";
import UrinalScreen from "../../images/CleaningChemicals/Urinal_Screen.png";

// WhatsApp business number
const WHATSAPP_NUMBER = "918147304734";

// Products
const products = [
  {
    id: "auto-spray-refill-225ml",
    name: "Auto Spray Refill 225ml",
    category: "Air Freshening",
    unit: "225ml",
    image: AutoSprayRefill,
  },
  {
    id: "cleaning-acid-1l",
    name: "Cleaning Acid 1L",
    category: "Cleaning Chemicals",
    unit: "1 L",
    image: CleaningAcid1L,
  },
  {
    id: "cleaning-acid-small-bottle",
    name: "Cleaning Acid Small Bottle",
    category: "Cleaning Chemicals",
    unit: "Bottle",
    image: CleaningAcidSmallBottle,
  },
  {
    id: "dishwashing-liquid-5l",
    name: "Dishwashing Liquid 5L",
    category: "Kitchen Cleaning",
    unit: "5 L",
    image: DishwashingLiquid5L,
  },
  {
    id: "floor-cleaner-500ml-5l",
    name: "Floor Cleaner 500ml / 5L",
    category: "Floor Cleaning",
    unit: "Available sizes",
    image: FloorCleaner500ml5L,
  },
  {
    id: "floor-cleaner-small-bottle",
    name: "Floor Cleaner Small Bottle",
    category: "Floor Cleaning",
    unit: "Bottle",
    image: FloorCleanerSmallBottle,
  },
  {
    id: "glass-cleaner-500ml-5l",
    name: "Glass Cleaner 500ml / 5L",
    category: "Glass Cleaning",
    unit: "Available sizes",
    image: GlassCleaner500ml5L,
  },
  {
    id: "glass-cleaner-small-bottle",
    name: "Glass Cleaner Small Bottle",
    category: "Glass Cleaning",
    unit: "Bottle",
    image: GlassCleanerSmallBottle,
  },
  {
    id: "hand-wash-5l",
    name: "Hand Wash 5L",
    category: "Hand Hygiene",
    unit: "5 L",
    image: HandWash5L,
  },
  {
    id: "herbal-floor-cleaner-1l-5l",
    name: "Herbal Floor Cleaner 1L / 5L",
    category: "Floor Cleaning",
    unit: "Available sizes",
    image: HerbalFloorCleaner1L5L,
  },
  {
    id: "herbal-floor-cleaner-small-bottle",
    name: "Herbal Floor Cleaner Small Bottle",
    category: "Floor Cleaning",
    unit: "Bottle",
    image: HerbalFloorCleanerSmallBottle,
  },
  {
    id: "multi-pro-liquid-soap-1l-5l",
    name: "Multi Pro Liquid Soap 1L / 5L",
    category: "Hand Hygiene",
    unit: "Available sizes",
    image: MultiProLiquidSoap1L5L,
  },
  {
    id: "multi-pro-liquid-soap-small-bottle",
    name: "Multi Pro Liquid Soap Small Bottle",
    category: "Hand Hygiene",
    unit: "Bottle",
    image: MultiProLiquidSoapSmallBottle,
  },
  {
    id: "sodium-hypochlorite-5l",
    name: "Sodium Hypochlorite 5L",
    category: "Cleaning Chemicals",
    unit: "5 L",
    image: SodiumHypochlorite5L,
  },
  {
    id: "toilet-cleaner-500ml-5l",
    name: "Toilet Cleaner 500ml / 5L",
    category: "Bathroom Cleaning",
    unit: "Available sizes",
    image: ToiletCleaner500ml5L,
  },
  {
    id: "toilet-cleaner-small-bottle",
    name: "Toilet Cleaner Small Bottle",
    category: "Bathroom Cleaning",
    unit: "Bottle",
    image: ToiletCleanerSmallBottle,
  },
  {
    id: "urinal-screen",
    name: "Urinal Screen",
    category: "Sanitary Supplies",
    unit: "Unit",
    image: UrinalScreen,
  },
];

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

const CleaningChemicals = () => {
  const [cart, setCart] = useState(() => getOrderCart());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [error, setError] = useState("");

  // Keep the shared cart synchronized.
  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const syncCart = () => setCart(getOrderCart());

    window.addEventListener("focus", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("focus", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  // Prevent background scrolling while a modal is open.
  useEffect(() => {
    const modalOpen =
      selectedProduct !== null ||
      showCart ||
      showCheckout ||
      showSuccess;

    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, showCart, showCheckout, showSuccess]);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const addToOrder = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          unit: product.unit,
          image: product.image,
          quantity: 1,
        },
      ];
    });

    setSelectedProduct(null);
    setError("");
    setShowCart(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter((item) => Number(item.quantity || 0) > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      setError("Please add products to your order first.");
      return;
    }

    setError("");
    setShowCart(false);
    setShowCheckout(true);
  };

  const backToCart = () => {
    setShowCheckout(false);
    setShowCart(true);
    setError("");
  };

  // Submit order directly to WhatsApp.
  const submitOrder = (event) => {
    event.preventDefault();

    if (!customer.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(customer.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!customer.location.trim()) {
      setError("Please enter your location.");
      return;
    }

    if (
      customer.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (cart.length === 0) {
      setError("Your order is empty.");
      return;
    }

    setError("");

    const productDetails = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\n` +
          `Package: ${item.unit}\n` +
          `Quantity: ${item.quantity}`
      )
      .join("\n\n");

    const message = [
      "NEW ORDER - CLEAN N CLEAR",
      "",
      "CUSTOMER DETAILS",
      `Name: ${customer.name.trim()}`,
      `Phone: ${customer.phone.trim()}`,
      `Email: ${customer.email.trim() || "Not provided"}`,
      `Company: ${customer.company.trim() || "Not provided"}`,
      `Location: ${customer.location.trim()}`,
      "",
      "ORDER DETAILS",
      productDetails,
      "",
      "ADDITIONAL REQUIREMENTS",
      customer.notes.trim() || "None",
      "",
      "Please confirm this order and share the next steps.",
    ].join("\n");

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp from the form submission.
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    // If the browser blocks the new tab, navigate directly.
    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  };

  const finishOrder = () => {
    setCart([]);
    updateOrderCart([]);
    setCustomer({ ...emptyCustomer });
    setShowSuccess(false);
    setShowCheckout(false);
    setShowCart(false);
    setSelectedProduct(null);
    setError("");
  };

  return (
    <section className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">CLEANING CHEMICALS</span>

        <h1 className="ccq-title">
          Cleaning &amp; Hygiene Products
        </h1>

        <p className="ccq-intro">
          Explore our cleaning and hygiene range for household,
          commercial and professional requirements.
        </p>

        <button
          type="button"
          className="ccq-cart-button"
          onClick={() => {
            setError("");
            setShowCart(true);
          }}
        >
          Order Cart
          {cartCount > 0 && (
            <strong>{cartCount}</strong>
          )}
        </button>
      </header>

      {/* PRODUCT GRID */}
      <div className="ccq-grid">
        {products.map((product) => (
          <article className="ccq-card" key={product.id}>
            <button
              type="button"
              className="ccq-image-button"
              onClick={() => setSelectedProduct(product)}
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="ccq-product-image"
                loading="lazy"
              />
            </button>

            <div className="ccq-card-content">
              <span className="ccq-category">
                {product.category}
              </span>

              <h2 className="ccq-product-name">
                {product.name}
              </h2>

              <div className="ccq-unit">{product.unit}</div>

              <button
                type="button"
                className="ccq-add-button"
                onClick={() => addToOrder(product)}
              >
                Add to Order
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* PRODUCT DETAILS MODAL */}
      {selectedProduct && (
        <div
          className="ccq-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="ccq-product-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="ccq-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="ccq-modal-image-wrap">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="ccq-modal-image"
              />
            </div>

            <div className="ccq-modal-content">
              <span className="ccq-category">
                {selectedProduct.category}
              </span>

              <h2>{selectedProduct.name}</h2>
              <p>Package: {selectedProduct.unit}</p>

              <button
                type="button"
                className="ccq-add-large"
                onClick={() => addToOrder(selectedProduct)}
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER CART */}
      {showCart && (
        <div
          className="ccq-overlay"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="ccq-cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ccq-cart-header">
              <div>
                <span className="ccq-label">YOUR ORDER</span>
                <h2>Order Cart</h2>
              </div>

              <button
                type="button"
                className="ccq-close"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            <div className="ccq-cart-items">
              {cart.length === 0 ? (
                <div className="ccq-empty">
                  <div className="ccq-empty-icon">🛒</div>
                  <h3>Your order is empty</h3>
                  <p>Add products to your order to continue.</p>
                  <Link
                    to="/products"
                    onClick={() => setShowCart(false)}
                  >
                    Browse Products
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="ccq-cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="ccq-cart-item-info">
                      <h3>{item.name}</h3>
                      <span>{item.unit}</span>

                      <div className="ccq-quantity">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <strong>{item.quantity}</strong>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="ccq-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="ccq-cart-footer">
                <div className="ccq-total">
                  <span>Selected Products</span>
                  <strong>{cartCount}</strong>
                </div>

                <p className="ccq-payment-note">
                  Submit your request and our team will contact you
                  to confirm the details.
                </p>

                {error && (
                  <div className="ccq-error">{error}</div>
                )}

                <button
                  type="button"
                  className="ccq-checkout-button"
                  onClick={goToCheckout}
                >
                  Proceed to Customer Details
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* CUSTOMER DETAILS FORM */}
      {showCheckout && (
        <div className="ccq-overlay">
          <div className="ccq-checkout">
            <button
              type="button"
              className="ccq-close"
              onClick={backToCart}
              aria-label="Back to order"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">
              <span className="ccq-label">CUSTOMER DETAILS</span>
              <h2>Submit Your Order</h2>
              <p>
                Provide your contact information so our team can
                review your product request.
              </p>
            </div>

            {error && (
              <div className="ccq-error">{error}</div>
            )}

            <form className="ccq-form" onSubmit={submitOrder}>
              <div className="ccq-form-grid">
                <div className="ccq-field">
                  <label htmlFor="ccq-name">Full Name *</label>
                  <input
                    id="ccq-name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="ccq-phone">Phone Number *</label>
                  <input
                    id="ccq-phone"
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder="Enter phone number"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="ccq-email">Email Address</label>
                  <input
                    id="ccq-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter email address"
                    autoComplete="email"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="ccq-company">
                    Company / Organisation
                  </label>
                  <input
                    id="ccq-company"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>

                <div className="ccq-field ccq-field-full">
                  <label htmlFor="ccq-location">Location *</label>
                  <input
                    id="ccq-location"
                    name="location"
                    value={customer.location}
                    onChange={handleCustomerChange}
                    placeholder="City / Area"
                    required
                  />
                </div>

                <div className="ccq-field ccq-field-full">
                  <label htmlFor="ccq-notes">
                    Additional Requirements
                  </label>
                  <textarea
                    id="ccq-notes"
                    name="notes"
                    value={customer.notes}
                    onChange={handleCustomerChange}
                    placeholder="Mention any product or delivery requirements..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="ccq-final-summary">
                <div className="ccq-final-summary-header">
                  <h3>Selected Products</h3>
                  <span>{cartCount} item(s)</span>
                </div>

                <div className="ccq-final-items">
                  {cart.map((item) => (
                    <div className="ccq-final-item" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>
                          Quantity: {item.quantity} · {item.unit}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ccq-form-actions">
                <button
                  type="button"
                  className="ccq-back-button"
                  onClick={backToCart}
                >
                  Back to Order
                </button>

                <button type="submit" className="ccq-submit">
                  Continue to WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ORDER HANDOFF CONFIRMATION */}
      {showSuccess && (
        <div className="ccq-overlay">
          <div className="ccq-success">
            <div className="ccq-success-icon">✓</div>
            <span className="ccq-label">WHATSAPP ORDER</span>
            <h2>Continue Your Order</h2>

            <p>
              Your WhatsApp message has been prepared. Send it in
              WhatsApp to deliver your order to our team.
            </p>

            <button
              type="button"
              className="ccq-success-button"
              onClick={finishOrder}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CleaningChemicals;
