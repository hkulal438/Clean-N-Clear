import "./Why.css";

import {
  SprayCan,
  BrushCleaning,
  WashingMachine,
  HandHeart,
  House,
  Building2,
} from "lucide-react";

const supplies = [
  {
    title: "Cleaning Chemicals",
    description:
      "Professional cleaning chemicals for effective and reliable cleaning across different environments.",
    icon: SprayCan,
  },
  {
    title: "Cleaning Tools",
    description:
      "Practical cleaning tools designed for everyday cleaning, maintenance and hygiene requirements.",
    icon: BrushCleaning,
  },
  {
    title: "Professional Cleaning Equipment",
    description:
      "Professional cleaning equipment for efficient and high-performance cleaning applications.",
    icon: WashingMachine,
  },
  {
    title: "Hygiene Products",
    description:
      "Hygiene products that support clean, safe and well-maintained spaces.",
    icon: HandHeart,
  },
  {
    title: "Household Cleaning Products",
    description:
      "Cleaning products suited for regular household cleaning and maintenance needs.",
    icon: House,
  },
  {
    title: "Commercial & Institutional Supplies",
    description:
      "Cleaning and hygiene supplies for commercial, institutional and professional environments.",
    icon: Building2,
  },
];

function Why() {
  return (
    <section className="why-section">
      <div className="why-container">

        {/* =====================================================
            SECTION HEADING
            ===================================================== */}

        <div className="why-heading">
          <span>What We Supply</span>

          <h2>Complete Cleaning &amp; Hygiene Solutions</h2>

          <p>
            Quality products and professional solutions for commercial,
            household and institutional cleaning needs.
          </p>
        </div>

        {/* =====================================================
            SUPPLY CARDS
            ===================================================== */}

        <div className="why-items">
          {supplies.map((item) => {
            const Icon = item.icon;

            return (
              <div
                className="why-item-wrapper"
                key={item.title}
              >
                <div className="why-card">

                  {/* ICON */}

                  <div className="why-icon">
                    <Icon
                      size={38}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </div>

                  {/* CARD CONTENT */}

                  <div className="why-card-content">

                    <h3>{item.title}</h3>

                    <p>{item.description}</p>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default Why;