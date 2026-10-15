import { useEffect, useMemo, useState } from "react";
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

// ================= PRODUCT LIST =================

const products = [
  { id: "reva-a-bright", name: "REVA A Bright", category: "REVA Collection", image: REVAABright },
  { id: "reva-ac-2", name: "REVA AC 2", category: "REVA Collection", image: REVAAC2 },
  { id: "reva-aqua-plus", name: "REVA Aqua Plus", category: "REVA Collection", image: REVAAquaPlus },
  { id: "reva-aqua-tab", name: "REVA Aqua Tab", category: "REVA Collection", image: REVAAquaTab },
  { id: "reva-bio-clean", name: "REVA Bio Clean", category: "REVA Collection", image: REVABioClean },
  { id: "reva-clean-hard", name: "REVA Clean Hard", category: "REVA Collection", image: REVACleanHard },
  { id: "reva-cs-o4", name: "REVA CS O4", category: "REVA Collection", image: REVACS04 },
  { id: "reva-cs-o8", name: "REVA CS O8", category: "REVA Collection", image: REVACS08 },
  { id: "reva-dcl", name: "REVA DCL", category: "REVA Collection", image: REVADCL },
  { id: "reva-dish-o-det", name: "REVA Dish O Det", category: "REVA Collection", image: REVADishODet },
  { id: "reva-fccs", name: "REVA FCCS", category: "REVA Collection", image: RevaFCCS },
  { id: "reva-foam-soap", name: "REVA Foam Soap", category: "REVA Collection", image: REVAFoamSoap },
  { id: "reva-fpm", name: "REVA FPM", category: "REVA Collection", image: REVAFPM },
  { id: "reva-fresh-aroma-oil", name: "REVA Fresh Aroma Oil", category: "REVA Collection", image: REVAFreshAromaOil },
  { id: "reva-fresh-bs", name: "REVA Fresh BS", category: "REVA Collection", image: REVAFreshBS },
  { id: "reva-hand-degreaser", name: "REVA Hand Degreaser", category: "REVA Collection", image: REVAHandDegreaser },
  { id: "reva-hand-sanitizer", name: "REVA Hand Sanitizer", category: "REVA Collection", image: REVAHandSanitizer },
  { id: "reva-handplus", name: "REVA Handplus", category: "REVA Collection", image: REVAHandPlus },
  { id: "reva-hd-2", name: "REVA HD 2", category: "REVA Collection", image: REVAHD2 },
  { id: "reva-hygi", name: "REVA HYGI+", category: "REVA Collection", image: REVAHyg1 },
  { id: "reva-m-det", name: "REVA M Det", category: "REVA Collection", image: REVAMDet },
  { id: "reva-m-rinse", name: "REVA M Rinse", category: "REVA Collection", image: REVAMRinse },
  { id: "reva-maklin", name: "REVA Maklin", category: "REVA Collection", image: REVAMaklin },
  { id: "reva-md-10", name: "REVA MD 10", category: "REVA Collection", image: REVAMD10 },
  { id: "reva-mpc", name: "REVA MPC", category: "REVA Collection", image: REVAMPC },
  { id: "reva-multi-det", name: "REVA Multi Det", category: "REVA Collection", image: RevaMultiDet },
  { id: "reva-nfc", name: "REVA NFC", category: "REVA Collection", image: REVANFC },
  { id: "reva-ocr-plus", name: "REVA OCR Plus", category: "REVA Collection", image: REVAOCRPlus },
  { id: "reva-prime-det-fs", name: "REVA Prime Det FS", category: "REVA Collection", image: REVAPrimeDetFS },
  { id: "reva-prime-det", name: "REVA Prime Det", category: "REVA Collection", image: REVAPrimeDet },
  { id: "reva-purple-leaf-body-gel", name: "REVA Purple Leaf Body Gel", category: "REVA Collection", image: REVAPurpleLeafBodyGel },
  { id: "reva-purple-leaf-hand-wash", name: "REVA Purple Leaf Hand Wash", category: "REVA Collection", image: REVAPurpleLeafHandWash },
  { id: "reva-purple-leaf-premium-shampoo", name: "REVA Purple Leaf Premium Shampoo", category: "REVA Collection", image: REVAPurpleLeafPremiumShampoo },
  { id: "reva-purple-leaf-skin-moisturizer", name: "REVA Purple Leaf Skin Moisturizer", category: "REVA Collection", image: REVAPurpleLeafSkinMoisturizer },
  { id: "reva-quat-hyg", name: "REVA Quat Hyg", category: "REVA Collection", image: REVAQuatHyg },
  { id: "reva-rpa", name: "REVA RPA", category: "REVA Collection", image: REVARPA },
  { id: "reva-sanicil", name: "REVA Sanicil", category: "REVA Collection", image: REVASanicil },
  { id: "reva-sense", name: "REVA Sense", category: "REVA Collection", image: REVASense },
  { id: "reva-soft-handwash", name: "REVA Soft Handwash", category: "REVA Collection", image: REVASoftHandwash },
  { id: "reva-solution-a-b", name: "REVA Solution A B", category: "REVA Collection", image: REVASolutionAB },
  { id: "reva-sparkle", name: "REVA Sparkle", category: "REVA Collection", image: REVASparkle },
  { id: "reva-spotter", name: "REVA Spotter", category: "REVA Collection", image: REVASpotter },
  { id: "reva-ssp", name: "REVA SSP", category: "REVA Collection", image: REVASSP },
  { id: "reva-stick-off", name: "REVA Stick Off", category: "REVA Collection", image: REVAStickOff },
  { id: "reva-svd", name: "REVA SVD", category: "REVA Collection", image: REVASVD },
  { id: "reva-wsr", name: "REVA WSR", category: "REVA Collection", image: REVAWSR },
];

