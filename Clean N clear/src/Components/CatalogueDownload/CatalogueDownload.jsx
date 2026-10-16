
import "./CatalogueDownload.css";

import "./CatalogueDownload.css";

import ProductCatalogue from "../../images/01_Clean_N_Clear_Product_Catalogue.png";
import ProductCatalogue2026 from "../../images/02_Clean_N_Clear_Product_Catalogue_2026.png";
import KarcherCatalogue from "../../images/03_Karcher_Catalogue_2026.png";
import PortfolioCatalogue from "../../images/04_Portfolio_Catalogue.png";

const catalogues = [
  {
    id: 1,
    title: "Clean N Clear Product Catalogue",
    description:
      "Explore our range of cleaning chemicals, tools and professional cleaning solutions.",
    image: ProductCatalogue,
    pdf: "/catalogues/Clean n clear product catalog .pdf",
    imageAlt: "Clean N Clear product catalogue cover",
    label: "PRODUCT RANGE",
  },
  {
    id: 2,
    title: "Clean N Clear Product Catalogue 2026",
    description:
      "Discover our latest cleaning products, professional tools and hygiene solutions.",
    image: ProductCatalogue2026,
    pdf: "/catalogues/CLEAN N CLEAR PRODUCT CATALOG 2026.pdf",
    imageAlt: "Clean N Clear 2026 product catalogue cover",
    label: "2026 EDITION",
  },
  {
    id: 3,
    title: "Kärcher Catalogue 2026",
    description:
      "Discover professional Kärcher cleaning equipment and advanced cleaning technology.",
    image: KarcherCatalogue,
    pdf: "/catalogues/Karcher Catalogue 2026.pdf",
    imageAlt: "Kärcher Catalogue 2026 cover",
    label: "PROFESSIONAL EQUIPMENT",
  },
  {
    id: 4,
    title: "Portfolio Catalogue",
    description:
      "Explore our cleaning solutions, trusted brands and professional partnerships.",
    image: PortfolioCatalogue,
    pdf: "/catalogues/Portfolio catalogue_compressed.pdf",
    imageAlt: "Clean N Clear portfolio catalogue cover",
    label: "OUR PORTFOLIO",
  },
];

function CatalogueDownload() {
  return (
    <main className="cnc-catalogue-section">
      <div className="cnc-catalogue-container">
        <header className="cnc-catalogue-heading">
          <span className="cnc-catalogue-eyebrow">
            EXPLORE OUR COLLECTION
          </span>

          <h1>
            Our <span>Catalogues</span>
          </h1>

          <p>
            Find the right cleaning products and professional solutions
            for your business with our latest catalogues.
          </p>

          <div className="cnc-catalogue-heading-line" />
        </header>

        <div className="cnc-catalogue-list">
          {catalogues.map((catalogue) => (
            <article
              className="cnc-catalogue-banner"
              key={catalogue.id}
            >
              <img
                className="cnc-catalogue-banner-image"
                src={catalogue.image}
                alt={catalogue.imageAlt}
                loading={catalogue.id === 1 ? "eager" : "lazy"}
              />

              <div className="cnc-catalogue-banner-overlay" />

              <div className="cnc-catalogue-banner-content">
                <span className="cnc-catalogue-banner-label">
                  {catalogue.label}
                </span>

                <h2>{catalogue.title}</h2>

                <p>{catalogue.description}</p>

                <a
                  className="cnc-catalogue-download-btn"
                  href={catalogue.pdf}
                  download
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M5 17v3h14v-3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <span>Download Catalogue</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="cnc-catalogue-support">
          <div className="cnc-catalogue-support-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M4 5h16v11H9l-5 4V5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path
                d="M8 9h8M8 12h5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className="cnc-catalogue-support-content">
            <h3>Need help choosing the right products?</h3>
            <p>
              Contact our team for product recommendations and
              professional cleaning solutions tailored to your needs.
            </p>
          </div>

          <a
            href="/contact"
            className="cnc-catalogue-contact-btn"
          >
            Contact Our Team
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </main>
  );
}

export default CatalogueDownload;
