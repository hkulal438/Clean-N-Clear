
import "./Product.css";

import catChemicals from "../../images/cat-chemicals.jpg";
import catTools from "../../images/cat-tools.jpg";
import catEquipment from "../../images/cat-equipment.jpg";
import catHygiene from "../../images/cat-hygiene.jpg";

const PRODUCT_CATEGORIES = [
  {
    id: "cleaning-chemicals",
    number: "01",
    title: "Cleaning Chemicals",
    cta: "View Category",
    href: "/products/cleaning-chemicals",
    image: catChemicals,
  },
  {
    id: "cleaning-tools",
    number: "02",
    title: "Cleaning Tools",
    cta: "View Category",
    href: "/products/cleaning-tools",
    image: catTools,
  },
  {
    id: "cleaning-equipment",
    number: "03",
    title: "Cleaning Equipment",
    cta: "View Equipment",
    href: "/products/equipment",
    image: catEquipment,
  },
  {
    id: "hygiene-supplies",
    number: "04",
    title: "Hygiene Supplies",
    cta: "View Category",
    href: "/products/hygiene",
    image: catHygiene,
  },
];

function Product() {
  return (
    <section
      className="cnc-product-section"
      id="products"
      aria-labelledby="cnc-product-section-title"
    >
      <div className="cnc-product-section__container">

        <header className="cnc-product-section__header">
          <p className="cnc-product-section__eyebrow">
            <span
              className="cnc-product-section__eyebrow-line"
              aria-hidden="true"
            />
            Our Products
          </p>

          <h2
            id="cnc-product-section-title"
            className="cnc-product-section__title"
          >
            Cleaning Products &amp; Equipment
            <span>for Every Requirement</span>
          </h2>

          <p className="cnc-product-section__description">
            Explore our carefully selected range of cleaning chemicals,
            professional tools, equipment and hygiene solutions designed
            for reliable everyday cleaning.
          </p>
        </header>

        <div className="cnc-product-section__grid">
          {PRODUCT_CATEGORIES.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="cnc-product-card"
              aria-label={`${category.title} — ${category.cta}`}
            >
              <img
                className="cnc-product-card__image"
                src={category.image}
                alt={category.title}
                width={768}
                height={960}
                loading="lazy"
              />

              <span
                className="cnc-product-card__overlay"
                aria-hidden="true"
              />

              <span className="cnc-product-card__number">
                {category.number}
              </span>

              <span className="cnc-product-card__content">
                <span className="cnc-product-card__title">
                  {category.title}
                </span>

                <span className="cnc-product-card__bottom">
                  <span className="cnc-product-card__cta">
                    {category.cta}
                  </span>

                  <span
                    className="cnc-product-card__arrow"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 8h10" />
                      <path d="M9 4l4 4-4 4" />
                    </svg>
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Product;

