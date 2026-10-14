import { useEffect, useMemo, useState } from "react";
import "./CleaningChemicals.css";
import { getOrderCart, updateOrderCart } from "../../utils/OrderCart";

// ================= IMAGE IMPORTS =================

import BinTrolley from "../../images/institute/Bin-trolley.png";
import BioMedicalBin from "../../images/institute/Bio_Medical_Bin.png";
import CanteenBin from "../../images/institute/canteen bin.png";
import DomeBinWithStand from "../../images/institute/Dome_Bin_With_Stand.png";
import DomeBin from "../../images/institute/Dome_Bin.png";
import Feminine from "../../images/institute/Feminine_Bin.png";
import FRPWetDryBin from "../../images/institute/FRP_Wet_Dry_Bin.png";
import FurnitureShineMaintainer5LX4 from "../../images/institute/Furniture Shine Maintainer 5L X 4.webp";
import GarbabeBin2 from "../../images/institute/Garbabe bin-2.png";
import GarbageBinBox from "../../images/institute/garbage bin box.png";
import GarbageBin3 from "../../images/institute/Garbage bin-3.png";
import GarbageBin4 from "../../images/institute/Garbage bin-4.png";
import GarbageBin5 from "../../images/institute/Garbage bin-5.png";
import GarbageBin6 from "../../images/institute/Garbage bin-6.png";
import GarbageBin7 from "../../images/institute/Garbage bin-7.png";
import GarbageBin8 from "../../images/institute/Garbage bin-8.png";
import GarbageBin from "../../images/institute/Garbage bin.png";
import GEMININODUSTBROOM from "../../images/institute/GEMINI NO DUST BROOM.jpg";
import HardSurfaceCleaner1LX4 from "../../images/institute/Hard Surface Cleaner 1L X 4.webp";
import HRTDispenserSensorBased from "../../images/institute/HRT Dispenser sensor based.webp";
import JAZZSPINMOPBUCKET from "../../images/institute/JAZZ SPIN MOP BUCKET.jpg";
import MetalMeshBin from "../../images/institute/Metal_Mesh_Bin.png";
import MonkeyBin from "../../images/institute/monkey bin.png";
import Pallette from "../../images/institute/pallette.png";
import PenguinBin from "../../images/institute/penguin bin.png";
import PlasticPedalBin from "../../images/institute/Plastic_Pedal_Bin.png";
import PlasticSwingBin from "../../images/institute/Plastic_Swing_Bin.png";
import PlateTrolley from "../../images/institute/plate trolley.png";
import RabbitBin from "../../images/institute/rabbit bin.png";
import RectangularBin from "../../images/institute/Rectangular_Bin.png";
import RecycleBin2 from "../../images/institute/Recycle bin-2.png";
import RecycleBin3 from "../../images/institute/Recycle bin-3.png";
import RecycleBin4 from "../../images/institute/Recycle bin-4.png";
import RecycleBin5 from "../../images/institute/Recycle bin-5.png";
import RecycleBin6 from "../../images/institute/Recycle bin-6.png";
import RecycleBin7 from "../../images/institute/Recycle bin-7.png";
import RecycleBin8 from "../../images/institute/Recycle bin-8.png";
import RecycleBin9 from "../../images/institute/Recycle bin-9.png";
import RecycleBin10 from "../../images/institute/Recycle bin-10.png";
import RecycleBin11 from "../../images/institute/Recycle bin-11.png";
import RecycleBin12 from "../../images/institute/Recycle bin-12.png";
import RecycleBin13 from "../../images/institute/Recycle bin-13.png";
import RecycleBinRound from "../../images/institute/Recycle Bin(round).png";
import RecycleBinSquare from "../../images/institute/Recycle Bin(square).png";
import RoundDustbin from "../../images/institute/Round_Dustbin.png";
import SSAshBin from "../../images/institute/SS_Ash_Bin.png";
import SSDustbinPerforated from "../../images/institute/SS_Dustbin_Perforated.png";
import SSPedalBin from "../../images/institute/SS_Pedal_Bin.png";
import SSPlainBin from "../../images/institute/SS_Plain_Bin.png";
import SSPlanter from "../../images/institute/SS_Planter.png";
import SSSwingBin from "../../images/institute/SS_Swing_Bin.png";
import TreeBin from "../../images/institute/tree bin.png";
import Troll2 from "../../images/institute/troll-2.png";
import Troll3 from "../../images/institute/troll-3.png";
import Troll4 from "../../images/institute/troll-4.png";
import Troll5 from "../../images/institute/troll-5.png";
import Troll6 from "../../images/institute/troll-6.png";
import Troll7 from "../../images/institute/troll-7.png";
import Troll8 from "../../images/institute/troll-8.png";
import Trolly from "../../images/institute/Trolly.png";
import VacuumSweeper from "../../images/institute/Vacuum sweeper.jpg";
import WashingSink1 from "../../images/institute/washing sink-1.png";
import WashingSink from "../../images/institute/washing sink.png";
import WaterBottleStand from "../../images/institute/water bottle stand.png";
import WaterBottleTrolley from "../../images/institute/water bottle trolley.png";
import WheelWasteBin120L240L from "../../images/institute/Wheel_Waste_Bin_120L_240L.png";
import WheelWasteBin660L1100L from "../../images/institute/Wheel_Waste_Bin_660L_1100L.png";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";

