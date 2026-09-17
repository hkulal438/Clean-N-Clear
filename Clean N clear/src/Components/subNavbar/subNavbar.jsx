import React, { useState, useEffect } from "react";
import "./subNavbar.css";

import logo from "../../images/CLEANNCLEAR_LOGO-01.png";

/* ------------------------------------------------------------------ */
/* Menu Items */
/* ------------------------------------------------------------------ */

const MENU_ITEMS = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "About Us",
    href: "/about-us",
  },

  {
    label: "Products",
    children: [
      {
        label: "Cleaning Chemicals",
        href: "/products/cleaning-chemicals",
      },
      {
        label: "Cleaning Tools",
        href: "/products/cleaning-tools",
      },
      {
        label: "Professional Cleaning Equipment",
        href: "/products/professional-cleaning-equipment",
      },
      {
        label: "Hygiene Supplies",
        href: "/products/hygiene-supplies",
      },
      {
        label: "Household Cleaning",
        href: "/products/household-cleaning",
      },
      {
        label: "Commercial & Institutional Supplies",
        href: "/products/commercial-institutional-supplies",
      },
    ],
  },

  {
    label: "Solutions",
    children: [
      {
        label: "Commercial",
        href: "/solutions/commercial",
      },
      {
        label: "Household",
        href: "/solutions/household",
      },
      {
        label: "Institutional",
        href: "/solutions/institutional",
      },
      {
        label: "Retail",
        href: "/solutions/retail",
      },
      {
        label: "Wholesale",
        href: "/solutions/wholesale",
      },
    ],
  },

  {
    label: "Kärcher",
    href: "/karcher",
  },

  {
    label: "Industries",
    children: [
      {
        label: "Healthcare",
        href: "/industries/healthcare",
      },
      {
        label: "Hospitality",
        href: "/industries/hospitality",
      },
      {
        label: "Education",
        href: "/industries/education",
      },
      {
        label: "Offices & Commercial",
        href: "/industries/offices-commercial",
      },
      {
        label: "Industrial",
        href: "/industries/industrial",
      },
      {
        label: "Residential",
        href: "/industries/residential",
      },
    ],
  },

  {
    label: "Brands",
    href: "/brands",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];

const WHATSAPP_NUMBER = "919597812345";

export default function SubNavbar({ isOpen, onClose }) {
  const [expanded, setExpanded] = useState(null);

  /* --------------------------------------------------------------- */
  /* Close drawer with Escape key */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  /* --------------------------------------------------------------- */
  /* Reset accordion when drawer closes */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    if (!isOpen) {
      setExpanded(null);
    }
  }, [isOpen]);

  /* --------------------------------------------------------------- */
  /* Toggle submenu */
  /* --------------------------------------------------------------- */

  const toggleSection = (label) => {
    setExpanded((previous) =>
      previous === label ? null : label
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`rt-sub-overlay${isOpen ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Drawer */}
      <aside
        id="rt-sub-navbar"
        className={`rt-sub-navbar${isOpen ? " is-open" : ""}`}
        aria-hidden={!isOpen}
      >
        {/* --------------------------------------------------------- */}
        {/* Drawer Header */}
        {/* --------------------------------------------------------- */}

        <div className="rt-sub-navbar__header">
          <img
            src={logo}
            alt="Clean N Clear"
            className="rt-sub-navbar__logo"
          />

          <button
            type="button"
            className="rt-sub-navbar__close"
            aria-label="Close menu"
            onClick={onClose}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              aria-hidden="true"
            >
              <path
                d="M1 1l16 16M17 1L1 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* --------------------------------------------------------- */}
        {/* Navigation */}
        {/* --------------------------------------------------------- */}

        <nav className="rt-sub-navbar__scroll">
          <ul className="rt-sub-navbar__list">
            {MENU_ITEMS.map((item) => {
              const hasChildren = Boolean(item.children);
              const isExpanded = expanded === item.label;

              return (
                <li
                  key={item.label}
                  className="rt-sub-navbar__item"
                >
                  {hasChildren ? (
                    <>
                      {/* Parent Menu */}
                      <button
                        type="button"
                        className="rt-sub-navbar__link rt-sub-navbar__link--toggle"
                        aria-expanded={isExpanded}
                        onClick={() =>
                          toggleSection(item.label)
                        }
                      >
                        <span>{item.label}</span>

                        <svg
                          className={`rt-sub-navbar__chevron${
                            isExpanded ? " is-open" : ""
                          }`}
                          width="12"
                          height="7"
                          viewBox="0 0 12 7"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 1l5 5 5-5"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            fill="none"
                          />
                        </svg>
                      </button>

                      {/* Submenu */}
                      <ul
                        className={`rt-sub-navbar__submenu${
                          isExpanded ? " is-open" : ""
                        }`}
                        style={{
                          maxHeight: isExpanded
                            ? `${item.children.length * 46 + 12}px`
                            : "0px",
                        }}
                      >
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              onClick={onClose}
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    /* Normal Menu Item */
                    <a
                      href={item.href}
                      className="rt-sub-navbar__link"
                      onClick={onClose}
                    >
                      {item.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          {/* ------------------------------------------------------- */}
          {/* Action Buttons */}
          {/* ------------------------------------------------------- */}

          <div className="rt-sub-navbar__actions">
            <a
              href="/request-a-quote"
              className="rt-sub-navbar__btn rt-sub-navbar__btn--solid"
              onClick={onClose}
            >
              Get a Quote
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rt-sub-navbar__btn rt-sub-navbar__btn--outline"
            >
              WhatsApp
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}