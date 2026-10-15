import { useEffect, useMemo, useState } from "react";
import "./CleaningChemicals.css";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

import AirportBin2 from "../../images/Hygeine/Airport bin-2.png";
import AirportBin3 from "../../images/Hygeine/Airport bin-3.png";
import AirportBin from "../../images/Hygeine/airport bin.png";
import AshtrayBin from "../../images/Hygeine/Ashthray bin.png";
import BedRoll from "../../images/Hygeine/Bed roll.png";
import CornerBinWithAshtray from "../../images/Hygeine/corner bin with ashtray.png";
import HalfRoundBin from "../../images/Hygeine/half round bin.png";
import HardRolledTowel from "../../images/Hygeine/hard rolled towel.png";
import JointBin from "../../images/Hygeine/joint bin.png";
import LiquidPerfume from "../../images/Hygeine/Liquid Perfume 5L X 4.webp";
import MFoldTowel from "../../images/Hygeine/M fold towel.png";
import MedicleanFoamingSoap from "../../images/Hygeine/Mediclean Foaming Soap 500ml X 4.webp";
import PedalBin from "../../images/Hygeine/pedal bin.png";
import PerforatedBin from "../../images/Hygeine/perforated bin.png";
import PlanterPot from "../../images/Hygeine/planter pot.png";
import PlanterPot2 from "../../images/Hygeine/planter-pot-2.png";
import PlanterPot3 from "../../images/Hygeine/planter pot-3.png";
import PlanterPot4 from "../../images/Hygeine/planter pot-4.png";
import PlanterPot5 from "../../images/Hygeine/planter pot-5.png";
import PlanterPot6 from "../../images/Hygeine/planter-pot-6.png";
import PressureProMachineProtectorAdvance from "../../images/Hygeine/PressurePro Machine Protector Advance 1 RM 110, 1l.jpg";
import PressureProMachineProtector from "../../images/Hygeine/PressurePro Machine Protector RM 110, 1l.jpg";
import RevaHandRubPlus from "../../images/Hygeine/Reva Hand Rub Plus 5 Litre.webp";
import RevaHandSanitizer from "../../images/Hygeine/Reva Hand Sanitizer.webp";
import RoundBinWithAshtray from "../../images/Hygeine/round bin with ashtray bin.png";
import SoftTissueNapkin from "../../images/Hygeine/Soft tissue napkin.png";
import SquareBinTopOpen from "../../images/Hygeine/square bin top open.png";
import SquareBinWithAshtray from "../../images/Hygeine/square bin with ashtrey bin.png";
import SquareJointBin from "../../images/Hygeine/square joint bin.png";
import SwingBin from "../../images/Hygeine/swing bin.png";
import ToiletTissueRoll from "../../images/Hygeine/toilet tissue roll.png";

const WHATSAPP_NUMBER = "918147304734";

