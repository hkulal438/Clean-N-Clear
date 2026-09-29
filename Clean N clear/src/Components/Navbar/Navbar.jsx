import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import "./Navbar.css";

import logo from "../../images/CLEANNCLEAR_LOGO-01.png";
import whatsappIcon from "../../images/WhatsApp.png";

import {
  getOrderCart,
  getOrderCount,
} from "../../utils/OrderCart";

/* =========================================================
   NAVIGATION
   ========================================================= */

const NAV_LINKS = [
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
   CONSTANTS
   ========================================================= */

const WHATSAPP_NUMBER = "919901384734";

/* =========================================================
   NAVBAR
   ========================================================= */

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [cartCount, setCartCount] = useState(() => {
    try {
      return getOrderCount(getOrderCart());
    } catch (error) {
      console.error("Unable to load cart count:", error);
      return 0;
    }
  });

  const navRef = useRef(null);

  /* =======================================================
     CART COUNT REFRESH
     ======================================================= */

  useEffect(() => {
    const refreshCartCount = () => {
      try {
        const cart = getOrderCart();
        const count = getOrderCount(cart);

        setCartCount(count);
      } catch (error) {
        console.error("Unable to refresh cart count:", error);
        setCartCount(0);
      }
    };

    refreshCartCount();

    window.addEventListener(
      "cnc-order-count-updated",
      refreshCartCount
    );

    window.addEventListener(
      "storage",
      refreshCartCount
    );

    window.addEventListener(
      "focus",
      refreshCartCount
    );

    return () => {
      window.removeEventListener(
        "cnc-order-count-updated",
        refreshCartCount
      );

      window.removeEventListener(
        "storage",
        refreshCartCount
      );

      window.removeEventListener(
        "focus",
        refreshCartCount
      );
    };
  }, []);

  /* =======================================================
     CLOSE DROPDOWN WHEN CLICKING OUTSIDE
     ======================================================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =======================================================
     ESCAPE
     ======================================================= */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =======================================================
     BODY SCROLL
     ======================================================= */

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* =======================================================
     DROPDOWN
     ======================================================= */

  const toggleDropdown = (label) => {
    setOpenDropdown((previous) =>
      previous === label ? null : label
    );
  };

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const openMobileMenu = () => {
    setOpenDropdown(null);
    setMobileOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  /* =======================================================
     NAVIGATION
     ======================================================= */

  const handleNavigation = () => {
    setOpenDropdown(null);
    setMobileOpen(false);
  };

  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <header
      className={`rt-header ${
        mobileOpen
          ? "rt-header--menu-open"
          : ""
      }`}
    >
      {/* ===================================================
          MAIN NAVBAR
          =================================================== */}

      <nav
        className="rt-navbar"
        ref={navRef}
      >
        <div className="rt-navbar__inner">

          {/* =================================================
              LOGO
              ================================================= */}

          <a
            href="/"
            className="rt-navbar__logo"
            aria-label="Clean N Clear"
            onClick={handleNavigation}
          >
            <img
              src={logo}
              alt="Clean N Clear"
            />
          </a>

          {/* =================================================
              DESKTOP NAVIGATION
              ================================================= */}

          <ul className="rt-navbar__links">

            {NAV_LINKS.map((item) => {
              const hasChildren =
                Boolean(item.children);

              const isOpen =
                openDropdown === item.label;

              return (
                <li
                  key={item.label}
                  className={`rt-navbar__item ${
                    hasChildren
                      ? "has-dropdown"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    if (
                      hasChildren &&
                      window.innerWidth > 1100
                    ) {
                      setOpenDropdown(item.label);
                    }
                  }}
                  onMouseLeave={() => {
                    if (
                      hasChildren &&
                      window.innerWidth > 1100
                    ) {
                      setOpenDropdown(null);
                    }
                  }}
                >

                  {hasChildren ? (
                    <div className="rt-navbar__dropdown-trigger">

                      <a
                        href={item.href}
                        className="rt-navbar__link rt-navbar__link--main"
                        onClick={handleNavigation}
                      >
                        <span>
                          {item.label}
                        </span>
                      </a>

                      <button
                        type="button"
                        className="rt-navbar__dropdown-button"
                        aria-label={`Open ${item.label} menu`}
                        aria-expanded={isOpen}
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();

                          toggleDropdown(
                            item.label
                          );
                        }}
                      >
                        <svg
                          className={`rt-navbar__caret ${
                            isOpen
                              ? "is-open"
                              : ""
                          }`}
                          width="9"
                          height="6"
                          viewBox="0 0 9 6"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 1l3.5 3.5L8 1"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            fill="none"
                          />
                        </svg>
                      </button>

                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className={`rt-navbar__link ${
                        item.label === "Home"
                          ? "is-active"
                          : ""
                      }`}
                      onClick={handleNavigation}
                    >
                      {item.label}
                    </a>
                  )}

                  {/* DESKTOP DROPDOWN */}

                  {hasChildren && (
                    <ul
                      className={`rt-dropdown ${
                        isOpen
                          ? "is-open"
                          : ""
                      }`}
                    >
                      {item.children.map(
                        (child) => (
                          <li
                            key={child.label}
                          >
                            <a
                              href={child.href}
                              onClick={
                                handleNavigation
                              }
                            >
                              {child.label}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
                  )}

                </li>
              );
            })}

          </ul>

          {/* =================================================
              DESKTOP ACTIONS
              ================================================= */}

          <div className="rt-navbar__actions">

            {/* WHATSAPP */}

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rt-navbar__whatsapp"
              aria-label="WhatsApp"
            >
              <img
                src={whatsappIcon}
                alt="WhatsApp"
              />
            </a>

            {/* GET A QUOTE */}

            <a
              href="/request-a-quote"
              className="rt-navbar__cta"
              onClick={handleNavigation}
            >
              Get a Quote
            </a>

          </div>

          {/* =================================================
              CART
              ================================================= */}

          <a
            href="/order-cart"
            className="rt-navbar__cart"
            aria-label={`My Order - ${cartCount} items`}
            onClick={handleNavigation}
          >
            <span
              className="rt-navbar__cart-icon"
              aria-hidden="true"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 4H5L7.4 15.2C7.6 16.1 8.4 16.8 9.4 16.8H17.6C18.5 16.8 19.3 16.2 19.6 15.3L21 9H6"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <circle
                  cx="9.5"
                  cy="20"
                  r="1.3"
                  fill="currentColor"
                />

                <circle
                  cx="17.5"
                  cy="20"
                  r="1.3"
                  fill="currentColor"
                />
              </svg>
            </span>

            <span className="rt-navbar__cart-count">
              {cartCount}
            </span>
          </a>

          {/* =================================================
              MOBILE HAMBURGER
              ================================================= */}

          <button
            type="button"
            className="rt-hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={openMobileMenu}
          >
            <span />
            <span />
            <span />
          </button>

        </div>

        {/* ===================================================
            MOBILE MENU
            THIS IS PART OF THE SAME NAVBAR.
            NO SUBNAVBAR.
            =================================================== */}

        <div
          className={`rt-mobile-menu ${
            mobileOpen
              ? "is-open"
              : ""
          }`}
        >

          <div className="rt-mobile-menu__inner">

            {/* MOBILE MENU HEADER */}

            <div className="rt-mobile-menu__header">

              <span className="rt-mobile-menu__title">
                Menu
              </span>

              <button
                type="button"
                className="rt-mobile-menu__close"
                aria-label="Close menu"
                onClick={closeMobileMenu}
              >
                <span />
                <span />
              </button>

            </div>

            {/* MOBILE NAV LINKS */}

            <ul className="rt-mobile-menu__links">

              {NAV_LINKS.map((item) => {
                const hasChildren =
                  Boolean(item.children);

                const isOpen =
                  openDropdown === item.label;

                return (
                  <li
                    key={item.label}
                    className={
                      hasChildren
                        ? "has-dropdown"
                        : ""
                    }
                  >

                    <div className="rt-mobile-menu__link-row">

                      <a
                        href={item.href}
                        onClick={handleNavigation}
                      >
                        {item.label}
                      </a>

                      {hasChildren && (
                        <button
                          type="button"
                          className="rt-mobile-menu__dropdown-button"
                          aria-label={`Open ${item.label} submenu`}
                          aria-expanded={isOpen}
                          onClick={() =>
                            toggleDropdown(
                              item.label
                            )
                          }
                        >
                          <svg
                            className={
                              isOpen
                                ? "is-open"
                                : ""
                            }
                            width="10"
                            height="6"
                            viewBox="0 0 10 6"
                            fill="none"
                          >
                            <path
                              d="M1 1L5 5L9 1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}

                    </div>

                    {hasChildren && (
                      <ul
                        className={`rt-mobile-dropdown ${
                          isOpen
                            ? "is-open"
                            : ""
                        }`}
                      >
                        {item.children.map(
                          (child) => (
                            <li
                              key={
                                child.label
                              }
                            >
                              <a
                                href={
                                  child.href
                                }
                                onClick={
                                  handleNavigation
                                }
                              >
                                {child.label}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    )}

                  </li>
                );
              })}

            </ul>

            {/* =================================================
                MOBILE ACTIONS
                AFTER ALL NAV LINKS
                ================================================= */}

            <div className="rt-mobile-actions">

              {/* WHATSAPP */}

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rt-mobile-whatsapp"
                aria-label="WhatsApp"
              >
                <img
                  src={whatsappIcon}
                  alt="WhatsApp"
                />
              </a>

              {/* GET A QUOTE */}

              <a
                href="/request-a-quote"
                className="rt-mobile-quote"
                onClick={handleNavigation}
              >
                Get a Quote
              </a>

              {/* CART */}

              <a
                href="/order-cart"
                className="rt-mobile-cart"
                aria-label={`My Order - ${cartCount} items`}
                onClick={handleNavigation}
              >
                <span className="rt-mobile-cart__icon">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M3 4H5L7.4 15.2C7.6 16.1 8.4 16.8 9.4 16.8H17.6C18.5 16.8 19.3 16.2 19.6 15.3L21 9H6"
                      stroke="currentColor"
                      strokeWidth="1.9"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    <circle
                      cx="9.5"
                      cy="20"
                      r="1.3"
                      fill="currentColor"
                    />

                    <circle
                      cx="17.5"
                      cy="20"
                      r="1.3"
                      fill="currentColor"
                    />
                  </svg>
                </span>

                <span className="rt-mobile-cart__count">
                  {cartCount}
                </span>
              </a>

            </div>

          </div>
        </div>

      </nav>
    </header>
  );
}