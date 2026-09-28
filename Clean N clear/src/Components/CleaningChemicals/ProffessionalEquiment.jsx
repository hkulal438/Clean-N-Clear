import React, { useEffect, useState } from "react";
import "./CleaningChemicals.css";

import HighSpeedPolisher from "../../images/ProffessionalEquipment/HIGH SPEED POLISHER.png";
import MiniRideOnSweeper from "../../images/ProffessionalEquipment/Mini Ride on Sweeper BOL.png";
import MiniScrubberCable from "../../images/ProffessionalEquipment/Mini Scrubber (Cable).png";
import RideOnScrubberDryer from "../../images/ProffessionalEquipment/Ride on Scrubber Dryer 110L.png";
import RideOnSweeper from "../../images/ProffessionalEquipment/Ride on Sweeper 18CL.png";
import SteamVacuumCleaner from "../../images/ProffessionalEquipment/STEAM VACUUM CLEANER.png";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   PRODUCTS
   ========================================================= */

const products = [
  {
    id: "high-speed-polisher",
    name: "High Speed Polisher",
    category: "Professional Equipment",
    price: 18500,
    unit: "Unit",
    image: HighSpeedPolisher,
    description:
      "High speed floor polishing machine suitable for professional cleaning and floor maintenance.",
  },

  {
    id: "mini-ride-on-sweeper-bol",
    name: "Mini Ride on Sweeper BOL",
    category: "Professional Equipment",
    price: 125000,
    unit: "Unit",
    image: MiniRideOnSweeper,
    description:
      "Compact ride-on sweeping machine designed for efficient cleaning of commercial and institutional spaces.",
  },

  {
    id: "mini-scrubber-cable",
    name: "Mini Scrubber (Cable)",
    category: "Professional Equipment",
    price: 45000,
    unit: "Unit",
    image: MiniScrubberCable,
    description:
      "Compact floor scrubbing machine suitable for effective cleaning of different floor surfaces.",
  },

  {
    id: "ride-on-scrubber-dryer-110l",
    name: "Ride on Scrubber Dryer 110L",
    category: "Professional Equipment",
    price: 285000,
    unit: "Unit",
    image: RideOnScrubberDryer,
    description:
      "Professional ride-on scrubber dryer designed for efficient large-area floor cleaning.",
  },

  {
    id: "ride-on-sweeper-18cl",
    name: "Ride on Sweeper 18CL",
    category: "Professional Equipment",
    price: 225000,
    unit: "Unit",
    image: RideOnSweeper,
    description:
      "Powerful ride-on sweeping equipment suitable for commercial and institutional cleaning requirements.",
  },

  {
    id: "steam-vacuum-cleaner",
    name: "Steam Vacuum Cleaner",
    category: "Professional Equipment",
    price: 65000,
    unit: "Unit",
    image: SteamVacuumCleaner,
    description:
      "Professional steam vacuum cleaner designed for deep cleaning and effective hygiene maintenance.",
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

const ProffessionalEquiment = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  /* =======================================================
     SHARED ORDER CART
     ======================================================= */

  const [cart, setCart] = useState(() => getOrderCart());

  const [showCart, setShowCart] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(null);

  const [loading, setLoading] = useState(false);

  const [orderedQuantities, setOrderedQuantities] =
    useState({});

  const [
    loadingOrderedQuantities,
    setLoadingOrderedQuantities,
  ] = useState(true);

  const [customer, setCustomer] =
    useState(emptyCustomer);

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
          data.message ||
            "Unable to load ordered quantities."
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
     LOAD ON PAGE OPEN
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
     REMOVE PRODUCT
     ========================================================= */

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
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
      alert(
        "Please add at least one product to your order."
      );
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
      alert(
        "Please add at least one product to your order."
      );
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
      alert(
        "Please enter a valid phone number."
      );
      return;
    }

    /* -------------------------------------------------------
       EMAIL VALIDATION
       ------------------------------------------------------- */

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      /* -----------------------------------------------------
         SEND ONLY PRODUCT IDS + QUANTITIES
         Backend calculates product information and prices.
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
          data.message ||
            "Unable to submit order."
        );
      }

      /* -----------------------------------------------------
         SHOW SUCCESS
         ----------------------------------------------------- */

      setOrderSuccess(data);

      /* -----------------------------------------------------
         CLEAR SHARED CART
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
     CLOSE FUNCTIONS
     ========================================================= */

  const closeProductModal = () => {
    setSelectedProduct(null);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const closeCheckout = () => {
    if (loading) {
      return;
    }

    setShowCheckout(false);
  };

  const closeSuccess = () => {
    setOrderSuccess(null);
  };

  /* =========================================================
     JSX
     ========================================================= */

  return (
    <section className="ccq-section">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="ccq-header">

        <span className="ccq-label">
          PROFESSIONAL EQUIPMENT
        </span>

        <h1 className="ccq-title">
          Professional Cleaning Equipment
        </h1>

        <p className="ccq-intro">
          Explore our range of professional cleaning
          equipment designed for commercial,
          household and institutional cleaning
          requirements.
        </p>

      </div>


      {/* =====================================================
          MY ORDER BUTTON
          ===================================================== */}

      <button
        type="button"
        className="ccq-cart-button"
        onClick={() => setShowCart(true)}
        aria-label={`My Order - ${cartCount} items`}
      >
        <span>
          My Order
        </span>

        <strong>
          {cartCount}
        </strong>
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


            {/* IMAGE */}

            <div className="ccq-modal-image-wrap">

              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="ccq-modal-image"
              />

            </div>


            {/* DETAILS */}

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

                <span>
                  Pack / Unit:
                </span>

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

                <span>
                  YOUR ORDER
                </span>

                <h2>
                  Order Summary
                </h2>

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


            {/* EMPTY CART */}

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

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      <div className="ccq-cart-item-info">

                        <h3>
                          {item.name}
                        </h3>

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
                                Number(item.quantity) - 1
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
                                Number(item.quantity) + 1
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


            {/* HEADING */}

            <div className="ccq-checkout-heading">

              <span>
                FINAL STEP
              </span>

              <h2>
                Customer Details
              </h2>

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

              {/* CUSTOMER GRID */}

              <div className="ccq-form-grid">

                {/* NAME */}

                <div className="ccq-field">

                  <label htmlFor="cnc-equipment-name">
                    Full Name *
                  </label>

                  <input
                    id="cnc-equipment-name"
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />

                </div>


                {/* PHONE */}

                <div className="ccq-field">

                  <label htmlFor="cnc-equipment-phone">
                    Phone Number *
                  </label>

                  <input
                    id="cnc-equipment-phone"
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


                {/* EMAIL */}

                <div className="ccq-field">

                  <label htmlFor="cnc-equipment-email">
                    Email Address
                  </label>

                  <input
                    id="cnc-equipment-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />

                </div>


                {/* COMPANY */}

                <div className="ccq-field">

                  <label htmlFor="cnc-equipment-company">
                    Company / Organization
                  </label>

                  <input
                    id="cnc-equipment-company"
                    type="text"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />

                </div>

              </div>


              {/* LOCATION */}

              <div className="ccq-field">

                <label htmlFor="cnc-equipment-location">
                  Delivery / Location *
                </label>

                <textarea
                  id="cnc-equipment-location"
                  name="location"
                  value={customer.location}
                  onChange={handleCustomerChange}
                  placeholder="Enter delivery location / address"
                  rows="3"
                  autoComplete="street-address"
                  required
                />

              </div>


              {/* NOTES */}

              <div className="ccq-field">

                <label htmlFor="cnc-equipment-notes">
                  Additional Notes
                </label>

                <textarea
                  id="cnc-equipment-notes"
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

                  <span>
                    Products
                  </span>

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

            <span>
              ORDER RECEIVED
            </span>

            <h2>
              Thank You!
            </h2>

            <p>
              Your order request has been
              submitted successfully.
            </p>


            {/* ORDER ID */}

            <div className="ccq-order-number">

              <small>
                Order ID
              </small>

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

export default ProffessionalEquiment;