import React, {
  useState,
  useEffect,
} from "react";

import { Link } from "react-router-dom";

import "./subNavbar.css";

import logo from "../../images/CLEANNCLEAR_LOGO-01.png";
import whatsappIcon from "../../images/WhatsApp.png";

/* =========================================================
   MENU ITEMS
   ========================================================= */

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
    href: "/products",
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
    href: "/solutions",
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
    href: "/industries",
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

/* =========================================================
   WHATSAPP
   ========================================================= */

const WHATSAPP_NUMBER = "919597812345";

/* =========================================================
   SUB NAVBAR
   ========================================================= */

export default function SubNavbar({
  isOpen,
  onClose,
}) {
  const [expanded, setExpanded] = useState(null);

  /* =======================================================
     ESCAPE KEY
     ======================================================= */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose?.();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [isOpen, onClose]);

  /* =======================================================
     RESET WHEN CLOSED
     ======================================================= */

  useEffect(() => {
    if (!isOpen) {
      setExpanded(null);
    }
  }, [isOpen]);

  /* =======================================================
     TOGGLE SUBMENU
     ======================================================= */

  const toggleSection = (label) => {
    setExpanded((previous) =>
      previous === label
        ? null
        : label
    );
  };

  /* =======================================================
     CLOSE MENU
     ======================================================= */

  const handleClose = () => {
    setExpanded(null);
    onClose?.();
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <>
      {/* ===================================================
          OVERLAY
          =================================================== */}

      <div
        className={`rt-sub-overlay${
          isOpen ? " is-open" : ""
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ===================================================
          DRAWER
          =================================================== */}

      <aside
        id="rt-sub-navbar"
        className={`rt-sub-navbar${
          isOpen ? " is-open" : ""
        }`}
        aria-hidden={!isOpen}
      >

        {/* =================================================
            HEADER
            ================================================= */}

        <div className="rt-sub-navbar__header">

          {/* LOGO */}

          <Link
            to="/"
            className="rt-sub-navbar__logo-link"
            onClick={handleClose}
            aria-label="Clean N Clear Home"
          >
            <img
              src={logo}
              alt="Clean N Clear"
              className="rt-sub-navbar__logo"
            />
          </Link>

          {/* CLOSE */}

          <button
            type="button"
            className="rt-sub-navbar__close"
            aria-label="Close menu"
            onClick={handleClose}
          >
            <span />
            <span />
          </button>

        </div>

        {/* =================================================
            SCROLL AREA
            ================================================= */}

        <nav
          className="rt-sub-navbar__scroll"
          aria-label="Mobile navigation"
        >

          <ul className="rt-sub-navbar__list">

            {MENU_ITEMS.map((item) => {
              const hasChildren =
                Boolean(item.children);

              const isExpanded =
                expanded === item.label;

              return (
                <li
                  key={item.label}
                  className="rt-sub-navbar__item"
                >

                  {/* =========================================
                      ITEMS WITH SUBMENU
                      ========================================= */}

                  {hasChildren ? (
                    <>
                      <div className="rt-sub-navbar__link-row">

                        {/* MAIN PAGE LINK */}

                        <Link
                          to={item.href}
                          className="rt-sub-navbar__link rt-sub-navbar__link--main"
                          onClick={handleClose}
                        >
                          <span>
                            {item.label}
                          </span>
                        </Link>

                        {/* ARROW BUTTON */}

                        <button
                          type="button"
                          className="rt-sub-navbar__dropdown-button"
                          aria-label={`Open ${item.label} menu`}
                          aria-expanded={isExpanded}
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();

                            toggleSection(
                              item.label
                            );
                          }}
                        >
                          <svg
                            className={`rt-sub-navbar__chevron${
                              isExpanded
                                ? " is-open"
                                : ""
                            }`}
                            width="14"
                            height="8"
                            viewBox="0 0 14 8"
                            aria-hidden="true"
                          >
                            <path
                              d="M1 1L7 7L13 1"
                              stroke="currentColor"
                              strokeWidth="1.8"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </button>

                      </div>

                      {/* =====================================
                          SUBMENU
                          ===================================== */}

                      <ul
                        className={`rt-sub-navbar__submenu${
                          isExpanded
                            ? " is-open"
                            : ""
                        }`}
                        style={{
                          maxHeight: isExpanded
                            ? `${
                                item.children.length *
                                  48 +
                                10
                              }px`
                            : "0px",
                        }}
                      >
                        {item.children.map(
                          (child) => (
                            <li
                              key={child.label}
                            >
                              <Link
                                to={child.href}
                                onClick={handleClose}
                              >
                                {child.label}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </>
                  ) : (

                    /* =========================================
                       NORMAL LINK
                       ========================================= */

                    <Link
                      to={item.href}
                      className="rt-sub-navbar__link"
                      onClick={handleClose}
                    >
                      <span>
                        {item.label}
                      </span>
                    </Link>

                  )}

                </li>
              );
            })}

          </ul>

          {/* =================================================
              BOTTOM ACTIONS
              ================================================= */}

          <div className="rt-sub-navbar__actions">

            {/* GET A QUOTE */}

            <Link
              to="/request-a-quote"
              className="rt-sub-navbar__quote"
              onClick={handleClose}
            >
              Get a Quote
            </Link>

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rt-sub-navbar__whatsapp"
              aria-label="WhatsApp"
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
              />
            </a>

          </div>

        </nav>

      </aside>
    </>
  );
}