const products = [
  { id: "airport-bin-2", name: "Airport Bin", image: AirportBin2, unit: "Unit", description: "Waste bin for public and commercial spaces." },
  { id: "airport-bin-3", name: "Airport Bin", image: AirportBin3, unit: "Unit", description: "Waste bin for commercial and institutional use." },
  { id: "airport-bin", name: "Airport Bin", image: AirportBin, unit: "Unit", description: "Waste bin suitable for shared spaces." },
  { id: "ashtray-bin", name: "Ashtray Bin", image: AshtrayBin, unit: "Unit", description: "Bin designed for designated smoking areas." },
  { id: "bed-roll", name: "Bed Roll", image: BedRoll, unit: "Pack", description: "Bed roll for hygiene and facility requirements." },
  { id: "corner-bin-with-ashtray", name: "Corner Bin with Ashtray", image: CornerBinWithAshtray, unit: "Unit", description: "Corner waste bin with an integrated ashtray." },
  { id: "half-round-bin", name: "Half Round Bin", image: HalfRoundBin, unit: "Unit", description: "Space-saving waste bin for indoor areas." },
  { id: "hard-rolled-towel", name: "Hard Rolled Towel", image: HardRolledTowel, unit: "Pack", description: "Paper towels for washroom hygiene." },
  { id: "joint-bin", name: "Joint Bin", image: JointBin, unit: "Unit", description: "Waste bin for commercial facilities." },
  { id: "liquid-perfume", name: "Liquid Perfume", image: LiquidPerfume, unit: "Pack", description: "Liquid fragrance for facility maintenance." },
  { id: "m-fold-towel", name: "M Fold Towel", image: MFoldTowel, unit: "Pack", description: "Folded paper towels for washroom dispensers." },
  { id: "mediclean-foaming-soap", name: "Mediclean Foaming Soap", image: MedicleanFoamingSoap, unit: "Pack", description: "Foaming soap for hand hygiene." },
  { id: "pedal-bin", name: "Pedal Bin", image: PedalBin, unit: "Unit", description: "Pedal-operated bin for hands-free waste disposal." },
  { id: "perforated-bin", name: "Perforated Bin", image: PerforatedBin, unit: "Unit", description: "Perforated waste bin for facility use." },
  { id: "planter-pot", name: "Planter Pot", image: PlanterPot, unit: "Unit", description: "Planter pot for indoor or outdoor spaces." },
  { id: "planter-pot-2", name: "Planter Pot", image: PlanterPot2, unit: "Unit", description: "Planter pot for facility decoration." },
  { id: "planter-pot-3", name: "Planter Pot", image: PlanterPot3, unit: "Unit", description: "Planter pot for indoor or outdoor spaces." },
  { id: "planter-pot-4", name: "Planter Pot", image: PlanterPot4, unit: "Unit", description: "Planter pot for facility decoration." },
  { id: "planter-pot-5", name: "Planter Pot", image: PlanterPot5, unit: "Unit", description: "Planter pot for indoor or outdoor spaces." },
  { id: "planter-pot-6", name: "Planter Pot", image: PlanterPot6, unit: "Unit", description: "Planter pot for facility decoration." },
  { id: "pressurepro-machine-protector-advance", name: "PressurePro Machine Protector Advance", image: PressureProMachineProtectorAdvance, unit: "Unit", description: "Machine protection product for cleaning equipment." },
  { id: "pressurepro-machine-protector", name: "PressurePro Machine Protector", image: PressureProMachineProtector, unit: "Unit", description: "Machine protection product for cleaning equipment." },
  { id: "reva-hand-rub-plus", name: "Reva Hand Rub Plus", image: RevaHandRubPlus, unit: "Unit", description: "Hand hygiene solution for workplace and facility use." },
  { id: "reva-hand-sanitizer", name: "Reva Hand Sanitizer", image: RevaHandSanitizer, unit: "Unit", description: "Hand sanitizer for convenient hand hygiene." },
  { id: "round-bin-with-ashtray", name: "Round Bin with Ashtray", image: RoundBinWithAshtray, unit: "Unit", description: "Round waste bin with an integrated ashtray." },
  { id: "soft-tissue-napkin", name: "Soft Tissue Napkin", image: SoftTissueNapkin, unit: "Pack", description: "Soft tissue napkins for everyday hygiene." },
  { id: "square-bin-top-open", name: "Square Bin Top Open", image: SquareBinTopOpen, unit: "Unit", description: "Square waste bin with an open top." },
  { id: "square-bin-with-ashtray", name: "Square Bin with Ashtray", image: SquareBinWithAshtray, unit: "Unit", description: "Square waste bin with an integrated ashtray." },
  { id: "square-joint-bin", name: "Square Joint Bin", image: SquareJointBin, unit: "Unit", description: "Square waste bin for commercial facilities." },
  { id: "swing-bin", name: "Swing Bin", image: SwingBin, unit: "Unit", description: "Swing-lid bin for indoor use." },
  { id: "toilet-tissue-roll", name: "Toilet Tissue Roll", image: ToiletTissueRoll, unit: "Pack", description: "Toilet tissue for washroom facilities." },
].map((product) => ({ ...product, category: "Hygiene Supplies" }));

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

export default function HygieneSupplies() {
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
          unit: product.unit,
          description: product.description,
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
          `${index + 1}. ${item.name}\nCategory: ${item.category || "Hygiene Supplies"}\nQuantity: ${Number(item.quantity || 1)} ${item.unit || "Unit"}`
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
      "*SELECTED HYGIENE SUPPLIES*",
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
          Hygiene Supplies
        </h1>

        <p className="ccq-intro">
          Explore our range of hygiene products, waste bins, washroom essentials and facility supplies.
        </p>

        <button
          type="button"
          className="ccq-cart-button"
          onClick={() => {
            setError("");
            setShowCart(true);
          }}
        >
          My Order {cartCount > 0 && <strong>{cartCount}</strong>}
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
              <div className="ccq-unit">{product.unit}</div>
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
              <span className="ccq-label">HYGIENE SUPPLIES</span>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <div className="ccq-modal-unit">
                <span>Pack / Unit:</span>
                <strong>{selectedProduct.unit}</strong>
              </div>
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
                <p>Add hygiene products to your order to continue.</p>
              </div>
            ) : (
              <>
                <div className="ccq-cart-items" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  {cart.map((item) => (
                    <div className="ccq-cart-item" key={item.id} style={{ display: "grid", gridTemplateColumns: "64px minmax(0, 1fr)", alignItems: "start", gap: "12px", width: "100%" }}>
                      <img src={item.image} alt={item.name} />
                      <div className="ccq-cart-item-info">
                        <h3>{item.name}</h3>
                        <span>{item.unit || "Unit"}</span>
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
                        style={{ gridColumn: "2", justifySelf: "start" }}
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
              <p>Enter your details to prepare your hygiene supplies order request on WhatsApp.</p>
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
}
