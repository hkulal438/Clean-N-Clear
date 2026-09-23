import React, { useEffect, useMemo, useState } from "react";

/*
  IMPORTANT:
  If your structure is:

  Components/
  ├── CleaningChemicals/
  │   ├── CleaningChemicals.jsx
  │   └── CleaningChemicals.css
  │
  └── CleaningTools/
      └── CleaningTools.jsx

  then this is the correct CSS import.
*/
import "../CleaningChemicals/CleaningChemicals.css";

/* =========================================================
   CLEANING TOOLS IMAGES
   ========================================================= */

import AromaToiletBrush from "../../images/CleaningTools/AROMA TOILET BRUSH WITH STAND.jpg";
import JazzSpinMopBucket from "../../images/CleaningTools/JAZZ SPIN MOP BUCKET.jpg";
import MagikSpinMopBucket from "../../images/CleaningTools/MAGIK SPIN MOP BUCKET.jpg";
import Plunger from "../../images/CleaningTools/PLUNGER.jpg";
import SparkleMicrofiberFlatMop from "../../images/CleaningTools/SPARKLE MICROFIBER FLAT MOP.jpg";
import WonderKitchenWiper from "../../images/CleaningTools/WONDER KITCHEN WIPER.jpg";

/* =========================================================
   API
   ========================================================= */

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =========================================================
   PRODUCT DATA
   ========================================================= */

const products = [
  {
    id: "aroma-toilet-brush",
    name: "Aroma Toilet Brush with Stand",
    category: "Cleaning Tools",
    price: 120,
    unit: "Piece",
    image: AromaToiletBrush,
    description:
      "A practical toilet cleaning brush with stand, suitable for regular bathroom cleaning and hygiene requirements.",
  },

  {
    id: "jazz-spin-mop-bucket",
    name: "Jazz Spin Mop Bucket",
    category: "Cleaning Tools",
    price: 850,
    unit: "Set",
    image: JazzSpinMopBucket,
    description:
      "Spin mop and bucket set designed for convenient floor cleaning in homes, offices and other spaces.",
  },

  {
    id: "magik-spin-mop-bucket",
    name: "Magik Spin Mop Bucket",
    category: "Cleaning Tools",
    price: 750,
    unit: "Set",
    image: MagikSpinMopBucket,
    description:
      "Convenient spin mop bucket set suitable for everyday floor cleaning requirements.",
  },

  {
    id: "plunger",
    name: "Plunger",
    category: "Cleaning Tools",
    price: 180,
    unit: "Piece",
    image: Plunger,
    description:
      "Essential cleaning tool suitable for clearing blockages in suitable household and commercial applications.",
  },

  {
    id: "sparkle-microfiber-flat-mop",
    name: "Sparkle Microfiber Flat Mop",
    category: "Cleaning Tools",
    price: 350,
    unit: "Piece",
    image: SparkleMicrofiberFlatMop,
    description:
      "Microfiber flat mop designed for convenient floor cleaning and everyday maintenance.",
  },

  {
    id: "wonder-kitchen-wiper",
    name: "Wonder Kitchen Wiper",
    category: "Cleaning Tools",
    price: 150,
    unit: "Piece",
    image: WonderKitchenWiper,
    description:
      "Kitchen wiper suitable for cleaning and removing water from kitchen surfaces.",
  },
];

/* =========================================================
   COMPONENT
   ========================================================= */

