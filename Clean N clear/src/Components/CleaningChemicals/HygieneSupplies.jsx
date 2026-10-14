
import { useEffect, useState } from "react";
import "./CleaningChemicals.css";

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

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/+$/, "");

const products = [
  {
    id: "airport-bin-2",
    name: "Airport Bin",
    image: AirportBin2,
    unit: "Unit",
    description: "Waste bin for public and commercial spaces.",
  },
  {
    id: "airport-bin-3",
    name: "Airport Bin",
    image: AirportBin3,
    unit: "Unit",
    description: "Waste bin for commercial and institutional use.",
  },
  {
    id: "airport-bin",
    name: "Airport Bin",
    image: AirportBin,
    unit: "Unit",
    description: "Waste bin suitable for shared spaces.",
  },
  {
    id: "ashtray-bin",
    name: "Ashtray Bin",
    image: AshtrayBin,
    unit: "Unit",
    description: "Bin designed for designated smoking areas.",
  },
  {
    id: "bed-roll",
    name: "Bed Roll",
    image: BedRoll,
    unit: "Pack",
    description: "Bed roll for hygiene and facility requirements.",
  },
  {
    id: "corner-bin-with-ashtray",
    name: "Corner Bin with Ashtray",
    image: CornerBinWithAshtray,
    unit: "Unit",
    description: "Corner waste bin with an integrated ashtray.",
  },
  {
    id: "half-round-bin",
    name: "Half Round Bin",
    image: HalfRoundBin,
    unit: "Unit",
    description: "Space-saving waste bin for indoor areas.",
  },
  {
    id: "hard-rolled-towel",
    name: "Hard Rolled Towel",
    image: HardRolledTowel,
    unit: "Pack",
    description: "Paper towels for washroom hygiene.",
  },
  {
    id: "joint-bin",
    name: "Joint Bin",
    image: JointBin,
    unit: "Unit",
    description: "Waste bin for commercial facilities.",
  },
  {
    id: "liquid-perfume",
    name: "Liquid Perfume",
    image: LiquidPerfume,
    unit: "Pack",
    description: "Liquid fragrance for facility maintenance.",
  },
  {
    id: "m-fold-towel",
    name: "M Fold Towel",
    image: MFoldTowel,
    unit: "Pack",
    description: "Folded paper towels for washroom dispensers.",
  },
  {
    id: "mediclean-foaming-soap",
    name: "Mediclean Foaming Soap",
    image: MedicleanFoamingSoap,
    unit: "Pack",
    description: "Foaming soap for hand hygiene.",
  },
  {
    id: "pedal-bin",
    name: "Pedal Bin",
    image: PedalBin,
    unit: "Unit",
    description: "Pedal-operated bin for hands-free waste disposal.",
  },
  {
    id: "perforated-bin",
    name: "Perforated Bin",
    image: PerforatedBin,
    unit: "Unit",
    description: "Perforated waste bin for facility use.",
  },
  {
    id: "planter-pot",
    name: "Planter Pot",
    image: PlanterPot,
    unit: "Unit",
    description: "Planter pot for indoor or outdoor spaces.",
  },
  {
    id: "planter-pot-2",
    name: "Planter Pot",
    image: PlanterPot2,
    unit: "Unit",
    description: "Planter pot for facility decoration.",
  },
  {
    id: "planter-pot-3",
    name: "Planter Pot",
    image: PlanterPot3,
    unit: "Unit",
    description: "Planter pot for indoor or outdoor spaces.",
  },
  {
    id: "planter-pot-4",
    name: "Planter Pot",
    image: PlanterPot4,
    unit: "Unit",
    description: "Planter pot for facility decoration.",
  },
  {
    id: "planter-pot-5",
    name: "Planter Pot",
    image: PlanterPot5,
    unit: "Unit",
    description: "Planter pot for indoor or outdoor spaces.",
  },
  {
    id: "planter-pot-6",
    name: "Planter Pot",
    image: PlanterPot6,
    unit: "Unit",
    description: "Planter pot for facility decoration.",
  },
  {
    id: "pressurepro-machine-protector-advance",
    name: "PressurePro Machine Protector Advance",
    image: PressureProMachineProtectorAdvance,
    unit: "Unit",
    description: "Machine protection product for cleaning equipment.",
  },
  {
    id: "pressurepro-machine-protector",
    name: "PressurePro Machine Protector",
    image: PressureProMachineProtector,
    unit: "Unit",
    description: "Machine protection product for cleaning equipment.",
  },
  {
    id: "reva-hand-rub-plus",
    name: "Reva Hand Rub Plus",
    image: RevaHandRubPlus,
    unit: "Unit",
    description: "Hand hygiene solution for workplace and facility use.",
  },
  {
    id: "reva-hand-sanitizer",
    name: "Reva Hand Sanitizer",
    image: RevaHandSanitizer,
    unit: "Unit",
    description: "Hand sanitizer for convenient hand hygiene.",
  },
  {
    id: "round-bin-with-ashtray",
    name: "Round Bin with Ashtray",
    image: RoundBinWithAshtray,
    unit: "Unit",
    description: "Round waste bin with an integrated ashtray.",
  },
  {
    id: "soft-tissue-napkin",
    name: "Soft Tissue Napkin",
    image: SoftTissueNapkin,
    unit: "Pack",
    description: "Soft tissue napkins for everyday hygiene.",
  },
  {
    id: "square-bin-top-open",
    name: "Square Bin Top Open",
    image: SquareBinTopOpen,
    unit: "Unit",
    description: "Square waste bin with an open top.",
  },
  {
    id: "square-bin-with-ashtray",
    name: "Square Bin with Ashtray",
    image: SquareBinWithAshtray,
    unit: "Unit",
    description: "Square waste bin with an integrated ashtray.",
  },
  {
    id: "square-joint-bin",
    name: "Square Joint Bin",
    image: SquareJointBin,
    unit: "Unit",
    description: "Square waste bin for commercial facilities.",
  },
  {
    id: "swing-bin",
    name: "Swing Bin",
    image: SwingBin,
    unit: "Unit",
    description: "Swing-lid bin for indoor use.",
  },
  {
    id: "toilet-tissue-roll",
    name: "Toilet Tissue Roll",
    image: ToiletTissueRoll,
    unit: "Pack",
    description: "Toilet tissue for washroom facilities.",
  },
].map((product) => ({
  ...product,
  category: "Hygiene Supplies",
}));

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
};

