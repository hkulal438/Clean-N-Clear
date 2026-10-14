import { useEffect, useState } from "react";
import "./CleaningChemicals.css";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

// ================= REVA PRODUCT IMAGE IMPORTS =================

import REVAABright from "../../images/house/REVA_A_BRIGHT.png";
import REVAAC2 from "../../images/house/REVA_AC_2.png";
import REVAAquaPlus from "../../images/house/REVA_AQUA_PLUS.png";
import REVAAquaTab from "../../images/house/REVA_AQUA_TAB.png";
import REVABioClean from "../../images/house/REVA_BIO_CLEAN.png";
import REVACleanHard from "../../images/house/REVA_CLEAN_HARD.png";
import REVACS04 from "../../images/house/REVA_CS_O4.png";
import REVACS08 from "../../images/house/REVA_CS_O8.png";
import REVADCL from "../../images/house/REVA_DCL.png";
import REVADishODet from "../../images/house/REVA_DISH_O_DET.png";
import RevaFCCS from "../../images/house/Reva_FCCS.png";
import REVAFoamSoap from "../../images/house/REVA_FOAM_SOAP.png";
import REVAFPM from "../../images/house/REVA_FPM.png";
import REVAFreshAromaOil from "../../images/house/REVA_FRESH_AROMA_OIL.png";
import REVAFreshBS from "../../images/house/REVA_FRESH_BS.png";
import REVAHandDegreaser from "../../images/house/REVA_HAND_DEGREASER.png";
import REVAHandSanitizer from "../../images/house/REVA_HAND_SANITIZER.png";
import REVAHandPlus from "../../images/house/REVA_HANDPLUS.png";
import REVAHD2 from "../../images/house/REVA_HD_2.png";
import REVAHyg1 from "../../images/house/REVA_HYGI+.png";
import REVAMDet from "../../images/house/REVA_M_DET.png";
import REVAMRinse from "../../images/house/REVA_M_RINSE.png";
import REVAMaklin from "../../images/house/REVA_MAKLIN.png";
import REVAMD10 from "../../images/house/REVA_MD_10.png";
import REVAMPC from "../../images/house/REVA_MPC.png";
import RevaMultiDet from "../../images/house/Reva_Multi_Det.png";
import REVANFC from "../../images/house/REVA_NFC.png";
import REVAOCRPlus from "../../images/house/REVA_OCR_PLUS.png";
import REVAPrimeDetFS from "../../images/house/REVA_PRIME_DET_FS.png";
import REVAPrimeDet from "../../images/house/REVA_PRIME_DET.png";
import REVAPurpleLeafBodyGel from "../../images/house/REVA_PURPLE_LEAF_BODY_GEL.png";
import REVAPurpleLeafHandWash from "../../images/house/REVA_PURPLE_LEAF_HAND_WASH.png";
import REVAPurpleLeafPremiumShampoo from "../../images/house/REVA_PURPLE_LEAF_PREMIUM_SHAMPOO.png";
import REVAPurpleLeafSkinMoisturizer from "../../images/house/REVA_PURPLE_LEAF_SKIN_MOISTURIZER.png";
import REVAQuatHyg from "../../images/house/REVA_QUAT_HYG.png";
import REVARPA from "../../images/house/REVA_RPA.png";
import REVASanicil from "../../images/house/REVA_SANICIL.png";
import REVASense from "../../images/house/REVA_SENSE.png";
import REVASoftHandwash from "../../images/house/REVA_SOFT_HANDWASH.png";
import REVASolutionAB from "../../images/house/REVA_SOLUTION_A_B.png";
import REVASparkle from "../../images/house/REVA_SPARKLE.png";
import REVASpotter from "../../images/house/REVA_SPOTTER.png";
import REVASSP from "../../images/house/REVA_SSP.png";
import REVAStickOff from "../../images/house/REVA_STICK_OFF.png";
import REVASVD from "../../images/house/REVA_SVD.png";
import REVAWSR from "../../images/house/REVA_WSR.png";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ================= PRODUCT LIST =================

