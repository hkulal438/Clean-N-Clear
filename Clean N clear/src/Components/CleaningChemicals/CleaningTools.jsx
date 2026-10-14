import { useEffect, useMemo, useState } from "react";
import "./CleaningChemicals.css";
import { getOrderCart, updateOrderCart } from "../../utils/OrderCart";

import AluminiumHandle from "../../images/CleaningTools/Aluminium handle.png";
import AROMATOILETBRUSHWITHSTAND from "../../images/CleaningTools/AROMA TOILET BRUSH WITH STAND.jpg";
import CarpetBrush from "../../images/CleaningTools/Carpet_Brush.png";
import CautionSignBoard from "../../images/CleaningTools/Caution sign board.png";
import CeilingBrush from "../../images/CleaningTools/Ceiling_Brush.png";
import CheckedCloth from "../../images/CleaningTools/Checked cloth.png";
import ClothBrush from "../../images/CleaningTools/Cloth brush.png";
import CoWebBrush from "../../images/CleaningTools/Co-web brush.png";
import CoWebTriangleBrush from "../../images/CleaningTools/Co-web-triangle brush.png";
import CobwebBrush from "../../images/CleaningTools/Cobweb_Brush.png";
import CottonCutEndRefill2 from "../../images/CleaningTools/Cotton_Cut_End_Refill_2.png";
import CottonJumboWetMopRefill from "../../images/CleaningTools/Cotton_Jumbo_Wet_Mop_Refill.png";
import CottonLoopMopRefill2 from "../../images/CleaningTools/Cotton_Loop_Mop_Refill_2.png";
import CottonLoopMopRefill1 from "../../images/CleaningTools/Cotton_Loop_Mop_Refill-1.png";
import CottonLoopMopRefill22 from "../../images/CleaningTools/Cotton_Loop_Mop_Refill-2.png";
import CottonLoopMopRefill3 from "../../images/CleaningTools/Cotton_Loop_Mop_Refill-3.png";
import CottonLoopMopRefill from "../../images/CleaningTools/Cotton_Loop_Mop_Refill.png";
import DampMop40cm from "../../images/CleaningTools/Damp_Mop_40cm.png";
import DeckMopRefill from "../../images/CleaningTools/Deck_Mop_Refill.png";
import DeckMopWithHandle from "../../images/CleaningTools/Deck_Mop_With_Handle.png";
import DryMopRefill18in24in from "../../images/CleaningTools/Dry_Mop_Refill_18in_24in.png";
import DryMopSet18in24in from "../../images/CleaningTools/Dry_Mop_Set_18in_24in.png";
import FeatherDuster1 from "../../images/CleaningTools/Feather duster-1.png";
import FeatherDuster from "../../images/CleaningTools/Feather duster.png";
import FlatMop45cm from "../../images/CleaningTools/Flat_Mop_45cm.png";
import FlatMop55cm from "../../images/CleaningTools/Flat_Mop_55cm.png";
import FlatMopRefill45cm60cm from "../../images/CleaningTools/Flat_Mop_Refill_45cm_60cm.png";
import FlexiMopRefill from "../../images/CleaningTools/Flexi_Mop_Refill.png";
import FlexiMopWithHandleColors from "../../images/CleaningTools/Flexi_Mop_With_Handle_Colors.png";
import FlexiMopWithHandle from "../../images/CleaningTools/Flexi_Mop_With_Handle.png";
import FloorBrush from "../../images/CleaningTools/Floor brush.png";
import FloorScrubbingPad from "../../images/CleaningTools/Floor scrubbing pad.png";
import FloorScrubbingBrush from "../../images/CleaningTools/Floor_Scrubbing_Brush.png";
import FloorWiper16in from "../../images/CleaningTools/Floor_Wiper_16in.png";
import FloorWiperDualBlade45cm from "../../images/CleaningTools/Floor_Wiper_Dual_Blade_45cm.png";
import FloorWiperDualBlade55cm from "../../images/CleaningTools/Floor_Wiper_Dual_Blade_55cm.png";
import FloorWiperHDBlack18in24in from "../../images/CleaningTools/Floor_Wiper_HD_Black_18in_24in.png";
import GlassApplicatorRefill from "../../images/CleaningTools/Glass Applicator refill.png";
import GlassApplicator from "../../images/CleaningTools/Glass Applicator.png";
import GlassCloth from "../../images/CleaningTools/Glass cloth.png";
import GlassScraperMini from "../../images/CleaningTools/Glass scraper mini.png";
import GlassScraper from "../../images/CleaningTools/Glass scraper.png";
import GlassSqueege from "../../images/CleaningTools/Glass squeeze.png";
import IronBrush from "../../images/CleaningTools/iron brush.png";
import JAZZSPINMOPBUCKET from "../../images/CleaningTools/JAZZ SPIN MOP BUCKET.jpg";
import KentuckyMopClip from "../../images/CleaningTools/Kentucky mop clip.png";
import LeafPicker from "../../images/CleaningTools/Leaf picker.png";
import LobbyDustpan from "../../images/CleaningTools/Lobby dustpan.png";
import LoopMopRefill from "../../images/CleaningTools/Loop_Mop_Refill.png";
import LoopMopWithHandleColors from "../../images/CleaningTools/Loop_Mop_With_Handle_Colors.png";
import LoopMop from "../../images/CleaningTools/Loop_Mop.png";
import MAGIKSPINMOPBUCKET from "../../images/CleaningTools/MAGIK SPIN MOP BUCKET.jpg";
import MegaMopRefill from "../../images/CleaningTools/Mega_Mop_Refill.png";
import MegaMopWithHandle from "../../images/CleaningTools/Mega_Mop_With_Handle.png";
import MetalHandle from "../../images/CleaningTools/Metal handle.png";
import MicrofiberCloth from "../../images/CleaningTools/Microfiber cloth.png";
import MicrofiberLoopMopWithHandle from "../../images/CleaningTools/Microfiber_Loop_Mop_With_Handle.png";
import MopClip from "../../images/CleaningTools/Mop clip.png";
import MopCloth from "../../images/CleaningTools/Mop cloth.png";
import PLUNGER from "../../images/CleaningTools/PLUNGER.jpg";
import PowerMopRefill from "../../images/CleaningTools/Power_Mop_Refill.png";
import PowerMopWithHandle from "../../images/CleaningTools/Power_Mop_With_Handle.png";
import PushBroom from "../../images/CleaningTools/Push_Broom.png";
import QueManager from "../../images/CleaningTools/Que manager.png";
import ReplacementRubber from "../../images/CleaningTools/Replacement rubber.png";
import RubberHandGlouse from "../../images/CleaningTools/Rubber hand glouse.png";
import SapphireBroom from "../../images/CleaningTools/Sapphire_Broom.png";
import ShoeShineMachine from "../../images/CleaningTools/Shoe shine machine.png";
import SPARKLEMICROFIBERFLATMOP from "../../images/CleaningTools/SPARKLE MICROFIBER FLAT MOP.jpg";
import SprayBottle1 from "../../images/CleaningTools/Spray bottle-1.png";
import SprayBottle from "../../images/CleaningTools/Spray bottle.png";
import TeliscopicPoll from "../../images/CleaningTools/Teliscopic poll.png";
import ToiletBrush1 from "../../images/CleaningTools/Toilet brush-1.png";
import ToolHolder1 from "../../images/CleaningTools/Tool holder-1.png";
import ToolHolder from "../../images/CleaningTools/Tool holder.png";
import Trigger from "../../images/CleaningTools/Trigger.png";
import WONDERKITCHENWIPER from "../../images/CleaningTools/WONDER KITCHEN WIPER.jpg";
import WoodenHandle from "../../images/CleaningTools/Wooden handle.png";
import WoodenCarpetBrush from "../../images/CleaningTools/Wooden_Carpet_Brush.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const products = [
  { id: "aluminium-handle", name: "Aluminium handle", unit: "Select quantity", image: AluminiumHandle },
  { id: "aroma-toilet-brush-with-stand", name: "AROMA TOILET BRUSH WITH STAND", unit: "Select quantity", image: AROMATOILETBRUSHWITHSTAND },
  { id: "carpet-brush", name: "Carpet Brush", unit: "Select quantity", image: CarpetBrush },
  { id: "caution-sign-board", name: "Caution sign board", unit: "Select quantity", image: CautionSignBoard },
  { id: "ceiling-brush", name: "Ceiling Brush", unit: "Select quantity", image: CeilingBrush },
  { id: "checked-cloth", name: "Checked cloth", unit: "Select quantity", image: CheckedCloth },
  { id: "cloth-brush", name: "Cloth brush", unit: "Select quantity", image: ClothBrush },
  { id: "co-web-brush", name: "Co web brush", unit: "Select quantity", image: CoWebBrush },
  { id: "co-web-triangle-brush", name: "Co web triangle brush", unit: "Select quantity", image: CoWebTriangleBrush },
  { id: "cobweb-brush", name: "Cobweb Brush", unit: "Select quantity", image: CobwebBrush },
  { id: "cotton-cut-end-refill-2", name: "Cotton Cut End Refill 2", unit: "Select quantity", image: CottonCutEndRefill2 },
  { id: "cotton-jumbo-wet-mop-refill", name: "Cotton Jumbo Wet Mop Refill", unit: "Select quantity", image: CottonJumboWetMopRefill },
  { id: "cotton-loop-mop-refill-2", name: "Cotton Loop Mop Refill 2", unit: "Select quantity", image: CottonLoopMopRefill2 },
  { id: "cotton-loop-mop-refill-1", name: "Cotton Loop Mop Refill 1", unit: "Select quantity", image: CottonLoopMopRefill1 },
  { id: "cotton-loop-mop-refill-2", name: "Cotton Loop Mop Refill 2", unit: "Select quantity", image: CottonLoopMopRefill22 },
  { id: "cotton-loop-mop-refill-3", name: "Cotton Loop Mop Refill 3", unit: "Select quantity", image: CottonLoopMopRefill3 },
  { id: "cotton-loop-mop-refill", name: "Cotton Loop Mop Refill", unit: "Select quantity", image: CottonLoopMopRefill },
  { id: "damp-mop-40cm", name: "Damp Mop 40cm", unit: "Select quantity", image: DampMop40cm },
  { id: "deck-mop-refill", name: "Deck Mop Refill", unit: "Select quantity", image: DeckMopRefill },
  { id: "deck-mop-with-handle", name: "Deck Mop With Handle", unit: "Select quantity", image: DeckMopWithHandle },
  { id: "dry-mop-refill-18in-24in", name: "Dry Mop Refill 18in 24in", unit: "Select quantity", image: DryMopRefill18in24in },
  { id: "dry-mop-set-18in-24in", name: "Dry Mop Set 18in 24in", unit: "Select quantity", image: DryMopSet18in24in },
  { id: "feather-duster-1", name: "Feather duster 1", unit: "Select quantity", image: FeatherDuster1 },
  { id: "feather-duster", name: "Feather duster", unit: "Select quantity", image: FeatherDuster },
  { id: "flat-mop-45cm", name: "Flat Mop 45cm", unit: "Select quantity", image: FlatMop45cm },
  { id: "flat-mop-55cm", name: "Flat Mop 55cm", unit: "Select quantity", image: FlatMop55cm },
  { id: "flat-mop-refill-45cm-60cm", name: "Flat Mop Refill 45cm 60cm", unit: "Select quantity", image: FlatMopRefill45cm60cm },
  { id: "flexi-mop-refill", name: "Flexi Mop Refill", unit: "Select quantity", image: FlexiMopRefill },
  { id: "flexi-mop-with-handle-colors", name: "Flexi Mop With Handle Colors", unit: "Select quantity", image: FlexiMopWithHandleColors },
  { id: "flexi-mop-with-handle", name: "Flexi Mop With Handle", unit: "Select quantity", image: FlexiMopWithHandle },
  { id: "floor-brush", name: "Floor brush", unit: "Select quantity", image: FloorBrush },
  { id: "floor-scrubbing-pad", name: "Floor scrubbing pad", unit: "Select quantity", image: FloorScrubbingPad },
  { id: "floor-scrubbing-brush", name: "Floor Scrubbing Brush", unit: "Select quantity", image: FloorScrubbingBrush },
  { id: "floor-wiper-16in", name: "Floor Wiper 16in", unit: "Select quantity", image: FloorWiper16in },
  { id: "floor-wiper-dual-blade-45cm", name: "Floor Wiper Dual Blade 45cm", unit: "Select quantity", image: FloorWiperDualBlade45cm },
  { id: "floor-wiper-dual-blade-55cm", name: "Floor Wiper Dual Blade 55cm", unit: "Select quantity", image: FloorWiperDualBlade55cm },
  { id: "floor-wiper-hd-black-18in-24in", name: "Floor Wiper HD Black 18in 24in", unit: "Select quantity", image: FloorWiperHDBlack18in24in },
  { id: "glass-applicator-refill", name: "Glass Applicator refill", unit: "Select quantity", image: GlassApplicatorRefill },
  { id: "glass-applicator", name: "Glass Applicator", unit: "Select quantity", image: GlassApplicator },
  { id: "glass-cloth", name: "Glass cloth", unit: "Select quantity", image: GlassCloth },
  { id: "glass-scraper-mini", name: "Glass scraper mini", unit: "Select quantity", image: GlassScraperMini },
  { id: "glass-scraper", name: "Glass scraper", unit: "Select quantity", image: GlassScraper },
  { id: "glass-squeege", name: "Glass squeege", unit: "Select quantity", image: GlassSqueege },
  { id: "iron-brush", name: "iron brush", unit: "Select quantity", image: IronBrush },
  { id: "jazz-spin-mop-bucket", name: "JAZZ SPIN MOP BUCKET", unit: "Select quantity", image: JAZZSPINMOPBUCKET },
  { id: "kentucky-mop-clip", name: "Kentucky mop clip", unit: "Select quantity", image: KentuckyMopClip },
  { id: "leaf-picker", name: "Leaf picker", unit: "Select quantity", image: LeafPicker },
  { id: "lobby-dustpan", name: "Lobby dustpan", unit: "Select quantity", image: LobbyDustpan },
  { id: "loop-mop-refill", name: "Loop Mop Refill", unit: "Select quantity", image: LoopMopRefill },
  { id: "loop-mop-with-handle-colors", name: "Loop Mop With Handle Colors", unit: "Select quantity", image: LoopMopWithHandleColors },
  { id: "loop-mop", name: "Loop Mop", unit: "Select quantity", image: LoopMop },
  { id: "magik-spin-mop-bucket", name: "MAGIK SPIN MOP BUCKET", unit: "Select quantity", image: MAGIKSPINMOPBUCKET },
  { id: "mega-mop-refill", name: "Mega Mop Refill", unit: "Select quantity", image: MegaMopRefill },
  { id: "mega-mop-with-handle", name: "Mega Mop With Handle", unit: "Select quantity", image: MegaMopWithHandle },
  { id: "metal-handle", name: "Metal handle", unit: "Select quantity", image: MetalHandle },
  { id: "microfiber-cloth", name: "Microfiber cloth", unit: "Select quantity", image: MicrofiberCloth },
  { id: "microfiber-loop-mop-with-handle", name: "Microfiber Loop Mop With Handle", unit: "Select quantity", image: MicrofiberLoopMopWithHandle },
  { id: "mop-clip", name: "Mop clip", unit: "Select quantity", image: MopClip },
  { id: "mop-cloth", name: "Mop cloth", unit: "Select quantity", image: MopCloth },
  { id: "plunger", name: "PLUNGER", unit: "Select quantity", image: PLUNGER },
  { id: "power-mop-refill", name: "Power Mop Refill", unit: "Select quantity", image: PowerMopRefill },
  { id: "power-mop-with-handle", name: "Power Mop With Handle", unit: "Select quantity", image: PowerMopWithHandle },
  { id: "push-broom", name: "Push Broom", unit: "Select quantity", image: PushBroom },
  { id: "que-manager", name: "Que manager", unit: "Select quantity", image: QueManager },
  { id: "replacement-rubber", name: "Replacement rubber", unit: "Select quantity", image: ReplacementRubber },
  { id: "rubber-hand-glouse", name: "Rubber hand glouse", unit: "Select quantity", image: RubberHandGlouse },
  { id: "sapphire-broom", name: "Sapphire Broom", unit: "Select quantity", image: SapphireBroom },
  { id: "shoe-shine-machine", name: "Shoe shine machine", unit: "Select quantity", image: ShoeShineMachine },
  { id: "sparkle-microfiber-flat-mop", name: "SPARKLE MICROFIBER FLAT MOP", unit: "Select quantity", image: SPARKLEMICROFIBERFLATMOP },
  { id: "spray-bottle-1", name: "Spray bottle 1", unit: "Select quantity", image: SprayBottle1 },
  { id: "spray-bottle", name: "Spray bottle", unit: "Select quantity", image: SprayBottle },
  { id: "teliscopic-poll", name: "Teliscopic poll", unit: "Select quantity", image: TeliscopicPoll },
  { id: "toilet-brush-1", name: "Toilet brush 1", unit: "Select quantity", image: ToiletBrush1 },
  { id: "tool-holder-1", name: "Tool holder 1", unit: "Select quantity", image: ToolHolder1 },
  { id: "tool-holder", name: "Tool holder", unit: "Select quantity", image: ToolHolder },
  { id: "trigger", name: "Trigger", unit: "Select quantity", image: Trigger },
  { id: "wonder-kitchen-wiper", name: "WONDER KITCHEN WIPER", unit: "Select quantity", image: WONDERKITCHENWIPER },
  { id: "wooden-handle", name: "Wooden handle", unit: "Select quantity", image: WoodenHandle },
  { id: "wooden-carpet-brush", name: "Wooden Carpet Brush", unit: "Select quantity", image: WoodenCarpetBrush },
];

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