const WHATSAPP_NUMBER = "918147304734";

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

const HouseholdCleaning = () => {
  const [cart, setCart] = useState(() => getOrderCart() || []);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [error, setError] = useState("");

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const syncCart = () => setCart(getOrderCart() || []);

    window.addEventListener("focus", syncCart);
    window.addEventListener("storage", syncCart);

    return () => {
      window.removeEventListener("focus", syncCart);
      window.removeEventListener("storage", syncCart);
    };
  }, []);

  useEffect(() => {
    const modalOpen = Boolean(selectedProduct) || showCart || showCheckout;
    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, showCart, showCheckout]);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + Number(item.quantity || 0), 0),
    [cart]
  );

  const addToOrder = (product) => {
    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          quantity: 1,
        },
      ];
    });

    setSelectedProduct(null);
    setError("");
    setShowCheckout(false);
    setShowCart(true);
  };

  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Number(item.quantity || 0) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Number(item.quantity || 0) - 1 }
            : item
        )
        .filter((item) => Number(item.quantity || 0) > 0)
    );
  };

  const removeItem = (id) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== id));
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({ ...currentCustomer, [name]: value }));
    setError("");
  };

  const goToCheckout = () => {
    if (!cart.length) {
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

  const submitOrder = (event) => {
    event.preventDefault();
    setError("");

    if (!cart.length) {
      setError("Your order is empty.");
      return;
    }

    const name = customer.name.trim();
    const phone = customer.phone.trim();
    const email = customer.email.trim();
    const company = customer.company.trim();
    const location = customer.location.trim();
    const notes = customer.notes.trim();

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!location) {
      setError("Please enter your location.");
      return;
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const productDetails = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\nCategory: ${item.category || "REVA Collection"}\nQuantity: ${Number(item.quantity || 1)}`
      )
      .join("\n\n");

    const message = [
      "*NEW ORDER ENQUIRY - CLEAN N CLEAR*",
      "",
      "*CUSTOMER DETAILS*",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Company / Organization: ${company || "Not provided"}`,
      `Location: ${location}`,
      "",
      "*SELECTED REVA PRODUCTS*",
      productDetails,
      "",
      `Total quantity: ${cartCount}`,
      "",
      "*ADDITIONAL REQUIREMENTS*",
      notes || "None",
      "",
      "Please confirm product availability and pricing.",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(whatsappURL, "_blank", "noopener,noreferrer");

    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  };

  return (
    <section className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">CLEAN N CLEAR</span>

        <h1 className="ccq-title">
          REVA Cleaning <span>Solutions</span>
        </h1>

        <p className="ccq-intro">
          Explore our range of REVA cleaning, hygiene and care products for
          household, commercial and institutional requirements.
        </p>

        <button
          type="button"
          className="ccq-cart-button"
          onClick={() => {
            setError("");
            setShowCart(true);
          }}
        >
          Order Cart {cartCount > 0 && <strong>{cartCount}</strong>}
        </button>
      </header>

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
              <span className="ccq-category">{product.category}</span>
              <h2 className="ccq-product-name">{product.name}</h2>
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

      {/* ================= PRODUCT DETAILS MODAL ================= */}
      {selectedProduct && (
        <div className="ccq-overlay" onClick={() => setSelectedProduct(null)}>
          <div
            className="ccq-product-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProduct.name} details`}
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
                Add this product to your order to enquire about availability and
                pricing.
              </p>
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

      {/* ================= ORDER CART DRAWER ================= */}
      {showCart && (
        <div className="ccq-overlay" onClick={() => setShowCart(false)}>
          <aside
            className="ccq-cart-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Order cart"
          >
            <div className="ccq-cart-header">
              <div>
                <span className="ccq-label">YOUR SELECTION</span>
                <h2>My Order</h2>
              </div>
              <button
                type="button"
                className="ccq-close"
                onClick={() => setShowCart(false)}
                aria-label="Close order cart"
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
                            onClick={() => decreaseQuantity(item.id)}
                            aria-label={`Decrease ${item.name} quantity`}
                          >
                            −
                          </button>
                          <strong>{item.quantity}</strong>
                          <button
                            type="button"
                            onClick={() => increaseQuantity(item.id)}
                            aria-label={`Increase ${item.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="ccq-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                <div className="ccq-cart-footer">
                  <div className="ccq-total">
                    <span>Total quantity</span>
                    <strong>{cartCount}</strong>
                  </div>
                  {error && <div className="ccq-error" role="alert">{error}</div>}
                  <button
                    type="button"
                    className="ccq-checkout-button"
                    onClick={goToCheckout}
                  >
                    Enter Customer Details
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* ================= CUSTOMER DETAILS ================= */}
      {showCheckout && (
        <div
          className="ccq-overlay"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowCheckout(false);
          }}
        >
          <div
            className="ccq-checkout"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Customer details"
          >
            <button
              type="button"
              className="ccq-close"
              onClick={backToCart}
              aria-label="Back to order cart"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">
              <span className="ccq-label">CLEAN N CLEAR</span>
              <h2>Customer Details</h2>
              <p>Enter your details to prepare your REVA product enquiry on WhatsApp.</p>
            </div>

            {error && <div className="ccq-error" role="alert">{error}</div>}

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
                  name="notes"
                  value={customer.notes}
                  onChange={handleCustomerChange}
                  placeholder="Tell us about your requirements..."
                  rows={4}
                />
              </div>

              <div
                className="ccq-final-summary"
                style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: "12px", width: "100%" }}
              >
                <h3 style={{ margin: 0 }}>Order Summary</h3>
                {cart.map((item) => (
                  <div
                    className="ccq-final-item"
                    key={item.id}
                    style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", gap: "16px", width: "100%", boxSizing: "border-box" }}
                  >
                    <span style={{ flex: "1", minWidth: 0, whiteSpace: "normal", overflowWrap: "anywhere" }}>{item.name}</span>
                    <strong style={{ flexShrink: 0 }}>× {item.quantity}</strong>
                  </div>
                ))}
                <div
                  className="ccq-total"
                  style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: "100%", boxSizing: "border-box" }}
                >
                  <span>Total quantity</span>
                  <strong>{cartCount}</strong>
                </div>
              </div>

              <div className="ccq-form-actions">
                <button type="button" className="ccq-back-button" onClick={backToCart}>
                  Back to Order
                </button>
                <button type="submit" className="ccq-submit">
                  Continue to WhatsApp
                </button>
              </div>
              <p className="ccq-intro">
                WhatsApp will open with your order details filled in. Review the
                message and press Send to submit your enquiry.
              </p>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default HouseholdCleaning;
