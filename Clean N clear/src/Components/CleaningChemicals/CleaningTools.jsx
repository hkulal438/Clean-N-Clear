
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./CleaningChemicals.css";

import {
  getOrderCart,
  updateOrderCart,
} from "../../utils/OrderCart";

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

const WHATSAPP_NUMBER = "918147304734";

const products = [
  { id: "aluminium-handle", name: "Aluminium handle", category: "Cleaning Tools", image: AluminiumHandle },
  { id: "aroma-toilet-brush-with-stand", name: "AROMA TOILET BRUSH WITH STAND", category: "Cleaning Tools", image: AROMATOILETBRUSHWITHSTAND },
  { id: "carpet-brush", name: "Carpet Brush", category: "Cleaning Tools", image: CarpetBrush },
  { id: "caution-sign-board", name: "Caution sign board", category: "Cleaning Tools", image: CautionSignBoard },
  { id: "ceiling-brush", name: "Ceiling Brush", category: "Cleaning Tools", image: CeilingBrush },
  { id: "checked-cloth", name: "Checked cloth", category: "Cleaning Tools", image: CheckedCloth },
  { id: "cloth-brush", name: "Cloth brush", category: "Cleaning Tools", image: ClothBrush },
  { id: "co-web-brush", name: "Co web brush", category: "Cleaning Tools", image: CoWebBrush },
  { id: "co-web-triangle-brush", name: "Co web triangle brush", category: "Cleaning Tools", image: CoWebTriangleBrush },
  { id: "cobweb-brush", name: "Cobweb Brush", category: "Cleaning Tools", image: CobwebBrush },
  { id: "cotton-cut-end-refill-2", name: "Cotton Cut End Refill 2", category: "Cleaning Tools", image: CottonCutEndRefill2 },
  { id: "cotton-jumbo-wet-mop-refill", name: "Cotton Jumbo Wet Mop Refill", category: "Cleaning Tools", image: CottonJumboWetMopRefill },
  { id: "cotton-loop-mop-refill-2a", name: "Cotton Loop Mop Refill 2", category: "Cleaning Tools", image: CottonLoopMopRefill2 },
  { id: "cotton-loop-mop-refill-1", name: "Cotton Loop Mop Refill 1", category: "Cleaning Tools", image: CottonLoopMopRefill1 },
  { id: "cotton-loop-mop-refill-2b", name: "Cotton Loop Mop Refill 2", category: "Cleaning Tools", image: CottonLoopMopRefill22 },
  { id: "cotton-loop-mop-refill-3", name: "Cotton Loop Mop Refill 3", category: "Cleaning Tools", image: CottonLoopMopRefill3 },
  { id: "cotton-loop-mop-refill", name: "Cotton Loop Mop Refill", category: "Cleaning Tools", image: CottonLoopMopRefill },
  { id: "damp-mop-40cm", name: "Damp Mop 40cm", category: "Cleaning Tools", image: DampMop40cm },
  { id: "deck-mop-refill", name: "Deck Mop Refill", category: "Cleaning Tools", image: DeckMopRefill },
  { id: "deck-mop-with-handle", name: "Deck Mop With Handle", category: "Cleaning Tools", image: DeckMopWithHandle },
  { id: "dry-mop-refill-18in-24in", name: "Dry Mop Refill 18in 24in", category: "Cleaning Tools", image: DryMopRefill18in24in },
  { id: "dry-mop-set-18in-24in", name: "Dry Mop Set 18in 24in", category: "Cleaning Tools", image: DryMopSet18in24in },
  { id: "feather-duster-1", name: "Feather duster 1", category: "Cleaning Tools", image: FeatherDuster1 },
  { id: "feather-duster", name: "Feather duster", category: "Cleaning Tools", image: FeatherDuster },
  { id: "flat-mop-45cm", name: "Flat Mop 45cm", category: "Cleaning Tools", image: FlatMop45cm },
  { id: "flat-mop-55cm", name: "Flat Mop 55cm", category: "Cleaning Tools", image: FlatMop55cm },
  { id: "flat-mop-refill-45cm-60cm", name: "Flat Mop Refill 45cm 60cm", category: "Cleaning Tools", image: FlatMopRefill45cm60cm },
  { id: "flexi-mop-refill", name: "Flexi Mop Refill", category: "Cleaning Tools", image: FlexiMopRefill },
  { id: "flexi-mop-with-handle-colors", name: "Flexi Mop With Handle Colors", category: "Cleaning Tools", image: FlexiMopWithHandleColors },
  { id: "flexi-mop-with-handle", name: "Flexi Mop With Handle", category: "Cleaning Tools", image: FlexiMopWithHandle },
  { id: "floor-brush", name: "Floor brush", category: "Cleaning Tools", image: FloorBrush },
  { id: "floor-scrubbing-pad", name: "Floor scrubbing pad", category: "Cleaning Tools", image: FloorScrubbingPad },
  { id: "floor-scrubbing-brush", name: "Floor Scrubbing Brush", category: "Cleaning Tools", image: FloorScrubbingBrush },
  { id: "floor-wiper-16in", name: "Floor Wiper 16in", category: "Cleaning Tools", image: FloorWiper16in },
  { id: "floor-wiper-dual-blade-45cm", name: "Floor Wiper Dual Blade 45cm", category: "Cleaning Tools", image: FloorWiperDualBlade45cm },
  { id: "floor-wiper-dual-blade-55cm", name: "Floor Wiper Dual Blade 55cm", category: "Cleaning Tools", image: FloorWiperDualBlade55cm },
  { id: "floor-wiper-hd-black-18in-24in", name: "Floor Wiper HD Black 18in 24in", category: "Cleaning Tools", image: FloorWiperHDBlack18in24in },
  { id: "glass-applicator-refill", name: "Glass Applicator refill", category: "Cleaning Tools", image: GlassApplicatorRefill },
  { id: "glass-applicator", name: "Glass Applicator", category: "Cleaning Tools", image: GlassApplicator },
  { id: "glass-cloth", name: "Glass cloth", category: "Cleaning Tools", image: GlassCloth },
  { id: "glass-scraper-mini", name: "Glass scraper mini", category: "Cleaning Tools", image: GlassScraperMini },
  { id: "glass-scraper", name: "Glass scraper", category: "Cleaning Tools", image: GlassScraper },
  { id: "glass-squeege", name: "Glass squeege", category: "Cleaning Tools", image: GlassSqueege },
  { id: "iron-brush", name: "iron brush", category: "Cleaning Tools", image: IronBrush },
  { id: "jazz-spin-mop-bucket", name: "JAZZ SPIN MOP BUCKET", category: "Cleaning Tools", image: JAZZSPINMOPBUCKET },
  { id: "kentucky-mop-clip", name: "Kentucky mop clip", category: "Cleaning Tools", image: KentuckyMopClip },
  { id: "leaf-picker", name: "Leaf picker", category: "Cleaning Tools", image: LeafPicker },
  { id: "lobby-dustpan", name: "Lobby dustpan", category: "Cleaning Tools", image: LobbyDustpan },
  { id: "loop-mop-refill", name: "Loop Mop Refill", category: "Cleaning Tools", image: LoopMopRefill },
  { id: "loop-mop-with-handle-colors", name: "Loop Mop With Handle Colors", category: "Cleaning Tools", image: LoopMopWithHandleColors },
  { id: "loop-mop", name: "Loop Mop", category: "Cleaning Tools", image: LoopMop },
  { id: "magik-spin-mop-bucket", name: "MAGIK SPIN MOP BUCKET", category: "Cleaning Tools", image: MAGIKSPINMOPBUCKET },
  { id: "mega-mop-refill", name: "Mega Mop Refill", category: "Cleaning Tools", image: MegaMopRefill },
  { id: "mega-mop-with-handle", name: "Mega Mop With Handle", category: "Cleaning Tools", image: MegaMopWithHandle },
  { id: "metal-handle", name: "Metal handle", category: "Cleaning Tools", image: MetalHandle },
  { id: "microfiber-cloth", name: "Microfiber cloth", category: "Cleaning Tools", image: MicrofiberCloth },
  { id: "microfiber-loop-mop-with-handle", name: "Microfiber Loop Mop With Handle", category: "Cleaning Tools", image: MicrofiberLoopMopWithHandle },
  { id: "mop-clip", name: "Mop clip", category: "Cleaning Tools", image: MopClip },
  { id: "mop-cloth", name: "Mop cloth", category: "Cleaning Tools", image: MopCloth },
  { id: "plunger", name: "PLUNGER", category: "Cleaning Tools", image: PLUNGER },
  { id: "power-mop-refill", name: "Power Mop Refill", category: "Cleaning Tools", image: PowerMopRefill },
  { id: "power-mop-with-handle", name: "Power Mop With Handle", category: "Cleaning Tools", image: PowerMopWithHandle },
  { id: "push-broom", name: "Push Broom", category: "Cleaning Tools", image: PushBroom },
  { id: "que-manager", name: "Que manager", category: "Cleaning Tools", image: QueManager },
  { id: "replacement-rubber", name: "Replacement rubber", category: "Cleaning Tools", image: ReplacementRubber },
  { id: "rubber-hand-glouse", name: "Rubber hand glouse", category: "Cleaning Tools", image: RubberHandGlouse },
  { id: "sapphire-broom", name: "Sapphire Broom", category: "Cleaning Tools", image: SapphireBroom },
  { id: "shoe-shine-machine", name: "Shoe shine machine", category: "Cleaning Tools", image: ShoeShineMachine },
  { id: "sparkle-microfiber-flat-mop", name: "SPARKLE MICROFIBER FLAT MOP", category: "Cleaning Tools", image: SPARKLEMICROFIBERFLATMOP },
  { id: "spray-bottle-1", name: "Spray bottle 1", category: "Cleaning Tools", image: SprayBottle1 },
  { id: "spray-bottle", name: "Spray bottle", category: "Cleaning Tools", image: SprayBottle },
  { id: "teliscopic-poll", name: "Teliscopic poll", category: "Cleaning Tools", image: TeliscopicPoll },
  { id: "toilet-brush-1", name: "Toilet brush 1", category: "Cleaning Tools", image: ToiletBrush1 },
  { id: "tool-holder-1", name: "Tool holder 1", category: "Cleaning Tools", image: ToolHolder1 },
  { id: "tool-holder", name: "Tool holder", category: "Cleaning Tools", image: ToolHolder },
  { id: "trigger", name: "Trigger", category: "Cleaning Tools", image: Trigger },
  { id: "wonder-kitchen-wiper", name: "WONDER KITCHEN WIPER", category: "Cleaning Tools", image: WONDERKITCHENWIPER },
  { id: "wooden-handle", name: "Wooden handle", category: "Cleaning Tools", image: WoodenHandle },
  { id: "wooden-carpet-brush", name: "Wooden Carpet Brush", category: "Cleaning Tools", image: WoodenCarpetBrush },
];

