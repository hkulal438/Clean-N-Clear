import React, { useEffect, useMemo, useState } from "react";
import "./CleaningChemicals.css";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

import AromaToiletBrush from "../../images/CleaningTools/AROMA TOILET BRUSH WITH STAND.jpg";
import JazzSpinMopBucket from "../../images/CleaningTools/JAZZ SPIN MOP BUCKET.jpg";
import MagikSpinMopBucket from "../../images/CleaningTools/MAGIK SPIN MOP BUCKET.jpg";
import Plunger from "../../images/CleaningTools/PLUNGER.jpg";
import SparkleMicrofiberFlatMop from "../../images/CleaningTools/SPARKLE MICROFIBER FLAT MOP.jpg";
import WonderKitchenWiper from "../../images/CleaningTools/WONDER KITCHEN WIPER.jpg";

// ======================================================
// API
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ======================================================
// PRODUCTS
// ======================================================

const products = [
  {
    id: "aroma-toilet-brush",
    name: "Aroma Toilet Brush with Stand",
    price: 120,
    unit: "Piece",
    image: AromaToiletBrush,
  },
  {
    id: "jazz-spin-mop-bucket",
    name: "Jazz Spin Mop Bucket",
    price: 850,
    unit: "Set",
    image: JazzSpinMopBucket,
  },
  {
    id: "magik-spin-mop-bucket",
    name: "Magik Spin Mop Bucket",
    price: 750,
    unit: "Set",
    image: MagikSpinMopBucket,
  },
  {
    id: "plunger",
    name: "Plunger",
    price: 180,
    unit: "Piece",
    image: Plunger,
  },
  {
    id: "sparkle-microfiber-flat-mop",
    name: "Sparkle Microfiber Flat Mop",
    price: 350,
    unit: "Piece",
    image: SparkleMicrofiberFlatMop,
  },
  {
    id: "wonder-kitchen-wiper",
    name: "Wonder Kitchen Wiper",
    price: 150,
    unit: "Piece",
    image: WonderKitchenWiper,
  },
];

// ======================================================
// EMPTY CUSTOMER
// ======================================================

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

// ======================================================
// COMPONENT
// ======================================================