const CleaningTools = () => {
  /* =======================================================
     PRODUCT / CART STATES
     ======================================================= */

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [orderId, setOrderId] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  /* =======================================================
     CUSTOMER DETAILS
     ======================================================= */

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    location: "",
    notes: "",
  });

  /* =======================================================
     ORDERED QUANTITIES
     ======================================================= */

  const [orderedQuantities, setOrderedQuantities] = useState({});

  const [loadingOrderedQuantities, setLoadingOrderedQuantities] =
    useState(false);

  /* =========================================================
     LOAD ORDERED PRODUCT QUANTITIES
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

      /*
        Do not show an error popup here.
        Product ordering can still work even if
        ordered quantity loading fails.
      */
    } finally {
      setLoadingOrderedQuantities(false);
    }
  };

  /* =========================================================
     INITIAL LOAD
     ========================================================= */

  useEffect(() => {
    loadOrderedQuantities();
  }, []);

  /* =========================================================
     BODY SCROLL LOCK FOR MODALS
     ========================================================= */

  useEffect(() => {
    const overlayOpen =
      selectedProduct ||
      showCart ||
      showCheckout ||
      showSuccess;

    if (overlayOpen) {
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
    showSuccess,
  ]);

  /* =========================================================
     FORMAT PRICE
     ========================================================= */

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  /* =========================================================
     ADD PRODUCT TO CART
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
                quantity: item.quantity + 1,
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

    /*
      Close product details after adding.
    */
    setSelectedProduct(null);

    /*
      Open the order/cart drawer immediately.
      This makes the flow clear to the user.
    */
    setShowCart(true);
  };

  /* =========================================================
     OPEN PRODUCT DETAILS
     ========================================================= */

  const openProductDetails = (product) => {
    setError("");
    setSelectedProduct(product);
  };

  /* =========================================================
     UPDATE QUANTITY
     ========================================================= */

  const updateQuantity = (id, quantity) => {
    const newQuantity = Number(quantity);

    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      )
    );
  };

  /* =========================================================
     REMOVE FROM CART
     ========================================================= */

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  /* =========================================================
     CART COUNT
     ========================================================= */

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 0),
      0
    );
  }, [cart]);

  /* =========================================================
     CART TOTAL
     ========================================================= */

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(item.quantity || 0),
      0
    );
  }, [cart]);

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
      return;
    }

    setError("");
    setShowCart(false);
    setShowCheckout(true);
  };

  /* =========================================================
     SUBMIT ORDER
     ========================================================= */

  const submitOrder = async (event) => {
    event.preventDefault();

    setError("");

    /* -------------------------------------------------------
       CHECK CART
       ------------------------------------------------------- */

    if (cart.length === 0) {
      setError(
        "Please add at least one product to your order."
      );
      return;
    }

    /* -------------------------------------------------------
       CHECK REQUIRED CUSTOMER DETAILS
       ------------------------------------------------------- */

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.location.trim()
    ) {
      setError(
        "Please enter your name, phone number and location."
      );
      return;
    }

    try {
      setSubmitting(true);

      /* -----------------------------------------------------
         PREPARE ORDER DATA
         ----------------------------------------------------- */

      const orderData = {
        customer: {
          name: customer.name.trim(),
          phone: customer.phone.trim(),
          email: customer.email.trim(),
          company: customer.company.trim(),
          location: customer.location.trim(),
        },

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          category: item.category,
          price: Number(item.price),
          unit: item.unit,
          quantity: Number(item.quantity),
          subtotal:
            Number(item.price) *
            Number(item.quantity),
        })),

        notes: customer.notes.trim(),

        total: Number(cartTotal),
      };

      /* -----------------------------------------------------
         SEND TO BACKEND
         ----------------------------------------------------- */

      const response = await fetch(
        `${API_URL}/api/order`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderData),
        }
      );

      /* -----------------------------------------------------
         HANDLE NON-JSON RESPONSE SAFELY
         ----------------------------------------------------- */

      const rawResponse = await response.text();

      let data;

      try {
        data = JSON.parse(rawResponse);
      } catch {
        throw new Error(
          "The server returned an invalid response. Please make sure the backend is running."
        );
      }

      /* -----------------------------------------------------
         HANDLE BACKEND ERROR
         ----------------------------------------------------- */

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to submit your order."
        );
      }

      /* -----------------------------------------------------
         SUCCESS
         ----------------------------------------------------- */

      setOrderId(data.orderId || "");

      setCart([]);

      setCustomer({
        name: "",
        phone: "",
        email: "",
        company: "",
        location: "",
        notes: "",
      });

      setShowCheckout(false);

      setShowCart(false);

      setShowSuccess(true);

      /* -----------------------------------------------------
         REFRESH ORDERED QUANTITIES
         ----------------------------------------------------- */

      await loadOrderedQuantities();
    } catch (error) {
      console.error(
        "ORDER SUBMISSION ERROR:",
        error
      );

      setError(
        error.message ||
          "Unable to submit your order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* =========================================================
     CLOSE ALL MODALS
     ========================================================= */

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  const closeCart = () => {
    setShowCart(false);
  };

  const closeCheckout = () => {
    if (!submitting) {
      setShowCheckout(false);
      setError("");
    }
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    setOrderId("");
  };

  /* =========================================================
     RENDER
     ========================================================= */

  return (
    <section className="ccq-section">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="ccq-header">

        <span className="ccq-label">
          CLEANING TOOLS
        </span>

        <h1 className="ccq-title">
          Professional Cleaning Tools
        </h1>

        <p className="ccq-intro">
          Explore our range of cleaning tools for
          household, commercial and institutional
          cleaning requirements.
        </p>

      </div>

      {/* =====================================================
          MY ORDER BUTTON
          ===================================================== */}

      <button
        type="button"
        className="ccq-cart-button"
        onClick={() => {
          setError("");
          setShowCart(true);
        }}
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

              {/* PRODUCT IMAGE */}

              <button
                type="button"
                className="ccq-image-button"
                onClick={() =>
                  openProductDetails(product)
                }
                aria-label={`View ${product.name} details`}
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="ccq-product-image"
                />

              </button>

              {/* PRODUCT CONTENT */}

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
                  Per {product.unit}
                </div>

                {/* ORDERED QUANTITY */}

                {orderedQuantity > 0 && (
                  <div className="ccq-ordered">
                    Ordered: {orderedQuantity}
                  </div>
                )}

                {/* =================================================
                    IMPORTANT:
                    ORDER BUTTON NOW OPENS PRODUCT DETAILS
                    ================================================= */}

                <button
                  type="button"
                  className="ccq-add-button"
                  onClick={() =>
                    openProductDetails(product)
                  }
                >
                  Order
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
          onClick={closeProductDetails}
        >

          <div
            className="ccq-product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="ccq-close"
              onClick={closeProductDetails}
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

              {/* ADD TO ORDER */}

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
          CART / ORDER DRAWER
          ===================================================== */}

      {showCart && (

        <div
          className="ccq-overlay"
          onClick={closeCart}
        >

          <aside
            className="ccq-cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
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
                aria-label="Close order"
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
                          {formatPrice(item.price)}
                        </span>

                        <div className="ccq-quantity">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            aria-label="Decrease quantity"
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
                                item.quantity + 1
                              )
                            }
                            aria-label="Increase quantity"
                          >
                            +
                          </button>

                        </div>

                      </div>

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

                  <p className="ccq-payment-note">
                    No payment is required online.
                    Your order will be sent to our
                    team for confirmation.
                  </p>

                  <button
                    type="button"
                    className="ccq-checkout-button"
                    onClick={openCheckout}
                  >
                    Continue to Order
                  </button>

                </div>

              </>

            )}

          </aside>

        </div>

      )}

      {/* =====================================================
          CUSTOMER CHECKOUT MODAL
          ===================================================== */}

      {showCheckout && (

        <div className="ccq-overlay">

          <div
            className="ccq-checkout"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              className="ccq-close"
              onClick={closeCheckout}
              disabled={submitting}
              aria-label="Close checkout"
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
                Enter your details and submit your
                order request. No online payment
                is required.
              </p>

            </div>

            {/* ERROR */}

            {error && (

              <div
                className="ccq-error"
                role="alert"
              >
                {error}
              </div>

            )}

            {/* FORM */}

            <form
              className="ccq-form"
              onSubmit={submitOrder}
            >

              <div className="ccq-form-grid">

                {/* NAME */}

                <div className="ccq-field">

                  <label htmlFor="ccq-name">
                    Full Name *
                  </label>

                  <input
                    id="ccq-name"
                    type="text"
                    name="name"
                    value={customer.name}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Enter your full name"
                    required
                  />

                </div>

                {/* PHONE */}

                <div className="ccq-field">

                  <label htmlFor="ccq-phone">
                    Phone Number *
                  </label>

                  <input
                    id="ccq-phone"
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Enter your phone number"
                    required
                  />

                </div>

                {/* EMAIL */}

                <div className="ccq-field">

                  <label htmlFor="ccq-email">
                    Email Address
                  </label>

                  <input
                    id="ccq-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Enter your email"
                  />

                </div>

                {/* COMPANY */}

                <div className="ccq-field">

                  <label htmlFor="ccq-company">
                    Company / Organization
                  </label>

                  <input
                    id="ccq-company"
                    type="text"
                    name="company"
                    value={customer.company}
                    onChange={
                      handleCustomerChange
                    }
                    placeholder="Company name"
                  />

                </div>

              </div>

              {/* LOCATION */}

              <div className="ccq-field">

                <label htmlFor="ccq-location">
                  Delivery / Location *
                </label>

                <textarea
                  id="ccq-location"
                  name="location"
                  value={customer.location}
                  onChange={
                    handleCustomerChange
                  }
                  placeholder="Enter delivery location / address"
                  rows="3"
                  required
                />

              </div>

              {/* NOTES */}

              <div className="ccq-field">

                <label htmlFor="ccq-notes">
                  Additional Notes
                </label>

                <textarea
                  id="ccq-notes"
                  name="notes"
                  value={customer.notes}
                  onChange={
                    handleCustomerChange
                  }
                  placeholder="Any additional requirements..."
                  rows="3"
                />

              </div>

              {/* ORDER TOTAL */}

              <div className="ccq-checkout-total">

                <span>
                  Order Total
                </span>

                <strong>
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </strong>

              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="ccq-submit"
                disabled={submitting}
              >
                {submitting
                  ? "Submitting Order..."
                  : "Submit Order"}
              </button>

            </form>

          </div>

        </div>

      )}

      {/* =====================================================
          SUCCESS MODAL
          ===================================================== */}

      {showSuccess && (

        <div className="ccq-overlay">

          <div className="ccq-success">

            <div className="ccq-success-icon">
              ✓
            </div>

            <span className="ccq-success-label">
              ORDER RECEIVED
            </span>

            <h2>
              Thank You!
            </h2>

            <p>
              Your order request has been
              successfully submitted.
            </p>

            {orderId && (

              <div className="ccq-order-id">

                <span>
                  Order Number
                </span>

                <strong>
                  {orderId}
                </strong>

              </div>

            )}

            <p className="ccq-success-note">
              Our team will contact you to
              confirm the order and further
              details.
            </p>

            <button
              type="button"
              className="ccq-submit"
              onClick={closeSuccess}
            >
              Done
            </button>

          </div>

        </div>

      )}

    </section>
  );
};

export default CleaningTools;