import React, { useEffect, useState } from "react";
import "./CleaningChemicals.css";

import CleanerProduct from "../../images/house/Cleaner Product.webp";
import CleaningAcid from "../../images/house/Cleaning Acid 5Ltr.webp";
import FloorCleaner from "../../images/house/Floor Cleaner.webp";
import PushSweeper from "../../images/house/Push sweeper S 4 Twin.jpg";
import SprayExtractionCleaner from "../../images/house/Spray extraction cleaner SE 4001.jpg";
import ToiletCleaner from "../../images/house/Toilet Cleaner 5Ltr.webp";

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
   COMPONENT
   ========================================================= */

const HouseholdCleaning = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [cart, setCart] = useState([]);

  const [showCart, setShowCart] = useState(false);

  const [showCheckout, setShowCheckout] = useState(false);

  const [orderSuccess, setOrderSuccess] = useState(null);

  const [loading, setLoading] = useState(false);

  const [orderedQuantities, setOrderedQuantities] = useState({});

  const [loadingOrderedQuantities, setLoadingOrderedQuantities] =
    useState(true);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    location: "",
  });

  const [notes, setNotes] = useState("");

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
      selectedProduct ||
      showCart ||
      showCheckout ||
      orderSuccess;

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

    /* Open Order Summary automatically */

    setSelectedProduct(null);
    setShowCart(true);
  };

  /* =========================================================
     UPDATE QUANTITY
     ========================================================= */

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
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

    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.location.trim()
    ) {
      alert(
        "Please enter your name, phone number and location."
      );
      return;
    }

    try {
      setLoading(true);

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
            customer,
            items: orderItems,
            notes,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit order."
        );
      }

      setOrderSuccess(data);

      /* Clear cart */

      setCart([]);

      /* Clear customer details */

      setCustomer({
        name: "",
        phone: "",
        email: "",
        company: "",
        location: "",
      });

      setNotes("");

      /* Close checkout */

      setShowCheckout(false);

      /* Refresh ordered quantities */

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
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="ccq-product-image"
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


                {/* ORDERED */}

                {!loadingOrderedQuantities &&
                  orderedQuantity > 0 && (
                    <div className="ccq-ordered">
                      Ordered: {orderedQuantity}
                    </div>
                  )}


                {/* ADD */}

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
              onClick={closeProductModal}
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
        >

          <aside
            className="ccq-cart-drawer"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* HEADER */}

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
              >
                ×
              </button>

            </div>


            {/* EMPTY */}

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


                {/* TOTAL */}

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
        <div className="ccq-overlay">

          <div className="ccq-checkout">

            <button
              type="button"
              className="ccq-close"
              onClick={closeCheckout}
            >
              ×
            </button>


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

              <div className="ccq-form-grid">

                {/* NAME */}

                <div className="ccq-field">

                  <label>
                    Full Name *
                  </label>

                  <input
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

                  <label>
                    Phone Number *
                  </label>

                  <input
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

                  <label>
                    Email Address
                  </label>

                  <input
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

                  <label>
                    Company / Organization
                  </label>

                  <input
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

                <label>
                  Delivery / Location *
                </label>

                <textarea
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

                <label>
                  Additional Notes
                </label>

                <textarea
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
              Your order request has been
              submitted successfully.
            </p>


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

export default HouseholdCleaning;