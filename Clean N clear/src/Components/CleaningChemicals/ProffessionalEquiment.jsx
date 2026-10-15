import { useEffect, useMemo, useState } from "react";
import "./CleaningChemicals.css";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

import Product3LayerServiceCart from "../../images/ProffessionalEquipment/3_Layer_Service_Cart.png";
import ABSJRTDispenser from "../../images/ProffessionalEquipment/ABS_JRT_Dispenser.png";
import ABSMFoldDispenser1 from "../../images/ProffessionalEquipment/ABS_M_Fold_Dispenser_1.png";
import ABSMFoldDispenser2 from "../../images/ProffessionalEquipment/ABS_M_Fold_Dispenser_2.png";
import AerosolDispenser from "../../images/ProffessionalEquipment/Aerosel dispenser.png";
import AirRevitalizer from "../../images/ProffessionalEquipment/Air revatilizer.png";
import BioMedicalWasteTrolley from "../../images/ProffessionalEquipment/Bio_Medical_Waste_Trolley.png";
import FacialTissueDispenser from "../../images/ProffessionalEquipment/Facial_Tissue_Dispenser.png";
import HIGHSPEEDPOLISHER from "../../images/ProffessionalEquipment/HIGH SPEED POLISHER.png";
import HRTDispenser from "../../images/ProffessionalEquipment/HRT_Dispenser.png";
import JanitorCart from "../../images/ProffessionalEquipment/Janitor_Cart.png";
import KitchenTowelDispenser from "../../images/ProffessionalEquipment/Kitchen_Towel_Dispenser.png";
import LFoldTissueDispenser from "../../images/ProffessionalEquipment/L_Fold_Tissue_Dispenser.png";
import LCDAreoselDispenser from "../../images/ProffessionalEquipment/LCD Areosel dispenser.png";
import MiniRideOnSweeperBOL from "../../images/ProffessionalEquipment/Mini Ride on Sweeper BOL.png";
import MiniScrubberCable from "../../images/ProffessionalEquipment/Mini Scrubber (Cable).png";
import MultiFunctionalServiceCart from "../../images/ProffessionalEquipment/Multi functional service cart.png";
import MultiFunctionalJanitorialCart from "../../images/ProffessionalEquipment/Multi_Functional_Janitorial_Cart.png";
import PaperCupDispenser from "../../images/ProffessionalEquipment/Paper cup dispenser.png";
import PlatformTrolley from "../../images/ProffessionalEquipment/Platform_Trolley.png";
import PopUpTissueDispenser from "../../images/ProffessionalEquipment/Pop_Up_Tissue_Dispenser.png";
import RideOnScrubberDryer110L from "../../images/ProffessionalEquipment/Ride on Scrubber Dryer 110L.png";
import RideOnSweeper18CL from "../../images/ProffessionalEquipment/Ride on Sweeper 18CL.png";
import SoapDispenser1 from "../../images/ProffessionalEquipment/Soap_Dispenser_1.png";
import SoapDispenser2 from "../../images/ProffessionalEquipment/Soap_Dispenser_2.png";
import SoapDispenser3 from "../../images/ProffessionalEquipment/Soap_Dispenser_3.png";
import SoapDispenser4 from "../../images/ProffessionalEquipment/Soap_Dispenser_4.png";
import SoapDispenser5 from "../../images/ProffessionalEquipment/Soap_Dispenser_5.png";
import Sponge from "../../images/ProffessionalEquipment/Sponge.png";
import SSJRTDispenser from "../../images/ProffessionalEquipment/SS_JRT_Dispenser.png";
import SSMFoldDispenser2 from "../../images/ProffessionalEquipment/SS_M_Fold_Dispenser_2.png";
import SSMFoldDispenser from "../../images/ProffessionalEquipment/SS_M_Fold_Dispenser.png";
import SSSoapDispenser from "../../images/ProffessionalEquipment/SS_Soap_Dispenser.png";
import SSToiletRollHolder from "../../images/ProffessionalEquipment/SS_Toilet_Roll_Holder.png";
import STEAMVACUUMCLEANER from "../../images/ProffessionalEquipment/STEAM VACUUM CLEANER.png";
import TwinSoapDispenser from "../../images/ProffessionalEquipment/Twin soap dispenser.png";
import UrinalScreen1 from "../../images/ProffessionalEquipment/Urinal screen-1.png";
import UrinalScreen from "../../images/ProffessionalEquipment/Urinal screen.png";
import VapourizerOil from "../../images/ProffessionalEquipment/Vapourizer oil.png";
import WringerTrolley20L from "../../images/ProffessionalEquipment/Wringer_Trolley_20L.png";
import WringerTrolley40L from "../../images/ProffessionalEquipment/Wringer_Trolley_40L.png";
import WringerTrolley60L from "../../images/ProffessionalEquipment/Wringer_Trolley_60L.png";

const WHATSAPP_NUMBER = "918147304734";