export default function HygieneSupplies() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState(() => getOrderCart());
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderedQuantities, setOrderedQuantities] = useState({});
  const [loadingOrderedQuantities, setLoadingOrderedQuantities] =
    useState(true);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  const loadOrderedQuantities = async () => {
    try {
      const response = await fetch(
        `${API_URL}/api/product-order-quantities`
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to load order quantities."
        );
      }

      setOrderedQuantities(data.quantities || {});
      return true;
    } catch (error) {
      console.error("Unable to load ordered quantities:", error);
      setOrderedQuantities({});
      return false;
    } finally {
      setLoadingOrderedQuantities(false);
    }
  };

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/product-order-quantities`
        );

        const data = await response.json().catch(() => ({}));

        if (!response.ok || !data.success) {
          throw new Error(
            data.message || "Unable to load order quantities."
          );
        }

        if (active) {
          setOrderedQuantities(data.quantities || {});
        }
      } catch (error) {
        console.error("Unable to load ordered quantities:", error);

        if (active) {
          setOrderedQuantities({});
        }
      } finally {
        if (active) {
          setLoadingOrderedQuantities(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

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

  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    setSelectedProduct(null);
    setShowCart(true);
  };

  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  const updateQuantity = (id, quantity) => {
    const nextQuantity = Number(quantity);

    if (!Number.isFinite(nextQuantity)) return;

    if (nextQuantity < 1) {
      removeFromCart(id);
      return;
    }

    setCart((previousCart) =>
      previousCart.map((item) =>
        item.id === id
          ? { ...item, quantity: nextQuantity }
          : item
      )
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;

    setCustomer((previous) => ({
      ...previous,
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
      window.alert(
        "Please enter your name, phone number and location."
      );
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      window.alert("Please enter a valid phone number.");
      return;
    }

    if (
      email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      window.alert("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/order`, {
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
          items: cart.map((item) => ({
            id: item.id,
            quantity: Number(item.quantity),
          })),
          notes: notes.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Unable to submit order."
        );
      }

      setOrderSuccess(data);
      setCart([]);
      setCustomer({ ...emptyCustomer });
      setNotes("");
      setShowCheckout(false);

      // Refresh quantities after the order has been accepted.
      await loadOrderedQuantities();
    } catch (error) {
      console.error("Order submission error:", error);

      window.alert(
        error.message ||
          "Unable to submit the order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ccq-section">
      <div className="ccq-header">
        <span className="ccq-label">HYGIENE SUPPLIES</span>
        <h1 className="ccq-title">Hygiene Supplies</h1>
        <p className="ccq-intro">
          Explore our range of hygiene products, waste bins,
          washroom essentials and facility supplies.
        </p>
      </div>

      <button
        type="button"
        className="ccq-cart-button"
        onClick={() => setShowCart(true)}
        aria-label={`My Order - ${cartCount} items`}
      >
        <span>My Order</span>
        <strong>{cartCount}</strong>
      </button>

      <div className="ccq-grid">
        {products.map((product) => {
          const orderedQuantity =
            Number(orderedQuantities[product.id]) || 0;

          return (
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
                <span className="ccq-category">
                  {product.category}
                </span>

                <h2 className="ccq-product-name">
                  {product.name}
                </h2>

                <div className="ccq-unit">{product.unit}</div>

                {!loadingOrderedQuantities &&
                  orderedQuantity > 0 && (
                    <div className="ccq-ordered">
                      Ordered: {orderedQuantity}
                    </div>
                  )}

                <button
                  type="button"
                  className="ccq-add-button"
                  onClick={() => addToCart(product)}
                >
                  Add to Order
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selectedProduct && (
        <div
          className="ccq-overlay"
          onClick={() => setSelectedProduct(null)}
          role="presentation"
        >
          <div
            className="ccq-product-modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={selectedProduct.name}
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
              <p>{selectedProduct.description}</p>

              <div className="ccq-modal-unit">
                <span>Pack / Unit:</span>
                <strong>{selectedProduct.unit}</strong>
              </div>

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
          role="presentation"
        >
          <aside
            className="ccq-cart-drawer"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Order Summary"
          >
            <div className="ccq-cart-header">
              <div>
                <span>YOUR ORDER</span>
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
                <p>Add products to your order to continue.</p>
              </div>
            ) : (
              <>
                <div className="ccq-cart-items">
                  {cart.map((item) => (
                    <div className="ccq-cart-item" key={item.id}>
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                      />

                      <div className="ccq-cart-item-info">
                        <h3>{item.name || "Product"}</h3>
                        <span>{item.unit || "Unit"}</span>

                        <div className="ccq-quantity">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                Number(item.quantity) - 1
                              )
                            }
                            aria-label={`Decrease ${
                              item.name || "product"
                            } quantity`}
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
                            aria-label={`Increase ${
                              item.name || "product"
                            } quantity`}
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
                    <span>Products in your order</span>
                    <strong>{cartCount}</strong>
                  </div>

                  <button
                    type="button"
                    className="ccq-checkout-button"
                    onClick={openCheckout}
                  >
                    Continue to Customer Details
                  </button>

                  <div className="ccq-no-payment">
                    <strong>Order Request</strong>
                    <span>
                      Submit your request and our team will contact
                      you to confirm the details.
                    </span>
                  </div>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {showCheckout && (
        <div className="ccq-overlay" role="presentation">
          <div
            className="ccq-checkout"
            role="dialog"
            aria-modal="true"
            aria-label="Customer Details"
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
              <p>
                Enter your details and submit your order request.
              </p>
            </div>

            <form className="ccq-form" onSubmit={submitOrder}>
              <div className="ccq-form-grid">
                <div className="ccq-field">
                  <label htmlFor="hygiene-name">
                    Full Name *
                  </label>
                  <input
                    id="hygiene-name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="hygiene-phone">
                    Phone Number *
                  </label>
                  <input
                    id="hygiene-phone"
                    type="tel"
                    name="phone"
                    value={customer.phone}
                    onChange={handleCustomerChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="hygiene-email">
                    Email Address
                  </label>
                  <input
                    id="hygiene-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="hygiene-company">
                    Company / Organization
                  </label>
                  <input
                    id="hygiene-company"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>
              </div>

              <div className="ccq-field">
                <label htmlFor="hygiene-location">
                  Delivery / Location *
                </label>
                <textarea
                  id="hygiene-location"
                  name="location"
                  value={customer.location}
                  onChange={handleCustomerChange}
                  placeholder="Enter delivery location / address"
                  rows={3}
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className="ccq-field">
                <label htmlFor="hygiene-notes">
                  Additional Notes
                </label>
                <textarea
                  id="hygiene-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Any specific requirements?"
                  rows={3}
                />
              </div>

              <div className="ccq-final-summary">
                <div>
                  <span>Products</span>
                  <strong>{cartCount}</strong>
                </div>
              </div>

              <div className="ccq-no-payment">
                <strong>Order Request</strong>
                <span>
                  Our team will contact you to confirm your request.
                </span>
              </div>

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

      {orderSuccess && (
        <div className="ccq-overlay" role="presentation">
          <div
            className="ccq-success"
            role="dialog"
            aria-modal="true"
            aria-label="Order submitted successfully"
          >
            <div className="ccq-success-icon">✓</div>
            <span>ORDER RECEIVED</span>
            <h2>Thank You!</h2>
            <p>
              Your order request has been submitted successfully.
            </p>

            <div className="ccq-order-number">
              <small>Order ID</small>
              <strong>
                {orderSuccess.orderId ||
                  orderSuccess.order?.id ||
                  "Order received"}
              </strong>
            </div>

            <p>
              Our team will contact you to confirm your request.
            </p>

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
}
