import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CleaningChemicals.css";
import { getOrderCart, updateOrderCart } from "../../utils/OrderCart";

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

const products = [
  { id: "bin-trolley", name: "Bin Trolley", image: BinTrolley , category: "Institutional Supplies" },
  { id: "bio-medical-bin", name: "Bio Medical Bin", image: BioMedicalBin , category: "Institutional Supplies" },
  { id: "canteen-bin", name: "Canteen Bin", image: CanteenBin , category: "Institutional Supplies" },
  { id: "dome-bin-with-stand", name: "Dome Bin With Stand", image: DomeBinWithStand , category: "Institutional Supplies" },
  { id: "dome-bin", name: "Dome Bin", image: DomeBin , category: "Institutional Supplies" },
  { id: "feminine", name: "Feminine Bin", image: Feminine , category: "Institutional Supplies" },
  { id: "frp-wet-dry-bin", name: "FRP Wet Dry Bin", image: FRPWetDryBin , category: "Institutional Supplies" },
  { id: "furniture-shine-maintainer-5l-x-4", name: "Furniture Shine Maintainer", image: FurnitureShineMaintainer5LX4 , category: "Institutional Supplies" },
  { id: "garbabe-bin-2", name: "Garbabe Bin 2", image: GarbabeBin2 , category: "Institutional Supplies" },
  { id: "garbage-bin-box", name: "Garbage Bin Box", image: GarbageBinBox , category: "Institutional Supplies" },
  { id: "garbage-bin-3", name: "Garbage Bin 3", image: GarbageBin3 , category: "Institutional Supplies" },
  { id: "garbage-bin-4", name: "Garbage Bin 4", image: GarbageBin4 , category: "Institutional Supplies" },
  { id: "garbage-bin-5", name: "Garbage Bin 5", image: GarbageBin5 , category: "Institutional Supplies" },
  { id: "garbage-bin-6", name: "Garbage Bin 6", image: GarbageBin6 , category: "Institutional Supplies" },
  { id: "garbage-bin-7", name: "Garbage Bin 7", image: GarbageBin7 , category: "Institutional Supplies" },
  { id: "garbage-bin-8", name: "Garbage Bin 8", image: GarbageBin8 , category: "Institutional Supplies" },
  { id: "garbage-bin", name: "Garbage Bin", image: GarbageBin , category: "Institutional Supplies" },
  { id: "gemini-no-dust-broom", name: "Gemini No Dust Broom", image: GEMININODUSTBROOM , category: "Institutional Supplies" },
  { id: "hard-surface-cleaner-1l-x-4", name: "Hard Surface Cleaner", image: HardSurfaceCleaner1LX4 , category: "Institutional Supplies" },
  { id: "hrt-dispenser-sensor-based", name: "HRT Sensor-Based Dispenser", image: HRTDispenserSensorBased , category: "Institutional Supplies" },
  { id: "jazz-spin-mop-bucket", name: "Jazz Spin Mop Bucket", image: JAZZSPINMOPBUCKET , category: "Institutional Supplies" },
  { id: "metal-mesh-bin", name: "Metal Mesh Bin", image: MetalMeshBin , category: "Institutional Supplies" },
  { id: "monkey-bin", name: "Monkey Bin", image: MonkeyBin , category: "Institutional Supplies" },
  { id: "pallette", name: "Pallette", image: Pallette , category: "Institutional Supplies" },
  { id: "penguin-bin", name: "Penguin Bin", image: PenguinBin , category: "Institutional Supplies" },
  { id: "plastic-pedal-bin", name: "Plastic Pedal Bin", image: PlasticPedalBin , category: "Institutional Supplies" },
  { id: "plastic-swing-bin", name: "Plastic Swing Bin", image: PlasticSwingBin , category: "Institutional Supplies" },
  { id: "plate-trolley", name: "Plate Trolley", image: PlateTrolley , category: "Institutional Supplies" },
  { id: "rabbit-bin", name: "Rabbit Bin", image: RabbitBin , category: "Institutional Supplies" },
  { id: "rectangular-bin", name: "Rectangular Bin", image: RectangularBin , category: "Institutional Supplies" },
  { id: "recycle-bin-2", name: "Recycle Bin 2", image: RecycleBin2 , category: "Institutional Supplies" },
  { id: "recycle-bin-3", name: "Recycle Bin 3", image: RecycleBin3 , category: "Institutional Supplies" },
  { id: "recycle-bin-4", name: "Recycle Bin 4", image: RecycleBin4 , category: "Institutional Supplies" },
  { id: "recycle-bin-5", name: "Recycle Bin 5", image: RecycleBin5 , category: "Institutional Supplies" },
  { id: "recycle-bin-6", name: "Recycle Bin 6", image: RecycleBin6 , category: "Institutional Supplies" },
  { id: "recycle-bin-7", name: "Recycle Bin 7", image: RecycleBin7 , category: "Institutional Supplies" },
  { id: "recycle-bin-8", name: "Recycle Bin 8", image: RecycleBin8 , category: "Institutional Supplies" },
  { id: "recycle-bin-9", name: "Recycle Bin 9", image: RecycleBin9 , category: "Institutional Supplies" },
  { id: "recycle-bin-10", name: "Recycle Bin 10", image: RecycleBin10 , category: "Institutional Supplies" },
  { id: "recycle-bin-11", name: "Recycle Bin 11", image: RecycleBin11 , category: "Institutional Supplies" },
  { id: "recycle-bin-12", name: "Recycle Bin 12", image: RecycleBin12 , category: "Institutional Supplies" },
  { id: "recycle-bin-13", name: "Recycle Bin 13", image: RecycleBin13 , category: "Institutional Supplies" },
  { id: "recycle-bin-round", name: "Recycle Bin Round", image: RecycleBinRound , category: "Institutional Supplies" },
  { id: "recycle-bin-square", name: "Recycle Bin Square", image: RecycleBinSquare , category: "Institutional Supplies" },
  { id: "round-dustbin", name: "Round Dustbin", image: RoundDustbin , category: "Institutional Supplies" },
  { id: "ss-ash-bin", name: "SS Ash Bin", image: SSAshBin , category: "Institutional Supplies" },
  { id: "ss-dustbin-perforated", name: "SS Dustbin Perforated", image: SSDustbinPerforated , category: "Institutional Supplies" },
  { id: "ss-pedal-bin", name: "SS Pedal Bin", image: SSPedalBin , category: "Institutional Supplies" },
  { id: "ss-plain-bin", name: "SS Plain Bin", image: SSPlainBin , category: "Institutional Supplies" },
  { id: "ss-planter", name: "SS Planter", image: SSPlanter , category: "Institutional Supplies" },
  { id: "ss-swing-bin", name: "SS Swing Bin", image: SSSwingBin , category: "Institutional Supplies" },
  { id: "tree-bin", name: "Tree Bin", image: TreeBin , category: "Institutional Supplies" },
  { id: "troll-2", name: "Troll 2", image: Troll2 , category: "Institutional Supplies" },
  { id: "troll-3", name: "Troll 3", image: Troll3 , category: "Institutional Supplies" },
  { id: "troll-4", name: "Troll 4", image: Troll4 , category: "Institutional Supplies" },
  { id: "troll-5", name: "Troll 5", image: Troll5 , category: "Institutional Supplies" },
  { id: "troll-6", name: "Troll 6", image: Troll6 , category: "Institutional Supplies" },
  { id: "troll-7", name: "Troll 7", image: Troll7 , category: "Institutional Supplies" },
  { id: "troll-8", name: "Troll 8", image: Troll8 , category: "Institutional Supplies" },
  { id: "trolly", name: "Trolly", image: Trolly , category: "Institutional Supplies" },
  { id: "vacuum-sweeper", name: "Vacuum Sweeper", image: VacuumSweeper , category: "Institutional Supplies" },
  { id: "washing-sink-1", name: "Washing Sink 1", image: WashingSink1 , category: "Institutional Supplies" },
  { id: "washing-sink", name: "Washing Sink", image: WashingSink , category: "Institutional Supplies" },
  { id: "water-bottle-stand", name: "Water Bottle Stand", image: WaterBottleStand , category: "Institutional Supplies" },
  { id: "water-bottle-trolley", name: "Water Bottle Trolley", image: WaterBottleTrolley , category: "Institutional Supplies" },
  { id: "wheel-waste-bin-120l-240l", name: "Wheel Waste Bin 120L / 240L", image: WheelWasteBin120L240L , category: "Institutional Supplies" },
  { id: "wheel-waste-bin-660l-1100l", name: "Wheel Waste Bin 660L / 1100L", image: WheelWasteBin660L1100L , category: "Institutional Supplies" },
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

const Institute = () => {
  const [cart, setCart] = useState(() => getOrderCart());
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [error, setError] = useState("");

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const syncCart = () => setCart(getOrderCart());

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
    setCustomer((current) => ({ ...current, [name]: value }));
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

    if (!customer.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(customer.phone.trim())) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!customer.location.trim()) {
      setError("Please enter your location.");
      return;
    }

    if (
      customer.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email.trim())
    ) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!cart.length) {
      setError("Your order is empty.");
      return;
    }

    const productDetails = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}\nCategory: ${item.category}\nQuantity: ${item.quantity}`
      )
      .join("\n\n");

    const message = [
      "*NEW ORDER - CLEAN N CLEAR*",
      "",
      "*CUSTOMER DETAILS*",
      `Name: ${customer.name.trim()}`,
      `Phone: ${customer.phone.trim()}`,
      `Email: ${customer.email.trim() || "Not provided"}`,
      `Company: ${customer.company.trim() || "Not provided"}`,
      `Location: ${customer.location.trim()}`,
      "",
      "*ORDER DETAILS*",
      productDetails,
      "",
      `Total quantity: ${cartCount}`,
      "",
      "*ADDITIONAL REQUIREMENTS*",
      customer.notes.trim() || "None",
      "",
      "Please contact the customer to confirm this order enquiry.",
    ].join("\n");

    const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );

    if (!whatsappWindow) {
      window.location.href = whatsappURL;
    }
  };

  return (
    <section className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">CLEAN N CLEAR</span>

        <h1 className="ccq-title">
          Institutional <span>Supplies</span>
        </h1>

        <p className="ccq-intro">
          Explore our range of waste-management products, bins, dispensers, trolleys and essential institutional supplies.
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
              <span className="ccq-category">
                {selectedProduct.category}
              </span>
              <h2>{selectedProduct.name}</h2>

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

      {showCart && (
        <div className="ccq-overlay" onClick={() => setShowCart(false)}>
          <aside
            className="ccq-cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="ccq-cart-header">
              <div>
                <span className="ccq-label">YOUR ORDER</span>
                <h2>Order Cart</h2>
              </div>

              <button
                type="button"
                className="ccq-close"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
              >
                ×
              </button>
            </div>

            <div className="ccq-cart-items">
              {cart.length === 0 ? (
                <div className="ccq-empty">
                  <div className="ccq-empty-icon">🛒</div>
                  <h3>Your order is empty</h3>
                  <p>Add products from the catalogue to continue.</p>
                  <Link to="/products" onClick={() => setShowCart(false)}>
                    Browse Products
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="ccq-cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="ccq-cart-item-info">
                      <h3>{item.name}</h3>
                      <span>{item.category}</span>

                      <div className="ccq-quantity">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          aria-label={`Decrease ${item.name}`}
                        >
                          −
                        </button>
                        <strong>{item.quantity}</strong>
                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          aria-label={`Increase ${item.name}`}
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="ccq-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="ccq-cart-footer">
                <div className="ccq-total">
                  <span>Selected Products</span>
                  <strong>{cartCount}</strong>
                </div>

                <p className="ccq-payment-note">
                  Submit your request and our team will contact you to confirm
                  the details.
                </p>

                {error && <div className="ccq-error">{error}</div>}

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

      {showCheckout && (
        <div className="ccq-overlay">
          <div className="ccq-checkout">
            <button
              type="button"
              className="ccq-close"
              onClick={backToCart}
              aria-label="Back to order"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">
              <span className="ccq-label">CUSTOMER DETAILS</span>
              <h2>Submit Your Order</h2>
              <p>
                Provide your contact information so our team can review your
                product request.
              </p>
            </div>

            {error && <div className="ccq-error">{error}</div>}

            <form className="ccq-form" onSubmit={submitOrder}>
              <div className="ccq-form-grid">
                <div className="ccq-field">
                  <label htmlFor="inst-name">Full Name *</label>
                  <input
                    id="inst-name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your name"
                    autoComplete="name"
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
                    autoComplete="tel"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="inst-email">Email Address</label>
                  <input
                    id="inst-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter email address"
                    autoComplete="email"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="inst-company">Company / Organisation</label>
                  <input
                    id="inst-company"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>

                <div className="ccq-field ccq-field-full">
                  <label htmlFor="inst-location">Location *</label>
                  <input
                    id="inst-location"
                    name="location"
                    value={customer.location}
                    onChange={handleCustomerChange}
                    placeholder="City / Area"
                    required
                  />
                </div>

                <div className="ccq-field ccq-field-full">
                  <label htmlFor="inst-notes">Additional Requirements</label>
                  <textarea
                    id="inst-notes"
                    name="notes"
                    value={customer.notes}
                    onChange={handleCustomerChange}
                    placeholder="Mention any product or delivery requirements..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="ccq-final-summary">
                <div className="ccq-final-summary-header">
                  <h3>Selected Products</h3>
                  <span>{cartCount} item(s)</span>
                </div>

                <div className="ccq-final-items">
                  {cart.map((item) => (
                    <div className="ccq-final-item" key={item.id}>
                      <div>
                        <strong>{item.name}</strong>
                        <span>
                          Quantity: {item.quantity} · {item.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ccq-form-actions">
                <button
                  type="button"
                  className="ccq-back-button"
                  onClick={backToCart}
                >
                  Back to Order
                </button>

                <button type="submit" className="ccq-submit">
                  Continue to WhatsApp
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Institute;