const products = [
  { id: "reva-a-bright", name: "REVA A Bright", image: REVAABright },
  { id: "reva-ac-2", name: "REVA AC 2", image: REVAAC2 },
  { id: "reva-aqua-plus", name: "REVA Aqua Plus", image: REVAAquaPlus },
  { id: "reva-aqua-tab", name: "REVA Aqua Tab", image: REVAAquaTab },
  { id: "reva-bio-clean", name: "REVA Bio Clean", image: REVABioClean },
  { id: "reva-clean-hard", name: "REVA Clean Hard", image: REVACleanHard },
  { id: "reva-cs-o4", name: "REVA CS O4", image: REVACS04 },
  { id: "reva-cs-o8", name: "REVA CS O8", image: REVACS08 },
  { id: "reva-dcl", name: "REVA DCL", image: REVADCL },
  { id: "reva-dish-o-det", name: "REVA Dish O Det", image: REVADishODet },
  { id: "reva-fccs", name: "REVA FCCS", image: RevaFCCS },
  { id: "reva-foam-soap", name: "REVA Foam Soap", image: REVAFoamSoap },
  { id: "reva-fpm", name: "REVA FPM", image: REVAFPM },
  { id: "reva-fresh-aroma-oil", name: "REVA Fresh Aroma Oil", image: REVAFreshAromaOil },
  { id: "reva-fresh-bs", name: "REVA Fresh BS", image: REVAFreshBS },
  { id: "reva-hand-degreaser", name: "REVA Hand Degreaser", image: REVAHandDegreaser },
  { id: "reva-hand-sanitizer", name: "REVA Hand Sanitizer", image: REVAHandSanitizer },
  { id: "reva-handplus", name: "REVA Handplus", image: REVAHandPlus },
  { id: "reva-hd-2", name: "REVA HD 2", image: REVAHD2 },
  { id: "reva-hygi", name: "REVA HYGI+", image: REVAHyg1 },
  { id: "reva-m-det", name: "REVA M Det", image: REVAMDet },
  { id: "reva-m-rinse", name: "REVA M Rinse", image: REVAMRinse },
  { id: "reva-maklin", name: "REVA Maklin", image: REVAMaklin },
  { id: "reva-md-10", name: "REVA MD 10", image: REVAMD10 },
  { id: "reva-mpc", name: "REVA MPC", image: REVAMPC },
  { id: "reva-multi-det", name: "REVA Multi Det", image: RevaMultiDet },
  { id: "reva-nfc", name: "REVA NFC", image: REVANFC },
  { id: "reva-ocr-plus", name: "REVA OCR Plus", image: REVAOCRPlus },
  { id: "reva-prime-det-fs", name: "REVA Prime Det FS", image: REVAPrimeDetFS },
  { id: "reva-prime-det", name: "REVA Prime Det", image: REVAPrimeDet },
  { id: "reva-purple-leaf-body-gel", name: "REVA Purple Leaf Body Gel", image: REVAPurpleLeafBodyGel },
  { id: "reva-purple-leaf-hand-wash", name: "REVA Purple Leaf Hand Wash", image: REVAPurpleLeafHandWash },
  { id: "reva-purple-leaf-premium-shampoo", name: "REVA Purple Leaf Premium Shampoo", image: REVAPurpleLeafPremiumShampoo },
  { id: "reva-purple-leaf-skin-moisturizer", name: "REVA Purple Leaf Skin Moisturizer", image: REVAPurpleLeafSkinMoisturizer },
  { id: "reva-quat-hyg", name: "REVA Quat Hyg", image: REVAQuatHyg },
  { id: "reva-rpa", name: "REVA RPA", image: REVARPA },
  { id: "reva-sanicil", name: "REVA Sanicil", image: REVASanicil },
  { id: "reva-sense", name: "REVA Sense", image: REVASense },
  { id: "reva-soft-handwash", name: "REVA Soft Handwash", image: REVASoftHandwash },
  { id: "reva-solution-a-b", name: "REVA Solution A B", image: REVASolutionAB },
  { id: "reva-sparkle", name: "REVA Sparkle", image: REVASparkle },
  { id: "reva-spotter", name: "REVA Spotter", image: REVASpotter },
  { id: "reva-ssp", name: "REVA SSP", image: REVASSP },
  { id: "reva-stick-off", name: "REVA Stick Off", image: REVAStickOff },
  { id: "reva-svd", name: "REVA SVD", image: REVASVD },
  { id: "reva-wsr", name: "REVA WSR", image: REVAWSR },
];

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
};