export default function CleaningTools() {
  const [cart, setCart] = useState(() => getOrderCart());
  const [showProduct, setShowProduct] = useState(null);
  const [showOrder, setShowOrder] = useState(false);
  const [customer, setCustomer] = useState(emptyCustomer);
  const [submitting, setSubmitting] = useState(false);
  const [successOrder, setSuccessOrder] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [orderedQuantities, setOrderedQuantities] = useState({});

  useEffect(() => {
    updateOrderCart(cart);
  }, [cart]);

  useEffect(() => {
    const shouldLock = Boolean(showProduct) || showOrder || Boolean(successOrder);
    document.body.style.overflow = shouldLock ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showProduct, showOrder, successOrder]);

  useEffect(() => {
    const loadOrderedQuantities = async () => {
      try {
        const response = await fetch(`${API_URL}/api/product-order-quantities`);
        if (!response.ok) return;
        const data = await response.json();
        if (data?.success && data?.quantities) setOrderedQuantities(data.quantities);
      } catch (error) {
        console.error("Unable to load ordered quantities:", error);
      }
    };
    loadOrderedQuantities();
  }, []);

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + Number(item?.quantity || 0), 0),
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
      return [...current, {
        id: product.id,
        name: product.name,
        unit: product.unit,
        image: product.image,
        quantity: 1,
      }];
    });
    setShowProduct(null);
    setShowOrder(true);
  };

  const updateQuantity = (productId, change) => {
    setCart((current) =>
      current.map((item) =>
        item.id === productId
          ? { ...item, quantity: Number(item.quantity || 0) + change }
          : item
      ).filter((item) => Number(item.quantity || 0) > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((current) => current.filter((item) => item.id !== productId));
  };

  const handleCustomerChange = (event) => {
    const { name, value } = event.target;
    setCustomer((current) => ({ ...current, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const isValidPhone = (phone) =>
    /^[+]?[0-9()\-\s]{7,20}$/.test(phone.trim());

  const isValidEmail = (email) =>
    !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setErrorMessage("");

    if (!cart.length) return setErrorMessage("Please add at least one product.");
    if (!customer.name.trim()) return setErrorMessage("Please enter your name.");
    if (!isValidPhone(customer.phone)) return setErrorMessage("Please enter a valid phone number.");
    if (!customer.location.trim()) return setErrorMessage("Please enter your location.");
    if (!isValidEmail(customer.email)) return setErrorMessage("Please enter a valid email address.");

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
            name: item.name,
            unit: item.unit,
            quantity: Number(item.quantity),
          })),
          notes: customer.notes.trim(),
        }),
      });

      const responseText = await response.text();
      let data = {};
      if (responseText) {
        try { data = JSON.parse(responseText); }
        catch { data = { message: responseText }; }
      }
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Unable to submit your order.");
      }

      setSuccessOrder(data.order || data);
      setCart([]);
      updateOrderCart([]);
      setCustomer({ ...emptyCustomer });
      setShowOrder(false);
      try {
        const quantityResponse = await fetch(`${API_URL}/api/product-order-quantities`);
        if (quantityResponse.ok) {
          const quantityData = await quantityResponse.json();
          if (quantityData?.success && quantityData?.quantities) {
            setOrderedQuantities(quantityData.quantities);
          }
        }
      } catch (error) {
        console.error("Unable to refresh ordered quantities:", error);
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      setErrorMessage(error?.message || "Something went wrong while submitting your order.");
    } finally {
      setSubmitting(false);
    }
  };

  const closeSuccess = () => {
    setSuccessOrder(null);
    setErrorMessage("");
  };

  return (
    <main className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">CLEAN N CLEAR</span>
        <h1 className="ccq-title">Cleaning Tools &amp; <span>Accessories</span></h1>
        <p className="ccq-intro">
          Explore our cleaning tools and accessories for household,
          commercial and institutional cleaning requirements.
        </p>
      </header>

      {cartCount > 0 && (
        <button type="button" className="ccq-cart-button" onClick={() => {
          setErrorMessage("");
          setShowOrder(true);
        }}>
          <span>My Order</span><strong>{cartCount}</strong>
        </button>
      )}

      <div className="ccq-grid">
        {products.map((product) => {
          const ordered = Number(orderedQuantities[product.id] || 0);
          return (
            <article className="ccq-card" key={product.id}>
              <button
                type="button"
                className="ccq-image-button"
                onClick={() => setShowProduct(product)}
                aria-label={`View ${product.name}`}
              >
                <img className="ccq-product-image" src={product.image} alt={product.name} loading="lazy" />
              </button>
              <div className="ccq-card-content">
                <span className="ccq-category">Cleaning Tools</span>
                <h2 className="ccq-product-name">{product.name}</h2>
                <div className="ccq-unit">{product.unit}</div>
                {ordered > 0 && (
                  <div className="ccq-product-ordered">
                    <span>Ordered</span><strong>{ordered}</strong>
                  </div>
                )}
                <button type="button" className="ccq-add-button" onClick={() => addToCart(product)}>
                  Add to Order
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {showProduct && (
        <div className="ccq-overlay" onClick={() => setShowProduct(null)}>
          <div className="ccq-product-modal" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="ccq-close" onClick={() => setShowProduct(null)} aria-label="Close product">×</button>
            <div className="ccq-modal-image-wrap">
              <img className="ccq-modal-image" src={showProduct.image} alt={showProduct.name} />
            </div>
            <div className="ccq-modal-content">
              <span className="ccq-label">CLEAN N CLEAR</span>
              <h2>{showProduct.name}</h2>
              <div className="ccq-modal-unit">
                <span>Unit</span><strong>{showProduct.unit}</strong>
              </div>
              <button type="button" className="ccq-add-large" onClick={() => addToCart(showProduct)}>
                Add to Order
              </button>
            </div>
          </div>
        </div>
      )}

      {showOrder && (
        <div className="ccq-overlay" onClick={() => setShowOrder(false)}>
          <div className="ccq-checkout" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="ccq-close" onClick={() => setShowOrder(false)} aria-label="Close order">×</button>
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
              ) : cart.map((item) => (
                <div className="ccq-cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="ccq-cart-item-info">
                    <h3>{item.name}</h3>
                    <small>{item.unit}</small>
                    <div className="ccq-quantity">
                      <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>−</button>
                      <strong>{item.quantity}</strong>
                      <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>+</button>
                    </div>
                  </div>
                  <button type="button" className="ccq-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <>
                <div className="ccq-final-summary">
                  <div><span>Selected items</span><strong>{cartCount}</strong></div>
                </div>
                <form className="ccq-form" onSubmit={handleSubmitOrder}>
                  <div className="ccq-form-grid">
                    <div className="ccq-field">
                      <label htmlFor="tools-name">Name *</label>
                      <input id="tools-name" name="name" value={customer.name} onChange={handleCustomerChange} placeholder="Enter your name" required />
                    </div>
                    <div className="ccq-field">
                      <label htmlFor="tools-phone">Phone Number *</label>
                      <input id="tools-phone" type="tel" name="phone" value={customer.phone} onChange={handleCustomerChange} placeholder="Enter phone number" required />
                    </div>
                    <div className="ccq-field">
                      <label htmlFor="tools-email">Email</label>
                      <input id="tools-email" type="email" name="email" value={customer.email} onChange={handleCustomerChange} placeholder="Enter email address" />
                    </div>
                    <div className="ccq-field">
                      <label htmlFor="tools-company">Company</label>
                      <input id="tools-company" name="company" value={customer.company} onChange={handleCustomerChange} placeholder="Company name" />
                    </div>
                    <div className="ccq-field">
                      <label htmlFor="tools-location">Location *</label>
                      <input id="tools-location" name="location" value={customer.location} onChange={handleCustomerChange} placeholder="City / Location" required />
                    </div>
                    <div className="ccq-field">
                      <label htmlFor="tools-notes">Additional Requirements</label>
                      <textarea id="tools-notes" name="notes" value={customer.notes} onChange={handleCustomerChange} placeholder="Tell us about your requirement..." rows="4" />
                    </div>
                  </div>

                  {errorMessage && <div className="ccq-error">{errorMessage}</div>}

                  <div className="ccq-form-actions">
                    <button type="button" className="ccq-back-button" onClick={() => setShowOrder(false)}>Continue Shopping</button>
                    <button type="submit" className="ccq-submit" disabled={submitting}>
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
            <p>Your order has been submitted successfully. Our team will review your requirement and contact you shortly.</p>
            {(successOrder?.id || successOrder?.orderId) && (
              <div className="ccq-order-number">
                <small>Order Number</small>
                <strong>{successOrder.id || successOrder.orderId}</strong>
              </div>
            )}
            <button type="button" className="ccq-success-button" onClick={closeSuccess}>Continue Shopping</button>
          </div>
        </div>
      )}
    </main>
  );
}