const products = [
  { id: "3-layer-service-cart", name: "3 Layer Service Cart", image: Product3LayerServiceCart },
  { id: "abs-jrt-dispenser", name: "ABS JRT Dispenser", image: ABSJRTDispenser },
  { id: "abs-m-fold-dispenser-1", name: "ABS M Fold Dispenser 1", image: ABSMFoldDispenser1 },
  { id: "abs-m-fold-dispenser-2", name: "ABS M Fold Dispenser 2", image: ABSMFoldDispenser2 },
  { id: "aerosol-dispenser", name: "Aerosol dispenser", image: AerosolDispenser },
  { id: "air-revitalizer", name: "Air revitalizer", image: AirRevitalizer },
  { id: "bio-medical-waste-trolley", name: "Bio Medical Waste Trolley", image: BioMedicalWasteTrolley },
  { id: "facial-tissue-dispenser", name: "Facial Tissue Dispenser", image: FacialTissueDispenser },
  { id: "high-speed-polisher", name: "HIGH SPEED POLISHER", image: HIGHSPEEDPOLISHER },
  { id: "hrt-dispenser", name: "HRT Dispenser", image: HRTDispenser },
  { id: "janitor-cart", name: "Janitor Cart", image: JanitorCart },
  { id: "kitchen-towel-dispenser", name: "Kitchen Towel Dispenser", image: KitchenTowelDispenser },
  { id: "l-fold-tissue-dispenser", name: "L Fold Tissue Dispenser", image: LFoldTissueDispenser },
  { id: "lcd-areosel-dispenser", name: "LCD Areosel dispenser", image: LCDAreoselDispenser },
  { id: "mini-ride-on-sweeper-bol", name: "Mini Ride on Sweeper BOL", image: MiniRideOnSweeperBOL },
  { id: "mini-scrubber-cable", name: "Mini Scrubber (Cable)", image: MiniScrubberCable },
  { id: "multi-functional-service-cart", name: "Multi functional service cart", image: MultiFunctionalServiceCart },
  { id: "multi-functional-janitorial-cart", name: "Multi Functional Janitorial Cart", image: MultiFunctionalJanitorialCart },
  { id: "paper-cup-dispenser", name: "Paper cup dispenser", image: PaperCupDispenser },
  { id: "platform-trolley", name: "Platform Trolley", image: PlatformTrolley },
  { id: "pop-up-tissue-dispenser", name: "Pop Up Tissue Dispenser", image: PopUpTissueDispenser },
  { id: "ride-on-scrubber-dryer-110l", name: "Ride on Scrubber Dryer 110L", image: RideOnScrubberDryer110L },
  { id: "ride-on-sweeper-18cl", name: "Ride on Sweeper 18CL", image: RideOnSweeper18CL },
  { id: "soap-dispenser-1", name: "Soap Dispenser 1", image: SoapDispenser1 },
  { id: "soap-dispenser-2", name: "Soap Dispenser 2", image: SoapDispenser2 },
  { id: "soap-dispenser-3", name: "Soap Dispenser 3", image: SoapDispenser3 },
  { id: "soap-dispenser-4", name: "Soap Dispenser 4", image: SoapDispenser4 },
  { id: "soap-dispenser-5", name: "Soap Dispenser 5", image: SoapDispenser5 },
  { id: "sponge", name: "Sponge", image: Sponge },
  { id: "ss-jrt-dispenser", name: "SS JRT Dispenser", image: SSJRTDispenser },
  { id: "ss-m-fold-dispenser-2", name: "SS M Fold Dispenser 2", image: SSMFoldDispenser2 },
  { id: "ss-m-fold-dispenser", name: "SS M Fold Dispenser", image: SSMFoldDispenser },
  { id: "ss-soap-dispenser", name: "SS Soap Dispenser", image: SSSoapDispenser },
  { id: "ss-toilet-roll-holder", name: "SS Toilet Roll Holder", image: SSToiletRollHolder },
  { id: "steam-vacuum-cleaner", name: "STEAM VACUUM CLEANER", image: STEAMVACUUMCLEANER },
  { id: "twin-soap-dispenser", name: "Twin soap dispenser", image: TwinSoapDispenser },
  { id: "urinal-screen-1", name: "Urinal screen-1", image: UrinalScreen1 },
  { id: "urinal-screen", name: "Urinal screen", image: UrinalScreen },
  { id: "vapourizer-oil", name: "Vapourizer oil", image: VapourizerOil },
  { id: "wringer-trolley-20l", name: "Wringer Trolley 20L", image: WringerTrolley20L },
  { id: "wringer-trolley-40l", name: "Wringer Trolley 40L", image: WringerTrolley40L },
  { id: "wringer-trolley-60l", name: "Wringer Trolley 60L", image: WringerTrolley60L },
].map((product) => ({
  ...product,
  category: "Professional Equipment",
  unit: "Unit",
  description: `${product.name} for professional cleaning, hygiene, and facility maintenance.`,
}));

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

export default function ProfessionalEquipment() {
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
          `${index + 1}. ${item.name}\nCategory: ${item.category || "Professional Equipment"}\nQuantity: ${Number(item.quantity || 1)} ${item.unit || "Unit"}`
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
      "*SELECTED PROFESSIONAL EQUIPMENT*",
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
          Professional Cleaning Equipment
        </h1>

        <p className="ccq-intro">
          Explore our range of professional cleaning equipment designed for commercial, household and institutional cleaning requirements.
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
              <span className="ccq-label">PROFESSIONAL EQUIPMENT</span>
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
                <p>Add professional equipment to your order to continue.</p>
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
              <p>Enter your details to prepare your professional equipment order request on WhatsApp.</p>
            </div>

            {error && <div className="ccq-error" role="alert">{error}</div>}

            <form className="ccq-form" onSubmit={submitOrder}>
              <div className="ccq-form-grid">
                <div className="ccq-field">
                  <label htmlFor="equipment-name">Full Name *</label>
                  <input
                    id="equipment-name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="equipment-phone">Phone Number *</label>
                  <input
                    id="equipment-phone"
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
                  <label htmlFor="equipment-email">Email Address</label>
                  <input
                    id="equipment-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="equipment-company">Company / Organization</label>
                  <input
                    id="equipment-company"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="ccq-field">
                <label htmlFor="equipment-location">Location / Address *</label>
                <textarea
                  id="equipment-location"
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
                <label htmlFor="equipment-notes">Additional Requirements</label>
                <textarea
                  id="equipment-notes"
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