const CleaningTools = () => {
  // ====================================================
  // SHARED CART
  // ====================================================

  const [cart, setCart] = useState(() => getOrderCart());

  // ====================================================
  // MODALS
  // ====================================================

  const [showProduct, setShowProduct] = useState(null);
  const [showOrder, setShowOrder] = useState(false);

  // ====================================================
  // CUSTOMER
  // ====================================================

  const [customer, setCustomer] = useState({
    ...emptyCustomer,
  });

  // ====================================================
  // ORDER STATES
  // ====================================================

  const [submitting, setSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // ====================================================
  // ORDERED PRODUCT QUANTITIES
  // ====================================================

  const [orderedQuantities, setOrderedQuantities] = useState({});

  // ====================================================
  // SYNC SHARED CART
  // ====================================================

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  // ====================================================
  // BODY SCROLL LOCK
  // ====================================================

  useEffect(() => {
    const shouldLock =
      Boolean(showProduct) ||
      showOrder ||
      Boolean(successOrder);

    document.body.style.overflow = shouldLock
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [showProduct, showOrder, successOrder]);

  // ====================================================
  // LOAD ORDERED QUANTITIES
  // ====================================================

  useEffect(() => {
    const loadOrderedQuantities = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/product-order-quantities`
        );

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (data?.success && data?.quantities) {
          setOrderedQuantities(data.quantities);
        }
      } catch (error) {
        console.error(
          "Unable to load ordered quantities:",
          error
        );
      }
    };

    loadOrderedQuantities();
  }, []);

  // ====================================================
  // CART COUNT
  // ====================================================

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item?.quantity || 0),
      0
    );
  }, [cart]);

  // ====================================================
  // CART TOTAL
  // ====================================================

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item?.price || 0) *
          Number(item?.quantity || 0),
      0
    );
  }, [cart]);

  // ====================================================
  // ADD PRODUCT TO ORDER
  // ====================================================

  const addToCart = (product) => {
    setErrorMessage("");

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
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
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          unit: product.unit,
          image: product.image,
          quantity: 1,
        },
      ];
    });

    setShowProduct(null);
    setShowOrder(true);
  };

  // ====================================================
  // UPDATE QUANTITY
  // ====================================================

  const updateQuantity = (productId, change) => {
    setCart((currentCart) =>
      currentCart
        .map((item) => {
          if (item.id !== productId) {
            return item;
          }

          const newQuantity =
            Number(item.quantity || 0) + change;

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter(
          (item) =>
            Number(item.quantity || 0) > 0
        )
    );
  };

  // ====================================================
  // REMOVE PRODUCT
  // ====================================================

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) => item.id !== productId
      )
    );
  };

  // ====================================================
  // CUSTOMER FORM
  // ====================================================

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  // ====================================================
  // PHONE VALIDATION
  // ====================================================

  const isValidPhone = (phone) => {
    const cleaned = phone.replace(/\s+/g, "");

    return /^[+]?[0-9]{10,15}$/.test(cleaned);
  };

  // ====================================================
  // EMAIL VALIDATION
  // ====================================================

  const isValidEmail = (email) => {
    if (!email.trim()) {
      return true;
    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      email.trim()
    );
  };

  // ====================================================
  // SUBMIT ORDER
  // ====================================================

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setErrorMessage("");

    // ----------------------------------------------
    // CART VALIDATION
    // ----------------------------------------------

    if (cart.length === 0) {
      setErrorMessage(
        "Please add at least one product to your order."
      );
      return;
    }

    // ----------------------------------------------
    // NAME
    // ----------------------------------------------

    if (!customer.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    // ----------------------------------------------
    // PHONE
    // ----------------------------------------------

    if (!customer.phone.trim()) {
      setErrorMessage(
        "Please enter your phone number."
      );
      return;
    }

    if (!isValidPhone(customer.phone)) {
      setErrorMessage(
        "Please enter a valid phone number."
      );
      return;
    }

    // ----------------------------------------------
    // LOCATION
    // ----------------------------------------------

    if (!customer.location.trim()) {
      setErrorMessage(
        "Please enter your location."
      );
      return;
    }

    // ----------------------------------------------
    // EMAIL
    // ----------------------------------------------

    if (!isValidEmail(customer.email)) {
      setErrorMessage(
        "Please enter a valid email address."
      );
      return;
    }

    // ----------------------------------------------
    // SUBMIT
    // ----------------------------------------------

    setSubmitting(true);

    try {
      const orderItems = cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        unit: item.unit,
        quantity: Number(item.quantity),
        subtotal:
          Number(item.price) *
          Number(item.quantity),
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
              name: customer.name.trim(),
              phone: customer.phone.trim(),
              email: customer.email.trim(),
              company: customer.company.trim(),
              location: customer.location.trim(),
            },
            items: orderItems,
            notes: customer.notes.trim(),
          }),
        }
      );

      const responseText =
        await response.text();

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          data = {
            message: responseText,
          };
        }
      }

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message ||
            "Unable to submit your order."
        );
      }

      // --------------------------------------------
      // SUCCESS
      // --------------------------------------------

      setSuccessOrder(data.order || data);

      setCart([]);

      setCustomer({
        ...emptyCustomer,
      });

      setShowOrder(false);

      setErrorMessage("");

      // --------------------------------------------
      // REFRESH ORDERED QUANTITIES
      // --------------------------------------------

      try {
        const quantityResponse =
          await fetch(
            `${API_URL}/api/product-order-quantities`
          );

        if (quantityResponse.ok) {
          const quantityData =
            await quantityResponse.json();

          if (
            quantityData?.success &&
            quantityData?.quantities
          ) {
            setOrderedQuantities(
              quantityData.quantities
            );
          }
        }
      } catch (quantityError) {
        console.error(
          "Unable to refresh quantities:",
          quantityError
        );
      }
    } catch (error) {
      console.error(
        "ORDER SUBMISSION ERROR:",
        error
      );

      setErrorMessage(
        error?.message ||
          "Something went wrong while submitting your order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ====================================================
  // CLOSE SUCCESS
  // ====================================================

  const closeSuccess = () => {
    setSuccessOrder(null);
    setErrorMessage("");
  };

  // ====================================================
  // FORMAT PRICE
  // ====================================================

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(price) || 0);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <main className="ccq-section">

      {/* =================================================
          HEADER
      ================================================= */}

      <header className="ccq-header">

        <span className="ccq-label">
          CLEAN N CLEAR
        </span>

        <h1 className="ccq-title">
          Cleaning Tools &amp;{" "}
          <span>Accessories</span>
        </h1>

        <p className="ccq-intro">
          Reliable cleaning tools designed for
          household, commercial and institutional
          cleaning requirements.
        </p>

      </header>

      {/* =================================================
          CART BUTTON
      ================================================= */}

      {cartCount > 0 && (
        <button
          type="button"
          className="ccq-cart-button"
          onClick={() => {
            setErrorMessage("");
            setShowOrder(true);
          }}
        >
          <span>My Order</span>

          <strong>{cartCount}</strong>
        </button>
      )}

      {/* =================================================
          PRODUCT GRID
      ================================================= */}

      <div className="ccq-grid">

        {products.map((product) => {
          const ordered = Number(
            orderedQuantities[product.id] || 0
          );

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
                  setShowProduct(product)
                }
                aria-label={`View ${product.name}`}
              >
                <img
                  className="ccq-product-image"
                  src={product.image}
                  alt={product.name}
                />
              </button>

              {/* PRODUCT CONTENT */}

              <div className="ccq-card-content">

                <span className="ccq-category">
                  Cleaning Tools
                </span>

                <h2 className="ccq-product-name">
                  {product.name}
                </h2>

                <div className="ccq-price">
                  {formatPrice(product.price)}

                  <span>
                    {" "}
                    / {product.unit}
                  </span>
                </div>

                {ordered > 0 && (
                  <div className="ccq-product-ordered">
                    <span>
                      Ordered
                    </span>

                    <strong>
                      {ordered}
                    </strong>
                  </div>
                )}

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

      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {showProduct && (
        <div
          className="ccq-overlay"
          onClick={() => setShowProduct(null)}
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
              onClick={() =>
                setShowProduct(null)
              }
              aria-label="Close product"
            >
              ×
            </button>

            {/* IMAGE */}

            <div className="ccq-modal-image-wrap">
              <img
                className="ccq-modal-image"
                src={showProduct.image}
                alt={showProduct.name}
              />
            </div>

            {/* CONTENT */}

            <div className="ccq-modal-content">

              <span className="ccq-label">
                CLEAN N CLEAR
              </span>

              <h2>
                {showProduct.name}
              </h2>

              <div className="ccq-modal-price">
                {formatPrice(
                  showProduct.price
                )}
              </div>

              <div className="ccq-modal-unit">
                <span>
                  Unit
                </span>

                <strong>
                  {showProduct.unit}
                </strong>
              </div>

              <button
                type="button"
                className="ccq-add-large"
                onClick={() =>
                  addToCart(showProduct)
                }
              >
                Add to Order
              </button>

            </div>

          </div>
        </div>
      )}

      {/* =================================================
          ORDER / CHECKOUT MODAL
      ================================================= */}

      {showOrder && (
        <div
          className="ccq-overlay"
          onClick={() => setShowOrder(false)}
        >

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
              onClick={() =>
                setShowOrder(false)
              }
              aria-label="Close order"
            >
              ×
            </button>

            {/* =================================================
                CHECKOUT HEADING
            ================================================= */}

            <div className="ccq-checkout-heading">

              <span>
                CLEAN N CLEAR
              </span>

              <h2>
                My Order
              </h2>

              <p>
                Review your selected products
                and submit your enquiry.
              </p>

            </div>

            {/* =================================================
                CART ITEMS
            ================================================= */}

            <div className="ccq-cart-items">

              {cart.length === 0 ? (
                <div className="ccq-empty">

                  <div className="ccq-empty-icon">
                    🛒
                  </div>

                  <h3>
                    Your order is empty
                  </h3>

                  <p>
                    Add products from the
                    catalogue to continue.
                  </p>

                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="ccq-cart-item"
                    key={item.id}
                  >

                    {/* IMAGE */}

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    {/* INFO */}

                    <div className="ccq-cart-item-info">

                      <h3>
                        {item.name}
                      </h3>

                      <span>
                        {formatPrice(item.price)}
                      </span>

                      <small>
                        / {item.unit}
                      </small>

                      <div className="ccq-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.id,
                              -1
                            )
                          }
                          aria-label={`Decrease ${item.name}`}
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
                              1
                            )
                          }
                          aria-label={`Increase ${item.name}`}
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
                ))
              )}

            </div>

            {/* =================================================
                TOTAL
            ================================================= */}

            {cart.length > 0 && (
              <>
                <div className="ccq-final-summary">

                  <div>
                    <span>
                      Items
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
                      {formatPrice(cartTotal)}
                    </strong>
                  </div>

                </div>

                {/* =================================================
                    CUSTOMER FORM
                ================================================= */}

                <form
                  className="ccq-form"
                  onSubmit={handleSubmitOrder}
                >

                  {/* FORM GRID */}

                  <div className="ccq-form-grid">

                    {/* NAME */}

                    <div className="ccq-field">
                      <label htmlFor="tools-name">
                        Name *
                      </label>

                      <input
                        id="tools-name"
                        type="text"
                        name="name"
                        value={customer.name}
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    {/* PHONE */}

                    <div className="ccq-field">
                      <label htmlFor="tools-phone">
                        Phone Number *
                      </label>

                      <input
                        id="tools-phone"
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                    {/* EMAIL */}

                    <div className="ccq-field">
                      <label htmlFor="tools-email">
                        Email
                      </label>

                      <input
                        id="tools-email"
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Enter email address"
                      />
                    </div>

                    {/* COMPANY */}

                    <div className="ccq-field">
                      <label htmlFor="tools-company">
                        Company
                      </label>

                      <input
                        id="tools-company"
                        type="text"
                        name="company"
                        value={customer.company}
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Company name"
                      />
                    </div>

                    {/* LOCATION */}

                    <div className="ccq-field">
                      <label htmlFor="tools-location">
                        Location *
                      </label>

                      <input
                        id="tools-location"
                        type="text"
                        name="location"
                        value={customer.location}
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="City / Location"
                        required
                      />
                    </div>

                    {/* NOTES */}

                    <div className="ccq-field">
                      <label htmlFor="tools-notes">
                        Additional Requirements
                      </label>

                      <textarea
                        id="tools-notes"
                        name="notes"
                        value={customer.notes}
                        onChange={
                          handleCustomerChange
                        }
                        placeholder="Tell us about your requirement..."
                        rows="4"
                      />
                    </div>

                  </div>

                  {/* ERROR */}

                  {errorMessage && (
                    <div className="ccq-error">
                      {errorMessage}
                    </div>
                  )}

                  {/* NO PAYMENT */}

                  <div className="ccq-no-payment">

                    <strong>
                      No online payment required
                    </strong>

                    <span>
                      Final pricing, availability
                      and delivery details will be
                      confirmed by our team.
                    </span>

                  </div>

                  {/* FORM ACTIONS */}

                  <div className="ccq-form-actions">

                    <button
                      type="button"
                      className="ccq-back-button"
                      onClick={() =>
                        setShowOrder(false)
                      }
                    >
                      Continue Shopping
                    </button>

                    <button
                      type="submit"
                      className="ccq-submit"
                      disabled={submitting}
                    >
                      {submitting
                        ? "Submitting..."
                        : "Submit Order"}
                    </button>

                  </div>

                </form>
              </>
            )}

          </div>
        </div>
      )}

      {/* =================================================
          SUCCESS MODAL
      ================================================= */}

      {successOrder && (
        <div className="ccq-overlay">

          <div className="ccq-success">

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
              Your order has been submitted
              successfully. Our team will review
              your requirement and contact you
              shortly.
            </p>

            {(successOrder?.id ||
              successOrder?.orderId) && (
              <div className="ccq-order-number">

                <small>
                  Order Number
                </small>

                <strong>
                  {successOrder.id ||
                    successOrder.orderId}
                </strong>

              </div>
            )}

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

    </main>
  );
};

export default CleaningTools;