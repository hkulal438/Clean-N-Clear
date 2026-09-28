import React, { useEffect, useState } from "react";
import "./OrderCart.css";

import {
  getOrderCart,
  updateOrderCart,
  clearOrderCart,
} from "../../utils/OrderCart";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
};

const OrderCart = () => {
  /* =========================================================
     CART
  ========================================================= */

  const [cart, setCart] = useState(() =>
    getOrderCart()
  );

  /* =========================================================
     CUSTOMER
  ========================================================= */

  const [customer, setCustomer] =
    useState(emptyCustomer);

  const [notes, setNotes] = useState("");

  /* =========================================================
     ORDER STATES
  ========================================================= */

  const [loading, setLoading] = useState(false);

  const [orderSuccess, setOrderSuccess] =
    useState(null);

  /* =========================================================
     SAVE SHARED CART
  ========================================================= */

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

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
     FORMAT PRICE
  ========================================================= */

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString(
      "en-IN"
    )}`;
  };

  /* =========================================================
     UPDATE QUANTITY
  ========================================================= */

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (
      !Number.isFinite(nextQuantity) ||
      nextQuantity < 1
    ) {
      removeItem(id);
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
     REMOVE ITEM
  ========================================================= */

  const removeItem = (id) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) => item.id !== id
      )
    );
  };

  /* =========================================================
     CLEAR CART
  ========================================================= */

  const handleClearCart = () => {
    if (cart.length === 0) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to remove all products from your order?"
    );

    if (!confirmed) {
      return;
    }

    clearOrderCart();
    setCart([]);
  };

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
     SUBMIT ORDER
  ========================================================= */

  const submitOrder = async (event) => {
    event.preventDefault();

    /* -------------------------------------------------------
       CART VALIDATION
    ------------------------------------------------------- */

    if (cart.length === 0) {
      alert(
        "Your order is empty. Please add at least one product."
      );
      return;
    }

    /* -------------------------------------------------------
       NORMALIZE CUSTOMER DATA
    ------------------------------------------------------- */

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

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      email &&
      !emailRegex.test(email)
    ) {
      alert(
        "Please enter a valid email address."
      );
      return;
    }

    try {
      setLoading(true);

      /* -----------------------------------------------------
         SEND ONLY PRODUCT ID + QUANTITY
         
         Backend calculates:
         - Product name
         - Product price
         - Product unit
         - Subtotal
         - Total
         ----------------------------------------------------- */

      const orderItems = cart.map((item) => ({
        id: item.id,
        quantity: Number(item.quantity),
      }));

      /* -----------------------------------------------------
         API REQUEST
         ----------------------------------------------------- */

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
         SHOW SUCCESS
         ----------------------------------------------------- */

      setOrderSuccess(data);

      /* -----------------------------------------------------
         CLEAR SHARED CART
         ----------------------------------------------------- */

      clearOrderCart();

      setCart([]);

      /* -----------------------------------------------------
         CLEAR FORM
         ----------------------------------------------------- */

      setCustomer({
        ...emptyCustomer,
      });

      setNotes("");
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
     CONTINUE SHOPPING
  ========================================================= */

  const continueShopping = () => {
    setOrderSuccess(null);
  };

  /* =========================================================
     EMPTY CART
  ========================================================= */

  if (
    cart.length === 0 &&
    !orderSuccess
  ) {
    return (
      <main className="cnc-order-page">

        <section className="cnc-order-empty-page">

          <div className="cnc-order-empty-inner">

            <span className="cnc-order-label">
              MY ORDER
            </span>

            <div className="cnc-order-empty-icon">
              🛒
            </div>

            <h1>
              Your Order Is Empty
            </h1>

            <p>
              You have not added any products
              to your order yet.
            </p>

            <a
              href="/products"
              className="cnc-order-primary-btn"
            >
              Explore Products
            </a>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     SUCCESS SCREEN
  ========================================================= */

  if (orderSuccess) {
    const orderId =
      orderSuccess.orderId ||
      orderSuccess.order?.id ||
      "Order received";

    return (
      <main className="cnc-order-page">

        <section className="cnc-order-success-page">

          <div className="cnc-order-success-card">

            <div className="cnc-order-success-icon">
              ✓
            </div>

            <span className="cnc-order-success-label">
              ORDER RECEIVED
            </span>

            <h1>
              Thank You!
            </h1>

            <p className="cnc-order-success-main">
              Your order request has been
              submitted successfully.
            </p>

            <div className="cnc-order-id-box">

              <span>
                Order ID
              </span>

              <strong>
                {orderId}
              </strong>

            </div>

            <p className="cnc-order-success-info">
              Our team will contact you to
              confirm product availability,
              delivery and final billing.
            </p>

            <div className="cnc-order-success-actions">

              <button
                type="button"
                className="cnc-order-primary-btn"
                onClick={continueShopping}
              >
                Continue Shopping
              </button>

              <a
                href="/"
                className="cnc-order-secondary-btn"
              >
                Back to Home
              </a>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     MAIN ORDER PAGE
  ========================================================= */

  return (
    <main className="cnc-order-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="cnc-order-hero">

        <div className="cnc-order-container">

          <span className="cnc-order-label">
            MY ORDER
          </span>

          <h1>
            Order Summary
          </h1>

          <p>
            Review your selected products,
            enter your details and submit
            your order request.
          </p>

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="cnc-order-content">

        <div className="cnc-order-container">

          <div className="cnc-order-layout">


            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div className="cnc-order-products">

              <div className="cnc-order-section-heading">

                <div>

                  <span>
                    SELECTED PRODUCTS
                  </span>

                  <h2>
                    Your Order
                  </h2>

                </div>

                <strong>
                  {cartCount}{" "}
                  {cartCount === 1
                    ? "Item"
                    : "Items"}
                </strong>

              </div>


              {/* CLEAR CART */}

              <button
                type="button"
                className="cnc-order-clear"
                onClick={handleClearCart}
              >
                Clear Order
              </button>


              {/* =================================================
                  PRODUCT ITEMS
              ================================================= */}

              <div className="cnc-order-item-list">

                {cart.map((item) => {

                  const itemSubtotal =
                    Number(item.price || 0) *
                    Number(item.quantity || 0);

                  return (
                    <article
                      className="cnc-order-item"
                      key={item.id}
                    >

                      {/* IMAGE */}

                      <div className="cnc-order-item-image">

                        <img
                          src={item.image}
                          alt={item.name}
                        />

                      </div>


                      {/* INFORMATION */}

                      <div className="cnc-order-item-info">

                        <span className="cnc-order-item-category">
                          {item.category ||
                            "Cleaning Products"}
                        </span>

                        <h3>
                          {item.name}
                        </h3>

                        <span className="cnc-order-item-unit">
                          {item.unit || "Unit"}
                        </span>

                        <div className="cnc-order-item-price">
                          {formatPrice(
                            item.price
                          )}
                        </div>

                      </div>


                      {/* QUANTITY */}

                      <div className="cnc-order-item-quantity">

                        <span>
                          Quantity
                        </span>

                        <div className="cnc-order-quantity-control">

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


                      {/* SUBTOTAL */}

                      <div className="cnc-order-item-total">

                        <span>
                          Subtotal
                        </span>

                        <strong>
                          {formatPrice(
                            itemSubtotal
                          )}
                        </strong>

                      </div>


                      {/* REMOVE */}

                      <button
                        type="button"
                        className="cnc-order-remove"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove
                      </button>

                    </article>
                  );
                })}

              </div>

            </div>


            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <aside className="cnc-order-sidebar">


              {/* =================================================
                  TOTAL
              ================================================= */}

              <div className="cnc-order-total-card">

                <span className="cnc-order-card-label">
                  ORDER TOTAL
                </span>

                <h2>
                  Estimated Total
                </h2>

                <div className="cnc-order-total-amount">
                  ₹
                  {cartTotal.toLocaleString(
                    "en-IN"
                  )}
                </div>

                <div className="cnc-order-total-line">
                  <span>
                    Products
                  </span>

                  <strong>
                    {cartCount}
                  </strong>
                </div>

                <div className="cnc-order-total-line">
                  <span>
                    Online Payment
                  </span>

                  <strong>
                    Not Required
                  </strong>
                </div>

              </div>


              {/* =================================================
                  CUSTOMER DETAILS
              ================================================= */}

              <div className="cnc-order-form-card">

                <div className="cnc-order-form-heading">

                  <span>
                    FINAL STEP
                  </span>

                  <h2>
                    Customer Details
                  </h2>

                  <p>
                    Enter your details and
                    submit your order request.
                  </p>

                </div>


                <form
                  className="cnc-order-form"
                  onSubmit={submitOrder}
                >

                  {/* NAME */}

                  <div className="cnc-order-field">

                    <label htmlFor="cnc-order-name">
                      Full Name *
                    </label>

                    <input
                      id="cnc-order-name"
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

                  <div className="cnc-order-field">

                    <label htmlFor="cnc-order-phone">
                      Phone Number *
                    </label>

                    <input
                      id="cnc-order-phone"
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

                  <div className="cnc-order-field">

                    <label htmlFor="cnc-order-email">
                      Email Address
                    </label>

                    <input
                      id="cnc-order-email"
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

                  <div className="cnc-order-field">

                    <label htmlFor="cnc-order-company">
                      Company / Organization
                    </label>

                    <input
                      id="cnc-order-company"
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


                  {/* LOCATION */}

                  <div className="cnc-order-field">

                    <label htmlFor="cnc-order-location">
                      Delivery / Location *
                    </label>

                    <textarea
                      id="cnc-order-location"
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

                  <div className="cnc-order-field">

                    <label htmlFor="cnc-order-notes">
                      Additional Notes
                    </label>

                    <textarea
                      id="cnc-order-notes"
                      value={notes}
                      onChange={(event) =>
                        setNotes(
                          event.target.value
                        )
                      }
                      placeholder="Any specific requirements?"
                      rows="4"
                    />

                  </div>


                  {/* PAYMENT INFORMATION */}

                  <div className="cnc-order-payment-note">

                    <strong>
                      No Online Payment
                    </strong>

                    <span>
                      Submit your order request.
                      Our team will contact you
                      for confirmation, delivery
                      and final billing.
                    </span>

                  </div>


                  {/* SUBMIT */}

                  <button
                    type="submit"
                    className="cnc-order-submit"
                    disabled={loading}
                  >

                    {loading ? (
                      <>
                        <span className="cnc-order-spinner" />
                        Submitting Order...
                      </>
                    ) : (
                      "Submit Order Request"
                    )}

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