const HouseholdCleaning = () => {
  const [cart, setCart] = useState(() => getOrderCart());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const modalOpen =
      Boolean(selectedProduct) ||
      showCart ||
      showCheckout ||
      Boolean(orderSuccess);

    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, showCart, showCheckout, orderSuccess]);

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      }

      return [
        ...previousCart,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          quantity: 1,
          unit: "Unit",
        },
      ];
    });

    setSelectedProduct(null);
    setShowCart(true);
  };

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity)) return;

    if (nextQuantity < 1) {
      setCart((previousCart) =>
        previousCart.filter((item) => item.id !== id)
      );
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id ? { ...item, quantity: nextQuantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previousCustomer) => ({
      ...previousCustomer,
      [name]: value,
    }));
  };

  const openCheckout = () => {
    if (!cart.length) {
      window.alert("Please add at least one product to your order.");
      return;
    }

    setShowCart(false);
    setShowCheckout(true);
  };

  const submitOrder = async (event) => {
    event.preventDefault();

    if (!cart.length) {
      window.alert("Please add at least one product to your order.");
      return;
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const email = customer.email.trim();
    const company = customer.company.trim();
    const location = customer.location.trim();

    if (!name || !phone || !location) {
      window.alert("Please enter your name, phone number and location.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      window.alert("Please enter a valid phone number.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      window.alert("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: { name, phone, email, company, location },
          items: cart.map((item) => ({
            id: item.id,
            quantity: Number(item.quantity),
          })),
          notes: notes.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit order.");
      }

      setOrderSuccess(data);
      setCart([]);
      updateOrderCart([]);
      setCustomer({ ...emptyCustomer });
      setNotes("");
      setShowCheckout(false);
    } catch (error) {
      console.error("Order submission error:", error);
      window.alert(error.message || "Unable to submit the order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">REVA PRODUCTS</span>
        <h1 className="ccq-title">Cleaning <span>Solutions</span></h1>
        <p className="ccq-intro">
          Explore our range of REVA cleaning, hygiene and care products
          for household, commercial and institutional use.
        </p>
      </header>

      <button
        type="button"
        className="ccq-cart-button"
        onClick={() => setShowCart(true)}
      >
        <span>My Order</span>
        <strong>{cartCount}</strong>
      </button>

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
              <span className="ccq-category">REVA Collection</span>
              <h2 className="ccq-product-name">{product.name}</h2>
              <button
                type="button"
                className="ccq-add-button"
                onClick={() => addToCart(product)}
              >
                Add to Order
              </button>
            </div>
          </article>
        ))}
      </div>

      {selectedProduct && (
        <div
          className="ccq-overlay"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="ccq-product-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="ccq-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product details"
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
              <span className="ccq-label">REVA COLLECTION</span>
              <h2>{selectedProduct.name}</h2>
              <p>
                Contact our team for product details and assistance with
                your requirements.
              </p>
              <button
                type="button"
                className="ccq-add-large"
                onClick={() => addToCart(selectedProduct)}
              >
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {showCart && (
        <div
          className="ccq-overlay"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="ccq-cart-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Order summary"
          >
            <div className="ccq-cart-header">
              <div>
                <span>YOUR SELECTION</span>
                <h2>Order Summary</h2>
              </div>
              <button
                type="button"
                className="ccq-close"
                onClick={() => setShowCart(false)}
                aria-label="Close order summary"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="ccq-empty">
                <div className="ccq-empty-icon">🛒</div>
                <h3>Your order is empty</h3>
                <p>Add products from the collection to continue.</p>
              </div>
            ) : (
              <>
                <div className="ccq-cart-items">
                  {cart.map((item) => (
                    <div className="ccq-cart-item" key={item.id}>
                      <img src={item.image} alt={item.name} />

                      <div className="ccq-cart-item-info">
                        <h3>{item.name}</h3>

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
                          <strong>{item.quantity}</strong>
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

                      <button
                        type="button"
                        className="ccq-remove"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="ccq-cart-footer">
                  <div className="ccq-total">
                    <span>Selected items</span>
                    <strong>{cartCount}</strong>
                  </div>

                  <button
                    type="button"
                    className="ccq-checkout-button"
                    onClick={openCheckout}
                  >
                    Continue to Customer Details
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showCheckout && (
        <div className="ccq-overlay">
          <div
            className="ccq-checkout"
            role="dialog"
            aria-modal="true"
            aria-label="Customer details"
          >
            <button
              type="button"
              className="ccq-close"
              onClick={() => !loading && setShowCheckout(false)}
              disabled={loading}
              aria-label="Close customer details"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">
              <span>FINAL STEP</span>
              <h2>Customer Details</h2>
              <p>Enter your details to submit your order request.</p>
            </div>

            <form className="ccq-form" onSubmit={submitOrder}>
              <div className="ccq-form-grid">
                <div className="ccq-field">
                  <label htmlFor="reva-name">Full Name *</label>
                  <input
                    id="reva-name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="reva-phone">Phone Number *</label>
                  <input
                    id="reva-phone"
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="reva-email">Email Address</label>
                  <input
                    id="reva-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="reva-company">Company / Organization</label>
                  <input
                    id="reva-company"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="ccq-field">
                <label htmlFor="reva-location">Location / Address *</label>
                <textarea
                  id="reva-location"
                  name="location"
                  value={customer.location}
                  onChange={handleCustomerChange}
                  placeholder="Enter your location or address"
                  rows={3}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="ccq-field">
                <label htmlFor="reva-notes">Additional Requirements</label>
                <textarea
                  id="reva-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Tell us about your requirements..."
                  rows={4}
                />
              </div>

              <div className="ccq-final-summary">
                <div>
                  <span>Selected products</span>
                  <strong>{cartCount}</strong>
                </div>
              </div>

              <button
                type="submit"
                className="ccq-submit"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Order Request"}
              </button>
            </form>
          </div>
        </div>
      )}

      {orderSuccess && (
        <div className="ccq-overlay">
          <div className="ccq-success" role="dialog" aria-modal="true">
            <div className="ccq-success-icon">✓</div>
            <span>ORDER RECEIVED</span>
            <h2>Thank You!</h2>
            <p>
              Your order request has been submitted successfully.
              Our team will contact you shortly.
            </p>

            {(orderSuccess.orderId ||
              orderSuccess.order?.id ||
              orderSuccess.id) && (
              <div className="ccq-order-number">
                <small>Order ID</small>
                <strong>
                  {orderSuccess.orderId ||
                    orderSuccess.order?.id ||
                    orderSuccess.id}
                </strong>
              </div>
            )}

            <button
              type="button"
              className="ccq-success-button"
              onClick={() => setOrderSuccess(null)}
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