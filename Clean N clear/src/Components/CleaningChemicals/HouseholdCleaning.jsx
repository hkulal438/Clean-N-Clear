import React, { useEffect, useState } from "react";
import "./CleaningChemicals.css";

import CleanerProduct from "../../images/house/Cleaner Product.webp";
import CleaningAcid from "../../images/house/Cleaning Acid 5Ltr.webp";
import FloorCleaner from "../../images/house/Floor Cleaner.webp";
import PushSweeper from "../../images/house/Push sweeper S 4 Twin.jpg";
import SprayExtractionCleaner from "../../images/house/Spray extraction cleaner SE 4001.jpg";
import ToiletCleaner from "../../images/house/Toilet Cleaner 5Ltr.webp";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   HOUSEHOLD CLEANING PRODUCTS
   ========================================================= */

const products = [
  {
    id: "household-cleaner-product",
    name: "Cleaner Product",
    category: "Household Cleaning",
    price: 350,
    unit: "Unit",
    image: CleanerProduct,
    description:
      "Household cleaning product suitable for everyday cleaning and maintaining a clean home environment.",
  },
  {
    id: "household-cleaning-acid-5ltr",
    name: "Cleaning Acid 5Ltr",
    category: "Household Cleaning",
    price: 650,
    unit: "5 Litre",
    image: CleaningAcid,
    description:
      "Cleaning solution suitable for household cleaning requirements and maintaining hygienic surfaces.",
  },
  {
    id: "household-floor-cleaner",
    name: "Floor Cleaner",
    category: "Household Cleaning",
    price: 450,
    unit: "Unit",
    image: FloorCleaner,
    description:
      "Floor cleaning solution suitable for regular household floor cleaning and maintenance.",
  },
  {
    id: "push-sweeper-s4-twin",
    name: "Push Sweeper S 4 Twin",
    category: "Household Cleaning",
    price: 18500,
    unit: "Unit",
    image: PushSweeper,
    description:
      "Compact manual push sweeper designed for convenient cleaning of outdoor and household areas.",
  },
  {
    id: "spray-extraction-cleaner-se4001",
    name: "Spray Extraction Cleaner SE 4001",
    category: "Household Cleaning",
    price: 28500,
    unit: "Unit",
    image: SprayExtractionCleaner,
    description:
      "Spray extraction cleaning machine suitable for deep cleaning carpets, upholstery and household surfaces.",
  },
  {
    id: "household-toilet-cleaner-5ltr",
    name: "Toilet Cleaner 5Ltr",
    category: "Household Cleaning",
    price: 600,
    unit: "5 Litre",
    image: ToiletCleaner,
    description:
      "Toilet cleaning solution designed for regular bathroom and toilet cleaning requirements.",
  },
];

/* =========================================================
   EMPTY CUSTOMER
   ========================================================= */

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
};

/* =========================================================
   COMPONENT
   ========================================================= */

