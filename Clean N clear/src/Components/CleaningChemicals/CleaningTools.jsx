import React, { useEffect, useMemo, useState } from "react";
import "../CleaningChemicals/CleaningChemicals.css";

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

  const [customer, setCustomer] = useState(emptyCustomer);

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
  // SYNC SHARED ORDER CART
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
          (item) => Number(item.quantity || 0) > 0
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
    // START SUBMIT
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

      // Clear shared cart
      setCart([]);

      // Clear customer form
      setCustomer({ ...emptyCustomer });

      // Close order modal
      setShowOrder(false);

      // Clear error
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
    <main className="ccq-page">

      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <section className="ccq-page-header">
        <div className="ccq-page-header-inner">
          <span className="ccq-eyebrow">
            CLEAN N CLEAR
          </span>

          <h1>Cleaning Tools</h1>

          <p>
            Reliable cleaning tools designed
            for household, commercial and
            institutional cleaning
            requirements.
          </p>
        </div>
      </section>

      {/* =================================================
          PRODUCT SECTION
      ================================================= */}

      <section className="ccq-products-section">
        <div className="ccq-products-container">

          <div className="ccq-section-heading">
            <div>
              <span className="ccq-section-label">
                OUR PRODUCTS
              </span>

              <h2>
                Cleaning Tools &amp; Accessories
              </h2>
            </div>

            {cartCount > 0 && (
              <button
                type="button"
                className="ccq-order-top-button"
                onClick={() => {
                  setErrorMessage("");
                  setShowOrder(true);
                }}
              >
                My Order
                <span>{cartCount}</span>
              </button>
            )}
          </div>

          {/* =================================================
              PRODUCT GRID
          ================================================= */}

          <div className="ccq-product-grid">
            {products.map((product) => {
              const ordered = Number(
                orderedQuantities[product.id] || 0
              );

              return (
                <article
                  className="ccq-product-card"
                  key={product.id}
                >
                  {/* IMAGE */}

                  <button
                    type="button"
                    className="ccq-product-image-button"
                    onClick={() =>
                      setShowProduct(product)
                    }
                    aria-label={`View ${product.name}`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                  {/* CONTENT */}

                  <div className="ccq-product-content">
                    <h3>{product.name}</h3>

                    <div className="ccq-product-price">
                      <strong>
                        {formatPrice(product.price)}
                      </strong>

                      <span>
                        / {product.unit}
                      </span>
                    </div>

                    {ordered > 0 && (
                      <div className="ccq-ordered-count">
                        Ordered: {ordered}
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
        </div>
      </section>

      {/* =================================================
          PRODUCT MODAL
      ================================================= */}

      {showProduct && (
        <div
          className="ccq-overlay"
          onClick={() => setShowProduct(null)}
        >
          <div
            className="ccq-dialog ccq-product-dialog"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="ccq-close-button"
              onClick={() =>
                setShowProduct(null)
              }
              aria-label="Close"
            >
              ×
            </button>

            <div className="ccq-product-dialog-image">
              <img
                src={showProduct.image}
                alt={showProduct.name}
              />
            </div>

            <div className="ccq-product-dialog-content">
              <span className="ccq-dialog-label">
                CLEAN N CLEAR
              </span>

              <h2>{showProduct.name}</h2>

              <div className="ccq-dialog-price">
                {formatPrice(showProduct.price)}

                <span>
                  / {showProduct.unit}
                </span>
              </div>

              <button
                type="button"
                className="ccq-primary-button"
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
          ORDER MODAL
      ================================================= */}

      {showOrder && (
        <div
          className="ccq-overlay"
          onClick={() => setShowOrder(false)}
        >
          <div
            className="ccq-dialog ccq-order-dialog"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="ccq-close-button"
              onClick={() =>
                setShowOrder(false)
              }
              aria-label="Close"
            >
              ×
            </button>

            {/* HEADER */}

            <div className="ccq-order-header">
              <span className="ccq-dialog-label">
                CLEAN N CLEAR
              </span>

              <h2>My Order</h2>

              <p>
                Review your selected
                products and submit
                your enquiry.
              </p>
            </div>

            {/* CART */}

            <div className="ccq-cart-list">
              {cart.length === 0 ? (
                <div className="ccq-empty-cart">
                  <h3>
                    Your order is empty
                  </h3>

                  <p>
                    Add products from
                    the catalogue to
                    continue.
                  </p>
                </div>
              ) : (
                cart.map((item) => (
                  <div
                    className="ccq-cart-item"
                    key={item.id}
                  >
                    <div className="ccq-cart-image">
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </div>

                    <div className="ccq-cart-info">
                      <h3>{item.name}</h3>

                      <span>
                        {formatPrice(item.price)}
                        {" / "}
                        {item.unit}
                      </span>

                      <div className="ccq-quantity-row">
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

                    <div className="ccq-cart-item-right">
                      <strong>
                        {formatPrice(
                          Number(item.price) *
                            Number(item.quantity)
                        )}
                      </strong>

                      <button
                        type="button"
                        className="ccq-remove-button"
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* TOTAL + FORM */}

            {cart.length > 0 && (
              <>
                <div className="ccq-cart-total">
                  <span>
                    Estimated Total
                  </span>

                  <strong>
                    {formatPrice(cartTotal)}
                  </strong>
                </div>

                {/* CUSTOMER FORM */}

                <form
                  className="ccq-order-form"
                  onSubmit={handleSubmitOrder}
                >
                  <div className="ccq-form-title">
                    <h3>
                      Customer Details
                    </h3>

                    <p>
                      Please provide
                      your details for
                      our team to
                      contact you.
                    </p>
                  </div>

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

                    <div className="ccq-field ccq-field-full">
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

                    <div className="ccq-field ccq-field-full">
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
                    <div className="ccq-error-message">
                      {errorMessage}
                    </div>
                  )}

                  {/* NO PAYMENT MESSAGE */}

                  <div className="ccq-payment-note">
                    No online payment is required.
                    Final pricing, availability
                    and delivery details will be
                    confirmed by our team.
                  </div>

                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="ccq-submit-button"
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Order"}
                  </button>
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
          <div className="ccq-dialog ccq-success-dialog">

            <div className="ccq-success-icon">
              ✓
            </div>

            <span className="ccq-dialog-label">
              ORDER RECEIVED
            </span>

            <h2>Thank You!</h2>

            <p>
              Your order has been
              submitted successfully.
              Our team will review
              your requirement and
              contact you shortly.
            </p>

            {(successOrder?.id ||
              successOrder?.orderId) && (
              <div className="ccq-order-number">
                <span>
                  Order Number
                </span>

                <strong>
                  {successOrder.id ||
                    successOrder.orderId}
                </strong>
              </div>
            )}

            <button
              type="button"
              className="ccq-primary-button"
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