const emptyCustomer = {
  name: "",
  phone: "",
  email: "",
  company: "",
  location: "",
  notes: "",
};

const CleaningTools = () => {
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
          `${index + 1}. ${item.name}\nQuantity: ${item.quantity}`
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

    const whatsappURL =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="ccq-section">
      <header className="ccq-header">
        <span className="ccq-label">CLEAN N CLEAR</span>

        <h1 className="ccq-title">
          Cleaning Tools &amp; <span>Accessories</span>
        </h1>

        <p className="ccq-intro">
          Explore our cleaning tools and accessories for household,
          commercial and institutional cleaning requirements.
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
        <div className="ccq-overlay" onClick={() => setSelectedProduct(null)}>
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
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="ccq-modal-image"
              />
            </div>

            <div className="ccq-modal-content">
              <span className="ccq-category">{selectedProduct.category}</span>
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
                <h2>My Order</h2>
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
                  <span>Selected items</span>
                  <strong>{cartCount}</strong>
                </div>

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
        <div className="ccq-overlay" onClick={() => {}}>
          <div className="ccq-checkout">
            <button
              type="button"
              className="ccq-close"
              onClick={backToCart}
              aria-label="Back to cart"
            >
              ×
            </button>

            <div className="ccq-checkout-heading">
              <span className="ccq-label">CLEAN N CLEAR</span>
              <h2>Customer Details</h2>
              <p>
                Fill in your details and continue to WhatsApp to send your
                product enquiry.
              </p>
            </div>

            {error && <div className="ccq-error">{error}</div>}

            <form className="ccq-form" onSubmit={submitOrder}>
              <div className="ccq-form-grid">
                <div className="ccq-field">
                  <label htmlFor="tools-name">Name *</label>
                  <input
                    id="tools-name"
                    name="name"
                    value={customer.name}
                    onChange={handleCustomerChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="tools-phone">Phone Number *</label>
                  <input
                    id="tools-phone"
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
                  <label htmlFor="tools-email">Email</label>
                  <input
                    id="tools-email"
                    type="email"
                    name="email"
                    value={customer.email}
                    onChange={handleCustomerChange}
                    placeholder="Enter email address"
                    autoComplete="email"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="tools-company">Company</label>
                  <input
                    id="tools-company"
                    name="company"
                    value={customer.company}
                    onChange={handleCustomerChange}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="tools-location">Location *</label>
                  <input
                    id="tools-location"
                    name="location"
                    value={customer.location}
                    onChange={handleCustomerChange}
                    placeholder="City / Location"
                    required
                  />
                </div>

                <div className="ccq-field">
                  <label htmlFor="tools-notes">Additional Requirements</label>
                  <textarea
                    id="tools-notes"
                    name="notes"
                    value={customer.notes}
                    onChange={handleCustomerChange}
                    placeholder="Tell us about your requirements..."
                    rows={4}
                  />
                </div>
              </div>

              <div className="ccq-final-summary">
                <h3>Order Summary</h3>

                {cart.map((item) => (
                  <div className="ccq-final-item" key={item.id}>
                    <span>{item.name}</span>
                    <strong>× {item.quantity}</strong>
                  </div>
                ))}

                <div className="ccq-total">
                  <span>Total quantity</span>
                  <strong>{cartCount}</strong>
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

export default CleaningTools;
