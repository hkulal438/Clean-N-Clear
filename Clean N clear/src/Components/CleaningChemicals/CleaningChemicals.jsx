import React, { useEffect, useMemo, useState } from "react";
import "./CleaningChemicals.css";

// ======================================================
// PRODUCT IMAGES
// ======================================================

import BachelorSurvivalKit from "../../images/CleaningChemicals/Bachelor Survival Kit.webp";
import CarpetProCleaner from "../../images/CleaningChemicals/CarpetPro Cleaner iCapsol RM 768, 10l.jpg";
import DetergentPowder from "../../images/CleaningChemicals/Detergent Powder.webp";
import DishwashGel from "../../images/CleaningChemicals/Dishwash Gel 500ml X 4.webp";
import LavenderfreshFloorCleaner from "../../images/CleaningChemicals/Lavenderfresh Floor Cleaner 1L X 4.webp";
import MultiPurposeCleaner from "../../images/CleaningChemicals/Multi Purpose Cleaner.webp";
import PressureProAcidic from "../../images/CleaningChemicals/PressurePro Active Cleaner, acidic RM 25, 10l.jpg";
import PressureProNeutral from "../../images/CleaningChemicals/PressurePro Active Cleaner, neutral RM 55, 10l.jpg";
import PressureProOilGrease from "../../images/CleaningChemicals/PressurePro Oil and Grease Cleaner Extra RM 31, 200l.jpg";
import StainRemover from "../../images/CleaningChemicals/Stain Remover.webp";
import TaskiSani from "../../images/CleaningChemicals/TASKI Sani 100 Pur-Eco W1b 6x0.75L - Sanitary cleaner in Diversey AceCare.jpg";
import ToiletCleaner from "../../images/CleaningChemicals/Toilet Cleaner Liquid (Reva Bio Clean).webp";

// ======================================================
// API
// ======================================================

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ======================================================
// PRODUCTS
// IMPORTANT:
// IDs MUST MATCH BACKEND PRODUCT IDs
// ======================================================