// ================= PRODUCT LIST =================

const products = [
  { id: "bin-trolley", name: "Bin Trolley", image: BinTrolley },
  { id: "bio-medical-bin", name: "Bio Medical Bin", image: BioMedicalBin },
  { id: "canteen-bin", name: "Canteen Bin", image: CanteenBin },
  { id: "dome-bin-with-stand", name: "Dome Bin With Stand", image: DomeBinWithStand },
  { id: "dome-bin", name: "Dome Bin", image: DomeBin },
  { id: "feminine", name: "Feminine Bin", image: Feminine },
  { id: "frp-wet-dry-bin", name: "FRP Wet Dry Bin", image: FRPWetDryBin },
  { id: "furniture-shine-maintainer-5l-x-4", name: "Furniture Shine Maintainer", image: FurnitureShineMaintainer5LX4 },
  { id: "garbabe-bin-2", name: "Garbabe Bin 2", image: GarbabeBin2 },
  { id: "garbage-bin-box", name: "Garbage Bin Box", image: GarbageBinBox },
  { id: "garbage-bin-3", name: "Garbage Bin 3", image: GarbageBin3 },
  { id: "garbage-bin-4", name: "Garbage Bin 4", image: GarbageBin4 },
  { id: "garbage-bin-5", name: "Garbage Bin 5", image: GarbageBin5 },
  { id: "garbage-bin-6", name: "Garbage Bin 6", image: GarbageBin6 },
  { id: "garbage-bin-7", name: "Garbage Bin 7", image: GarbageBin7 },
  { id: "garbage-bin-8", name: "Garbage Bin 8", image: GarbageBin8 },
  { id: "garbage-bin", name: "Garbage Bin", image: GarbageBin },
  { id: "gemini-no-dust-broom", name: "Gemini No Dust Broom", image: GEMININODUSTBROOM },
  { id: "hard-surface-cleaner-1l-x-4", name: "Hard Surface Cleaner", image: HardSurfaceCleaner1LX4 },
  { id: "hrt-dispenser-sensor-based", name: "HRT Sensor-Based Dispenser", image: HRTDispenserSensorBased },
  { id: "jazz-spin-mop-bucket", name: "Jazz Spin Mop Bucket", image: JAZZSPINMOPBUCKET },
  { id: "metal-mesh-bin", name: "Metal Mesh Bin", image: MetalMeshBin },
  { id: "monkey-bin", name: "Monkey Bin", image: MonkeyBin },
  { id: "pallette", name: "Pallette", image: Pallette },
  { id: "penguin-bin", name: "Penguin Bin", image: PenguinBin },
  { id: "plastic-pedal-bin", name: "Plastic Pedal Bin", image: PlasticPedalBin },
  { id: "plastic-swing-bin", name: "Plastic Swing Bin", image: PlasticSwingBin },
  { id: "plate-trolley", name: "Plate Trolley", image: PlateTrolley },
  { id: "rabbit-bin", name: "Rabbit Bin", image: RabbitBin },
  { id: "rectangular-bin", name: "Rectangular Bin", image: RectangularBin },
  { id: "recycle-bin-2", name: "Recycle Bin 2", image: RecycleBin2 },
  { id: "recycle-bin-3", name: "Recycle Bin 3", image: RecycleBin3 },
  { id: "recycle-bin-4", name: "Recycle Bin 4", image: RecycleBin4 },
  { id: "recycle-bin-5", name: "Recycle Bin 5", image: RecycleBin5 },
  { id: "recycle-bin-6", name: "Recycle Bin 6", image: RecycleBin6 },
  { id: "recycle-bin-7", name: "Recycle Bin 7", image: RecycleBin7 },
  { id: "recycle-bin-8", name: "Recycle Bin 8", image: RecycleBin8 },
  { id: "recycle-bin-9", name: "Recycle Bin 9", image: RecycleBin9 },
  { id: "recycle-bin-10", name: "Recycle Bin 10", image: RecycleBin10 },
  { id: "recycle-bin-11", name: "Recycle Bin 11", image: RecycleBin11 },
  { id: "recycle-bin-12", name: "Recycle Bin 12", image: RecycleBin12 },
  { id: "recycle-bin-13", name: "Recycle Bin 13", image: RecycleBin13 },
  { id: "recycle-bin-round", name: "Recycle Bin Round", image: RecycleBinRound },
  { id: "recycle-bin-square", name: "Recycle Bin Square", image: RecycleBinSquare },
  { id: "round-dustbin", name: "Round Dustbin", image: RoundDustbin },
  { id: "ss-ash-bin", name: "SS Ash Bin", image: SSAshBin },
  { id: "ss-dustbin-perforated", name: "SS Dustbin Perforated", image: SSDustbinPerforated },
  { id: "ss-pedal-bin", name: "SS Pedal Bin", image: SSPedalBin },
  { id: "ss-plain-bin", name: "SS Plain Bin", image: SSPlainBin },
  { id: "ss-planter", name: "SS Planter", image: SSPlanter },
  { id: "ss-swing-bin", name: "SS Swing Bin", image: SSSwingBin },
  { id: "tree-bin", name: "Tree Bin", image: TreeBin },
  { id: "troll-2", name: "Troll 2", image: Troll2 },
  { id: "troll-3", name: "Troll 3", image: Troll3 },
  { id: "troll-4", name: "Troll 4", image: Troll4 },
  { id: "troll-5", name: "Troll 5", image: Troll5 },
  { id: "troll-6", name: "Troll 6", image: Troll6 },
  { id: "troll-7", name: "Troll 7", image: Troll7 },
  { id: "troll-8", name: "Troll 8", image: Troll8 },
  { id: "trolly", name: "Trolly", image: Trolly },
  { id: "vacuum-sweeper", name: "Vacuum Sweeper", image: VacuumSweeper },
  { id: "washing-sink-1", name: "Washing Sink 1", image: WashingSink1 },
  { id: "washing-sink", name: "Washing Sink", image: WashingSink },
  { id: "water-bottle-stand", name: "Water Bottle Stand", image: WaterBottleStand },
  { id: "water-bottle-trolley", name: "Water Bottle Trolley", image: WaterBottleTrolley },
  { id: "wheel-waste-bin-120l-240l", name: "Wheel Waste Bin 120L / 240L", image: WheelWasteBin120L240L },
  { id: "wheel-waste-bin-660l-1100l", name: "Wheel Waste Bin 660L / 1100L", image: WheelWasteBin660L1100L },
];

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