const HouseholdCleaning = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* =======================================================
     SHARED ORDER CART
     ======================================================= */

  const [cart, setCart] = useState(() => getOrderCart());

  const [showCart, setShowCart] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(null);

  const [loading, setLoading] = useState(false);

  const [orderedQuantities, setOrderedQuantities] = useState({});

  const [
    loadingOrderedQuantities,
    setLoadingOrderedQuantities,
  ] = useState(true);

  const [customer, setCustomer] = useState(emptyCustomer);

  const [notes, setNotes] = useState("");

  /* =========================================================
     SAVE CART TO SHARED ORDER CART
     ========================================================= */

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  /* =========================================================
     LOAD ORDERED QUANTITIES
     ========================================================= */

  const loadOrderedQuantities = async () => {
    try {
      setLoadingOrderedQuantities(true);

      const response = await fetch(
        `${API_URL}/api/product-order-quantities`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load ordered quantities."
        );
      }

      setOrderedQuantities(data.quantities || {});
    } catch (error) {
      console.error(
        "Unable to load ordered quantities:",
        error
      );

      setOrderedQuantities({});
    } finally {
      setLoadingOrderedQuantities(false);
    }
  };

  /* =========================================================
     LOAD ORDERED QUANTITIES ON PAGE OPEN
     ========================================================= */

  useEffect(() => {
    loadOrderedQuantities();
  }, []);

  /* =========================================================
     BODY SCROLL LOCK
     ========================================================= */

  useEffect(() => {
    const modalOpen =
      Boolean(selectedProduct) ||
      showCart ||
      showCheckout ||
      Boolean(orderSuccess);

    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [
    selectedProduct,
    showCart,
    showCheckout,
    orderSuccess,
  ]);

  /* =========================================================
     FORMAT PRICE
     ========================================================= */

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  /* =========================================================
     ADD TO ORDER
     ========================================================= */

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setSelectedProduct(null);

    setShowCart(true);
  };

  /* =========================================================
     UPDATE QUANTITY
     ========================================================= */

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity)) {
      return;
    }

    if (nextQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: nextQuantity,
            }
          : item
      )
    );
  };

  /* =========================================================
     REMOVE FROM ORDER
     ========================================================= */

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  /* =========================================================
     CART COUNT
     ========================================================= */

  const cartCount = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  /* =========================================================
     CART TOTAL
     ========================================================= */

  const cartTotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  /* =========================================================
     CUSTOMER INPUT
     ========================================================= */

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  };

  /* =========================================================
     OPEN CHECKOUT
     ========================================================= */

  const openCheckout = () => {
    if (cart.length === 0) {
      alert("Please add at least one product to your order.");
      return;
    }

    setShowCart(false);
    setShowCheckout(true);
  };

  /* =========================================================
     SUBMIT ORDER
     ========================================================= */

  const submitOrder = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      alert("Please add at least one product to your order.");
      return;
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const email = customer.email.trim();
    const company = customer.company.trim();
    const location = customer.location.trim();

    /* -------------------------------------------------------
       REQUIRED FIELDS
       ------------------------------------------------------- */

    if (!name || !phone || !location) {
      alert(
        "Please enter your name, phone number and location."
      );
      return;
    }

    /* -------------------------------------------------------
       PHONE VALIDATION
       ------------------------------------------------------- */

    const phoneDigits = phone.replace(/\D/g, "");

    if (
      phoneDigits.length < 7 ||
      phoneDigits.length > 15
    ) {
      alert("Please enter a valid phone number.");
      return;
    }

    /* -------------------------------------------------------
       EMAIL VALIDATION
       ------------------------------------------------------- */

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      /* -----------------------------------------------------
         SEND ONLY PRODUCT IDS + QUANTITIES
         Backend handles product prices.
         ----------------------------------------------------- */

      const orderItems = cart.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
      }));

      const response = await fetch(
        `${API_URL}/api/order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customer: {
              name,
              phone,
              email,
              company,
              location,
            },
            items: orderItems,
            notes: notes.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit order."
        );
      }

      /* -----------------------------------------------------
         SHOW SUCCESS
         ----------------------------------------------------- */

      setOrderSuccess(data);

      /* -----------------------------------------------------
         CLEAR SHARED ORDER CART
         ----------------------------------------------------- */

      setCart([]);

      /* -----------------------------------------------------
         CLEAR CUSTOMER DETAILS
         ----------------------------------------------------- */

      setCustomer({
        ...emptyCustomer,
      });

      setNotes("");

      /* -----------------------------------------------------
         CLOSE CHECKOUT
         ----------------------------------------------------- */

      setShowCheckout(false);

      /* -----------------------------------------------------
         REFRESH ORDERED QUANTITIES
         ----------------------------------------------------- */

      await loadOrderedQuantities();
    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      alert(
        error.message ||
          "Unable to submit the order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     CLOSE PRODUCT MODAL
     ========================================================= */

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  /* =========================================================
     CLOSE CART
     ========================================================= */

  const closeCart = () => {
    setShowCart(false);
  };

  /* =========================================================
     CLOSE CHECKOUT
     ========================================================= */

  const closeCheckout = () => {
    if (loading) {
      return;
    }

    setShowCheckout(false);
  };

  /* =========================================================
     CLOSE SUCCESS
     ========================================================= */

  const closeSuccess = () => {
    setOrderSuccess(null);
  };

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <section className="ccq-section">

      {/* =====================================================
          HEADER
          ===================================================== */}

      <div className="ccq-header">
        <span className="ccq-label">
          HOUSEHOLD CLEANING
        </span>

        <h1 className="ccq-title">
          Household Cleaning
        </h1>

        <p className="ccq-intro">
          Explore our range of household cleaning
          products and equipment designed for
          everyday cleaning and home maintenance.
        </p>
      </div>

      {/* =====================================================
          MY ORDER
          ===================================================== */}

      <button
        type="button"
        className="ccq-cart-button"
        onClick={() => setShowCart(true)}
        aria-label={`My Order - ${cartCount} items`}
      >
        <span>My Order</span>

        <strong>{cartCount}</strong>
      </button>

      {/* =====================================================
          PRODUCT GRID
          ===================================================== */}

      <div className="ccq-grid">
        {products.map((product) => {
          const orderedQuantity =
            Number(
              orderedQuantities[product.id]
            ) || 0;

          return (
            <article
              className="ccq-card"
              key={product.id}
            >
              {/* IMAGE */}

              <button
                type="button"
                className="ccq-image-button"
                onClick={() =>
                  setSelectedProduct(product)
                }
                aria-label={`View ${product.name}`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="ccq-product-image"
                  loading="lazy"
                />
              </button>

              {/* CONTENT */}

              <div className="ccq-card-content">
                <span className="ccq-category">
                  {product.category}
                </span>

                <h2 className="ccq-product-name">
                  {product.name}
                </h2>

                <div className="ccq-price">
                  {formatPrice(product.price)}
                </div>

                <div className="ccq-unit">
                  {product.unit}
                </div>

                {/* ORDERED QUANTITY */}

                {!loadingOrderedQuantities &&
                  orderedQuantity > 0 && (
                    <div className="ccq-ordered">
                      Ordered: {orderedQuantity}
                    </div>
                  )}

                {/* ADD TO ORDER */}

                <button
                  type="button"
                  className="ccq-add-button"
                  onClick={() =>
                    addToCart(product)
                  }
                >
                  Add to Order
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* =====================================================
          PRODUCT DETAILS MODAL
          ===================================================== */}

      {selectedProduct && (
        <div
          className="ccq-overlay"
          onClick={closeProductModal}
          role="presentation"
        >
          <div
            className="ccq-product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
          >
            <button
              type="button"
              className="ccq-close"
              onClick={closeProductModal}
              aria-label="Close product details"
            >
              ×
            </button>

            {/* PRODUCT IMAGE */}

            <div className="ccq-modal-image-wrap">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="ccq-modal-image"
              />
            </div>

            {/* PRODUCT DETAILS */}

            <div className="ccq-modal-content">
              <span className="ccq-category">
                {selectedProduct.category}
              </span>

              <h2>
                {selectedProduct.name}
              </h2>

              <div className="ccq-modal-price">
                {formatPrice(
                  selectedProduct.price
                )}
              </div>

              <p>
                {selectedProduct.description}
              </p>

              <div className="ccq-modal-unit">
                <span>Pack / Unit:</span>

                <strong>
                  {selectedProduct.unit}
                </strong>
              </div>

              <button
                type="button"
                className="ccq-add-large"
                onClick={() =>
                  addToCart(selectedProduct)
                }
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          ORDER SUMMARY
          ===================================================== */}

      {showCart && (
        <div
          className="ccq-overlay"
          onClick={closeCart}
          role="presentation"
        >
          <aside
            className="ccq-cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
            role="dialog"
            aria-modal="true"
            aria-label="Order Summary"
          >
            {/* CART HEADER */}

            <div className="ccq-cart-header">
              <div>
                <span>YOUR ORDER</span>

                <h2>Order Summary</h2>
              </div>

              <button
                type="button"
                className="ccq-close"
                onClick={closeCart}
                aria-label="Close order summary"
              >
                ×
              </button>
            </div>

            {/* EMPTY ORDER */}

            {cart.length === 0 ? (
              <div className="ccq-empty">
                <div className="ccq-empty-icon">
                  🛒
                </div>

                <h3>
                  Your order is empty
                </h3>

                <p>
                  Add products to your order
                  to continue.
                </p>
              </div>
            ) : (
              <>
                {/* CART ITEMS */}

                <div className="ccq-cart-items">
                  {cart.map((item) => (
                    <div
                      className="ccq-cart-item"
                      key={item.id}
                    >
                      {/* IMAGE */}

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      {/* INFORMATION */}

                      <div className="ccq-cart-item-info">
                        <h3>{item.name}</h3>

                        <span>
                          {formatPrice(item.price)}{" "}
                          / {item.unit}
                        </span>

                        {/* QUANTITY */}

                        <div className="ccq-quantity">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Number(
                                  item.quantity
                                ) - 1
                              )
                            }
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>

                          <strong>
                            {item.quantity}
                          </strong>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Number(
                                  item.quantity
                                ) + 1
                              )
                            }
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* REMOVE */}

                      <button
                        type="button"
                        className="ccq-remove"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* CART FOOTER */}

                <div className="ccq-cart-footer">
                  <div className="ccq-total">
                    <span>
                      Estimated Total
                    </span>

                    <strong>
                      ₹
                      {cartTotal.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <button
                    type="button"
                    className="ccq-checkout-button"
                    onClick={openCheckout}
                  >
                    Continue to Customer Details
                  </button>

                  <div className="ccq-no-payment">
                    <strong>
                      No Online Payment
                    </strong>

                    <span>
                      Submit your order request
                      and our team will contact
                      you for confirmation.
                    </span>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* =====================================================
          CUSTOMER DETAILS
          ===================================================== */}

      {showCheckout && (
        <div
          className="ccq-overlay"
          role="presentation"
        >
          <div
            className="ccq-checkout"
            role="dialog"
            aria-modal="true"
            aria-label="Customer Details"
          >
            <button
              type="button"
              className="ccq-close"
              onClick={closeCheckout}
              disabled={loading}
              aria-label="Close customer details"
            >
              ×
            </button>

            {/* CHECKOUT HEADING */}

            <div className="ccq-checkout-heading">
              <span>FINAL STEP</span>

              <h2>Customer Details</h2>

              <p>
                Enter your details and submit
                your order request. No online
                payment is required.
              </p>
            </div>

            {/* FORM */}

            <form
              className="ccq-form"
              onSubmit={submitOrder}
            >
              {/* FORM GRID */}

              <div className="ccq-form-grid">

                {/* NAME */}

                <div className="ccq-field">
                  <label htmlFor="household-name">
                    Full Name *
                  </label>

                  <input
                    id="household-name"
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                {/* PHONE */}

                <div className="ccq-field">
                  <label htmlFor="household-phone">
                    Phone Number *
                  </label>

                  <input
                    id="household-phone"
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>

                {/* EMAIL */}

                <div className="ccq-field">
                  <label htmlFor="household-email">
                    Email Address
                  </label>

                  <input
                    id="household-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>

                {/* COMPANY */}

                <div className="ccq-field">
                  <label htmlFor="household-company">
                    Company / Organization
                  </label>

                  <input
                    id="household-company"
                    type="text"
                    name="company"
                    value={customer.company}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>
              </div>

              {/* LOCATION */}

              <div className="ccq-field">
                <label htmlFor="household-location">
                  Delivery / Location *
                </label>

                <textarea
                  id="household-location"
                  name="location"
                  value={customer.location}
                  onChange={
                    handleCustomerChange
                  }
                  placeholder="Enter delivery location / address"
                  rows="3"
                  autoComplete="street-address"
                  required
                />
              </div>

              {/* NOTES */}

              <div className="ccq-field">
                <label htmlFor="household-notes">
                  Additional Notes
                </label>

                <textarea
                  id="household-notes"
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  placeholder="Any specific requirements?"
                  rows="4"
                />
              </div>

              {/* FINAL SUMMARY */}

              <div className="ccq-final-summary">
                <div>
                  <span>Products</span>

                  <strong>
                    {cartCount}
                  </strong>
                </div>

                <div>
                  <span>
                    Estimated Total
                  </span>

                  <strong>
                    ₹
                    {cartTotal.toLocaleString(
                      "en-IN"
                    )}
                  </strong>
                </div>
              </div>

              {/* NO PAYMENT */}

              <div className="ccq-no-payment">
                <strong>
                  No Online Payment
                </strong>

                <span>
                  Submit your order request
                  and our team will contact
                  you for confirmation.
                </span>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="ccq-submit"
                disabled={loading}
              >
                {loading
                  ? "Submitting Order..."
                  : "Submit Order Request"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          SUCCESS
          ===================================================== */}

      {orderSuccess && (
        <div
          className="ccq-overlay"
          role="presentation"
        >
          <div
            className="ccq-success"
            role="dialog"
            aria-modal="true"
            aria-label="Order submitted successfully"
          >
            <div className="ccq-success-icon">
              ✓
            </div>

            <span>ORDER RECEIVED</span>

            <h2>Thank You!</h2>

            <p>
              Your order request has been
              submitted successfully.
            </p>

            {/* ORDER ID */}

            <div className="ccq-order-number">
              <small>Order ID</small>

              <strong>
                {orderSuccess.orderId ||
                  orderSuccess.order?.id ||
                  "Order received"}
              </strong>
            </div>

            <p>
              Our team will contact you to
              confirm availability, delivery
              and final billing.
            </p>

            <button
              type="button"
              className="ccq-success-button"
              onClick={closeSuccess}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default HouseholdCleaning;