const products = [
  {
    id: "bachelor-survival-kit",
    name: "Bachelor Survival Kit",
    category: "Cleaning Chemicals",
    description:
      "A practical cleaning kit suitable for everyday household and bachelor cleaning requirements.",
    price: 499,
    unit: "Kit",
    image: BachelorSurvivalKit,
  },

  {
    id: "carpetpro-cleaner",
    name: "CarpetPro Cleaner iCapsol RM 768",
    category: "Carpet Cleaner",
    description:
      "Professional carpet cleaning solution designed for effective carpet and textile cleaning.",
    price: 2850,
    unit: "10 L",
    image: CarpetProCleaner,
  },

  {
    id: "detergent-powder",
    name: "Detergent Powder",
    category: "Laundry Cleaning",
    description:
      "Effective detergent powder suitable for regular cleaning and washing requirements.",
    price: 180,
    unit: "Pack",
    image: DetergentPowder,
  },

  {
    id: "dishwash-gel",
    name: "Dishwash Gel 500ml X 4",
    category: "Kitchen Cleaning",
    description:
      "Dishwashing gel suitable for cleaning utensils and kitchen surfaces.",
    price: 320,
    unit: "Pack",
    image: DishwashGel,
  },

  {
    id: "lavenderfresh-floor-cleaner",
    name: "Lavenderfresh Floor Cleaner 1L X 4",
    category: "Floor Cleaning",
    description:
      "Floor cleaning solution with a lavender fragrance for everyday cleaning.",
    price: 480,
    unit: "Pack",
    image: LavenderfreshFloorCleaner,
  },

  {
    id: "multi-purpose-cleaner",
    name: "Multi Purpose Cleaner",
    category: "Surface Cleaning",
    description:
      "Versatile cleaning solution for a variety of common surfaces.",
    price: 275,
    unit: "Unit",
    image: MultiPurposeCleaner,
  },

  {
    id: "pressurepro-acidic",
    name: "PressurePro Active Cleaner - Acidic RM 25",
    category: "Professional Cleaning",
    description:
      "Professional acidic cleaner intended for suitable heavy-duty cleaning applications.",
    price: 2200,
    unit: "10 L",
    image: PressureProAcidic,
  },

  {
    id: "pressurepro-neutral",
    name: "PressurePro Active Cleaner - Neutral RM 55",
    category: "Professional Cleaning",
    description:
      "Professional neutral cleaning solution for suitable cleaning applications.",
    price: 2350,
    unit: "10 L",
    image: PressureProNeutral,
  },

  {
    id: "pressurepro-oil-grease",
    name: "PressurePro Oil and Grease Cleaner Extra RM 31",
    category: "Heavy Duty Cleaning",
    description:
      "Professional cleaner intended for oil and grease cleaning requirements.",
    price: 28500,
    unit: "200 L",
    image: PressureProOilGrease,
  },

  {
    id: "stain-remover",
    name: "Stain Remover",
    category: "Stain Cleaning",
    description:
      "Cleaning solution designed for suitable stain removal applications.",
    price: 350,
    unit: "Unit",
    image: StainRemover,
  },

  {
    id: "taski-sani-100",
    name: "TASKI Sani 100 Pur-Eco W1b",
    category: "Sanitary Cleaning",
    description:
      "Sanitary cleaning product suitable for professional cleaning requirements.",
    price: 1650,
    unit: "6 x 0.75 L",
    image: TaskiSani,
  },

  {
    id: "toilet-cleaner",
    name: "Toilet Cleaner Liquid - Reva Bio Clean",
    category: "Bathroom Cleaning",
    description:
      "Liquid toilet cleaner for suitable bathroom and sanitary cleaning requirements.",
    price: 240,
    unit: "Unit",
    image: ToiletCleaner,
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

const CleaningChemicals = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);

  const [orderId, setOrderId] = useState("");

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  const [customer, setCustomer] = useState(emptyCustomer);

  // ====================================================
  // BODY SCROLL LOCK
  // ====================================================

  useEffect(() => {
    const shouldLock =
      selectedProduct ||
      showCart ||
      showCheckout ||
      showSuccess;

    if (shouldLock) {
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

  // ====================================================
  // CART COUNT
  // ====================================================

  const cartCount = useMemo(() => {
    return cart.reduce(
      (total, item) => total + item.quantity,
      0
    );
  }, [cart]);

  // ====================================================
  // CART TOTAL
  // ====================================================

  const cartTotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total + Number(item.price) * Number(item.quantity),
      0
    );
  }, [cart]);

  // ====================================================
  // ADD TO ORDER
  // ====================================================

  const addToOrder = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    setSelectedProduct(null);
    setError("");
    setShowCart(true);
  };

  // ====================================================
  // OPEN PRODUCT
  // ====================================================

  const openProduct = (product) => {
    setSelectedProduct(product);
    setError("");
  };

  // ====================================================
  // CLOSE PRODUCT
  // ====================================================

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  // ====================================================
  // OPEN CART
  // ====================================================

  const openCart = () => {
    setError("");
    setShowCart(true);
  };

  // ====================================================
  // CLOSE CART
  // ====================================================

  const closeCart = () => {
    setShowCart(false);
  };

  // ====================================================
  // INCREASE QUANTITY
  // ====================================================

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ====================================================
  // DECREASE QUANTITY
  // ====================================================

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ====================================================
  // REMOVE ITEM
  // ====================================================

  const removeItem = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // ====================================================
  // GO TO CHECKOUT
  // ====================================================

  const goToCheckout = () => {
    if (cart.length === 0) {
      setError("Please add at least one product to your order.");
      return;
    }

    setError("");
    setShowCart(false);
    setShowCheckout(true);
  };

  // ====================================================
  // BACK TO ORDER
  // ====================================================

  const backToOrder = () => {
    setShowCheckout(false);
    setShowCart(true);
    setError("");
  };

  // ====================================================
  // CUSTOMER INPUT
  // ====================================================

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((currentCustomer) => ({
      ...currentCustomer,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ====================================================
  // VALIDATE CUSTOMER
  // ====================================================

  const validateCustomer = () => {
    if (!customer.name.trim()) {
      return "Please enter your name.";
    }

    if (!customer.phone.trim()) {
      return "Please enter your phone number.";
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(customer.phone.trim())) {
      return "Please enter a valid phone number.";
    }

    if (!customer.location.trim()) {
      return "Please enter your location.";
    }

    if (customer.email.trim()) {
      const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(customer.email.trim())) {
        return "Please enter a valid email address.";
      }
    }

    if (cart.length === 0) {
      return "Your order is empty.";
    }

    return "";
  };

  // ====================================================
  // SUBMIT ORDER
  // ====================================================

  const submitOrder = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    setError("");

    // ----------------------------------------------
    // VALIDATION
    // ----------------------------------------------

    const validationError = validateCustomer();

    if (validationError) {
      setError(validationError);
      return;
    }

    // ----------------------------------------------
    // PREPARE ORDER DATA
    // ----------------------------------------------

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

    console.log(
      "======================================"
    );

    console.log("SENDING ORDER TO BACKEND");

    console.log(
      "API:",
      `${API_URL}/api/order`
    );

    console.log(
      "ORDER DATA:",
      orderData
    );

    console.log(
      "======================================"
    );

    // ----------------------------------------------
    // START SUBMITTING
    // ----------------------------------------------

    setSubmitting(true);

    try {
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

      // --------------------------------------------
      // GET RAW RESPONSE
      // --------------------------------------------

      const responseText =
        await response.text();

      console.log(
        "Backend HTTP status:",
        response.status
      );

      console.log(
        "Backend raw response:",
        responseText
      );

      // --------------------------------------------
      // PARSE RESPONSE
      // --------------------------------------------

      let data = {};

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error(
            "Could not parse backend response:",
            parseError
          );

          data = {
            message: responseText,
          };
        }
      }

      console.log(
        "Backend parsed response:",
        data
      );

      // --------------------------------------------
      // HTTP ERROR
      // --------------------------------------------

      if (!response.ok) {
        throw new Error(
          data.message ||
            `Server returned HTTP ${response.status}`
        );
      }

      // --------------------------------------------
      // API ERROR
      // --------------------------------------------

      if (!data.success) {
        throw new Error(
          data.message ||
            "Order submission failed."
        );
      }

      // --------------------------------------------
      // SUCCESS
      // --------------------------------------------

      const newOrderId =
        data.orderId || "CNC-ORDER";

      setOrderId(newOrderId);

      setCart([]);

      setCustomer(emptyCustomer);

      setShowCheckout(false);

      setShowCart(false);

      setShowSuccess(true);

      setError("");

      console.log(
        "ORDER SUBMITTED SUCCESSFULLY:",
        newOrderId
      );
    } catch (submissionError) {
      console.error(
        "======================================"
      );

      console.error(
        "ORDER SUBMISSION ERROR"
      );

      console.error(
        submissionError
      );

      console.error(
        "======================================"
      );

      setError(
        submissionError?.message ||
          "Unable to submit the order. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ====================================================
  // CLOSE SUCCESS
  // ====================================================

  const closeSuccess = () => {
    setShowSuccess(false);
    setOrderId("");
    setError("");
  };

  // ====================================================
  // FORMAT PRICE
  // ====================================================

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <section className="ccq-section">

      {/* ==================================================
          HEADER
          ================================================== */}

      <div className="ccq-header">

        <span className="ccq-label">
          CLEANING CHEMICALS
        </span>

        <h1 className="ccq-title">
          Professional Cleaning Chemicals
        </h1>

        <p className="ccq-intro">
          Explore our range of cleaning chemicals
          suitable for household, commercial and
          professional cleaning requirements.
        </p>

        {/* ==================================================
            CART BUTTON
            ================================================== */}

        <button
          type="button"
          className="ccq-cart-button"
          onClick={openCart}
        >
          Order Cart

          {cartCount > 0 && (
            <span className="ccq-cart-count">
              {cartCount}
            </span>
          )}
        </button>

      </div>


      {/* ==================================================
          PRODUCT GRID
          ================================================== */}

      <div className="ccq-grid">

        {products.map((product) => (
          <article
            className="ccq-card"
            key={product.id}
          >

            <button
              type="button"
              className="ccq-image-button"
              onClick={() => openProduct(product)}
              aria-label={`View ${product.name}`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="ccq-product-image"
              />
            </button>

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

              <button
                type="button"
                className="ccq-add-button"
                onClick={() =>
                  addToOrder(product)
                }
              >
                Add to Order
              </button>

            </div>

          </article>
        ))}

      </div>


      {/* ==================================================
          PRODUCT MODAL
          ================================================== */}

      {selectedProduct && (
        <div
          className="ccq-overlay"
          onClick={closeProduct}
        >

          <div
            className="ccq-product-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <button
              type="button"
              className="ccq-close"
              onClick={closeProduct}
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

              <h2>
                {selectedProduct.name}
              </h2>

              <p>
                {selectedProduct.description}
              </p>

              <div className="ccq-modal-price">
                {formatPrice(
                  selectedProduct.price
                )}
              </div>

              <div className="ccq-modal-unit">
                Per {selectedProduct.unit}
              </div>

              <button
                type="button"
                className="ccq-add-large"
                onClick={() =>
                  addToOrder(selectedProduct)
                }
              >
                Add to Order
              </button>

            </div>

          </div>

        </div>
      )}


      {/* ==================================================
          CART DRAWER
          ================================================== */}

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

            <div className="ccq-cart-header">

              <div>
                <span className="ccq-label">
                  YOUR ORDER
                </span>

                <h2>
                  Order Cart
                </h2>
              </div>

              <button
                type="button"
                className="ccq-close"
                onClick={closeCart}
                aria-label="Close cart"
              >
                ×
              </button>

            </div>


            {/* ==================================================
                CART ITEMS
                ================================================== */}

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
                    Add products to your order
                    to continue.
                  </p>

                </div>
              ) : (
                cart.map((item) => (
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

                      <strong>
                        {formatPrice(
                          item.price *
                            item.quantity
                        )}
                      </strong>

                      <div className="ccq-quantity">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >
                          +
                        </button>

                      </div>

                      <button
                        type="button"
                        className="ccq-remove"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>
                ))
              )}

            </div>


            {/* ==================================================
                CART FOOTER
                ================================================== */}

            {cart.length > 0 && (
              <div className="ccq-cart-footer">

                <div className="ccq-total">

                  <span>
                    Estimated Total
                  </span>

                  <strong>
                    {formatPrice(cartTotal)}
                  </strong>

                </div>

                <p className="ccq-payment-note">
                  No online payment is required.
                  Final pricing, availability and
                  delivery details will be confirmed
                  by our team.
                </p>

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


      {/* ==================================================
          CHECKOUT / CUSTOMER DETAILS
          ================================================== */}

      {showCheckout && (
        <div className="ccq-overlay">

          <div className="ccq-checkout">

            <button
              type="button"
              className="ccq-close"
              onClick={backToOrder}
              aria-label="Close"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">

              <span className="ccq-label">
                CUSTOMER DETAILS
              </span>

              <h2>
                Submit Your Order
              </h2>

              <p>
                Please provide your details so
                our team can review your order.
              </p>

            </div>


            {/* ==================================================
                NO PAYMENT MESSAGE
                ================================================== */}

            <div className="ccq-no-payment">

              <h3>
                No online payment required
              </h3>

              <p>
                This form only sends your order
                request to Clean N Clear. Final
                pricing, availability, delivery
                and payment details will be
                confirmed by our team.
              </p>

            </div>


            {/* ==================================================
                ERROR
                ================================================== */}

            {error && (
              <div className="ccq-error">
                {error}
              </div>
            )}


            {/* ==================================================
                CUSTOMER FORM
                ================================================== */}

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
                    onChange={handleCustomerChange}
                    placeholder="Enter your name"
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
                    onChange={handleCustomerChange}
                    placeholder="Enter phone number"
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
                    onChange={handleCustomerChange}
                    placeholder="Enter email address"
                  />

                </div>


                {/* COMPANY */}

                <div className="ccq-field">

                  <label htmlFor="ccq-company">
                    Company / Organisation
                  </label>

                  <input
                    id="ccq-company"
                    type="text"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                  />

                </div>


                {/* LOCATION */}

                <div className="ccq-field ccq-field-full">

                  <label htmlFor="ccq-location">
                    Location *
                  </label>

                  <input
                    id="ccq-location"
                    type="text"
                    name="location"
                    value={customer.location}
                    onChange={handleCustomerChange}
                    placeholder="City / Area"
                    required
                  />

                </div>


                {/* NOTES */}

                <div className="ccq-field ccq-field-full">

                  <label htmlFor="ccq-notes">
                    Additional Requirements
                  </label>

                  <textarea
                    id="ccq-notes"
                    name="notes"
                    value={customer.notes}
                    onChange={handleCustomerChange}
                    placeholder="Mention any quantity, delivery or product requirements..."
                    rows="5"
                  />

                </div>

              </div>


              {/* ==================================================
                  FINAL ORDER SUMMARY
                  ================================================== */}

              <div className="ccq-final-summary">

                <div className="ccq-final-summary-header">

                  <h3>
                    Order Summary
                  </h3>

                  <span>
                    {cartCount} item
                    {cartCount !== 1
                      ? "s"
                      : ""}
                  </span>

                </div>


                <div className="ccq-final-items">

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="ccq-final-item"
                    >

                      <div>

                        <strong>
                          {item.name}
                        </strong>

                        <span>
                          {item.quantity} ×{" "}
                          {formatPrice(
                            item.price
                          )}
                        </span>

                      </div>

                      <strong>
                        {formatPrice(
                          item.price *
                            item.quantity
                        )}
                      </strong>

                    </div>
                  ))}

                </div>


                <div className="ccq-final-total">

                  <span>
                    Estimated Total
                  </span>

                  <strong>
                    {formatPrice(cartTotal)}
                  </strong>

                </div>

              </div>


              {/* ==================================================
                  FORM ACTIONS
                  ================================================== */}

              <div className="ccq-form-actions">

                <button
                  type="button"
                  className="ccq-back-button"
                  onClick={backToOrder}
                  disabled={submitting}
                >
                  Back to Order
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

          </div>

        </div>
      )}


      {/* ==================================================
          SUCCESS
          ================================================== */}

      {showSuccess && (
        <div className="ccq-overlay">

          <div className="ccq-success">

            <div className="ccq-success-icon">
              ✓
            </div>

            <span className="ccq-label">
              ORDER RECEIVED
            </span>

            <h2>
              Order Submitted Successfully
            </h2>

            <p>
              Thank you for your order request.
              Our team will review the details
              and contact you regarding pricing,
              availability and delivery.
            </p>

            <div className="ccq-order-number">

              <span>
                Order Number
              </span>

              <strong>
                {orderId}
              </strong>

            </div>

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

export default CleaningChemicals;