export default function Institute() {
  const [cart, setCart] = useState(() => getOrderCart());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [submitting, setSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const modalOpen =
      Boolean(selectedProduct) || showOrder || Boolean(successOrder);

    document.body.style.overflow = modalOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct, showOrder, successOrder]);

  const cartCount = useMemo(
    () =>
      cart.reduce(
        (total, item) => total + Number(item?.quantity || 0),
        0
      ),
    [cart]
  );

  const addToCart = (product) => {
    setErrorMessage("");

    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Number(item.quantity || 0) + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          image: product.image,
          quantity: 1,
          unit: "Select quantity",
        },
      ];
    });

    setSelectedProduct(null);
    setShowOrder(true);
  };

  const updateQuantity = (productId, change) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + change,
              }
            : item
        )
        .filter((item) => Number(item.quantity || 0) > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) =>
      current.filter((item) => item.id !== productId)
    );
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((current) => ({
      ...current,
      [name]: value,
    }));

    setErrorMessage("");
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();

    if (submitting) return;

    setErrorMessage("");

    if (!cart.length) {
      setErrorMessage("Please add at least one product.");
      return;
    }

    if (!customer.name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }

    if (!/^[+]?[0-9()\-\s]{7,20}$/.test(customer.phone.trim())) {
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    if (!customer.location.trim()) {
      setErrorMessage("Please enter your location.");
      return;
    }

    if (
      customer.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())
    ) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(`${API_URL}/api/order`, {
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
          items: cart.map((item) => ({
            id: item.id,
            quantity: Number(item.quantity),
          })),
          notes: customer.notes.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data?.success) {
        throw new Error(
          data?.message || "Unable to submit your order. Please try again."
        );
      }

      setSuccessOrder(data.order || data);
      setCart([]);
      updateOrderCart([]);
      setCustomer({ ...emptyCustomer });
      setShowOrder(false);
    } catch (error) {
      console.error("Order submission failed:", error);
      setErrorMessage(
        error?.message || "Something went wrong while submitting your order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">CLEAN N CLEAR</span>

        <h1 className="ccq-title">
          Institutional <span>Supplies</span>
        </h1>

        <p className="ccq-intro">
          Explore bins, waste-management products, dispensers, trolleys and
          other supplies for institutional and commercial environments.
        </p>
      </header>

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
                className="ccq-product-image"
                src={product.image}
                alt={product.name}
                loading="lazy"
              />
            </button>

            <div className="ccq-card-content">
              <span className="ccq-category">
                Institutional Supplies
              </span>

              <h2 className="ccq-product-name">{product.name}</h2>

              <div className="ccq-unit">Select quantity</div>

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
          >
            <button
              type="button"
              className="ccq-close"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close product"
            >
              ×
            </button>

            <div className="ccq-modal-image-wrap">
              <img
                className="ccq-modal-image"
                src={selectedProduct.image}
                alt={selectedProduct.name}
              />
            </div>

            <div className="ccq-modal-content">
              <span className="ccq-label">INSTITUTIONAL SUPPLIES</span>
              <h2>{selectedProduct.name}</h2>
              <p>Select this product to add it to your order.</p>

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

      {showOrder && (
        <div
          className="ccq-overlay"
          onClick={() => setShowOrder(false)}
        >
          <div
            className="ccq-checkout"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="ccq-close"
              onClick={() => setShowOrder(false)}
              aria-label="Close order"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">
              <span>CLEAN N CLEAR</span>
              <h2>My Order</h2>
              <p>Review your selected products and submit your enquiry.</p>
            </div>

            <div className="ccq-cart-items">
              {cart.length === 0 ? (
                <div className="ccq-empty">
                  <div className="ccq-empty-icon">🛒</div>
                  <h3>Your order is empty</h3>
                  <p>Add products from the catalogue to continue.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="ccq-cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="ccq-cart-item-info">
                      <h3>{item.name}</h3>

                      <div className="ccq-quantity">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>

                        <strong>{item.quantity}</strong>

                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label={`Increase ${item.name}`}
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
                ))
              )}
            </div>

            {cart.length > 0 && (
              <>
                <div className="ccq-final-summary">
                  <div>
                    <span>Selected items</span>
                    <strong>{cartCount}</strong>
                  </div>
                </div>

                <form
                  className="ccq-form"
                  onSubmit={handleSubmitOrder}
                >
                  <div className="ccq-form-grid">
                    <div className="ccq-field">
                      <label htmlFor="inst-name">Name *</label>
                      <input
                        id="inst-name"
                        name="name"
                        value={customer.name}
                        onChange={handleCustomerChange}
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div className="ccq-field">
                      <label htmlFor="inst-phone">Phone Number *</label>
                      <input
                        id="inst-phone"
                        type="tel"
                        name="phone"
                        value={customer.phone}
                        onChange={handleCustomerChange}
                        placeholder="Enter phone number"
                        required
                      />
                    </div>

                    <div className="ccq-field">
                      <label htmlFor="inst-email">Email</label>
                      <input
                        id="inst-email"
                        type="email"
                        name="email"
                        value={customer.email}
                        onChange={handleCustomerChange}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div className="ccq-field">
                      <label htmlFor="inst-company">
                        Company / Institution
                      </label>
                      <input
                        id="inst-company"
                        name="company"
                        value={customer.company}
                        onChange={handleCustomerChange}
                        placeholder="Institution name"
                      />
                    </div>

                    <div className="ccq-field">
                      <label htmlFor="inst-location">Location *</label>
                      <input
                        id="inst-location"
                        name="location"
                        value={customer.location}
                        onChange={handleCustomerChange}
                        placeholder="City / Location"
                        required
                      />
                    </div>

                    <div className="ccq-field">
                      <label htmlFor="inst-notes">
                        Additional Requirements
                      </label>
                      <textarea
                        id="inst-notes"
                        name="notes"
                        value={customer.notes}
                        onChange={handleCustomerChange}
                        placeholder="Tell us about your requirement..."
                        rows={4}
                      />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="ccq-error">{errorMessage}</div>
                  )}

                  <div className="ccq-form-actions">
                    <button
                      type="button"
                      className="ccq-back-button"
                      onClick={() => setShowOrder(false)}
                    >
                      Continue Shopping
                    </button>

                    <button
                      type="submit"
                      className="ccq-submit"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit Order"}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {successOrder && (
        <div className="ccq-overlay">
          <div className="ccq-success">
            <div className="ccq-success-icon">✓</div>
            <span>ORDER RECEIVED</span>
            <h2>Thank You!</h2>

            <p>
              Your request has been submitted successfully. Our team will
              review it and contact you shortly.
            </p>

            {(successOrder?.id || successOrder?.orderId) && (
              <div className="ccq-order-number">
                <small>Order Number</small>
                <strong>
                  {successOrder.id || successOrder.orderId}
                </strong>
              </div>
            )}

            <button
              type="button"
              className="ccq-success-button"
              onClick={() => setSuccessOrder(null)}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </main>
  );
}