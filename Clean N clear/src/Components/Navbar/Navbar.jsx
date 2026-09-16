import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";

import SubNavbar from "../subNavbar/subNavbar";
import logo from "../../images/CLEANNCLEAR_LOGO-01.png";

/* ------------------------------------------------------------------ */
/* Navigation Links */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Contact Details */
/* ------------------------------------------------------------------ */

const WHATSAPP_NUMBER = "919597812345";

const TOP_BAR_LOCATIONS = [
  "Roots Hygiene Solutions",
  "Roots Multi Clean",
];

/* ------------------------------------------------------------------ */
/* Navbar Component */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef(null);

  /* --------------------------------------------------------------- */
  /* Close dropdown when clicking outside navbar */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    }

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

  /* --------------------------------------------------------------- */
  /* Lock body scrolling when mobile menu is open */
  /* --------------------------------------------------------------- */

  useEffect(() => {
    document.body.style.overflow = mobileOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  /* --------------------------------------------------------------- */
  /* Toggle dropdown */
  /* --------------------------------------------------------------- */

  const toggleDropdown = (label) => {
    setOpenDropdown((previous) =>
      previous === label ? null : label
    );
  };

  /* --------------------------------------------------------------- */
  /* Close mobile menu */
  /* --------------------------------------------------------------- */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /* --------------------------------------------------------------- */
  /* Render */
  /* --------------------------------------------------------------- */

  return (
    <header className="rt-header">

      {/* ========================================================== */}
      {/* TOP INFORMATION BAR */}
      {/* ========================================================== */}

      <div className="rt-topbar">
        <div className="rt-topbar__inner">

          <ul className="rt-topbar__info">

            <li>
              Phone :{" "}
              <a href="tel:+919597812345">
                +91 95978 12345
              </a>
            </li>

            <li
              className="rt-topbar__divider"
              aria-hidden="true"
            />

            <li>
              Email :{" "}
              <a href="mailto:rmclsales@rootsemail.com">
                rmclsales@rootsemail.com
              </a>
            </li>

            <li
              className="rt-topbar__divider"
              aria-hidden="true"
            />

            <li>
              CIN – U36999TZ1992PLC003662
            </li>

          </ul>

          {/* Company Selector */}

          <div className="rt-topbar__select-wrap">

            <select
              className="rt-topbar__select"
              defaultValue={TOP_BAR_LOCATIONS[0]}
              aria-label="Select company"
            >
              {TOP_BAR_LOCATIONS.map((location) => (
                <option
                  key={location}
                  value={location}
                >
                  {location}
                </option>
              ))}
            </select>

          </div>

        </div>
      </div>


      {/* ========================================================== */}
      {/* MAIN NAVBAR */}
      {/* ========================================================== */}

      <nav
        className="rt-navbar"
        ref={navRef}
      >

        <div className="rt-navbar__inner">

          {/* ------------------------------------------------------ */}
          {/* LOGO */}
          {/* ------------------------------------------------------ */}

          <a
            href="/"
            className="rt-navbar__logo"
            aria-label="Clean N Clear - Home"
            onClick={() => {
              setOpenDropdown(null);
              closeMobileMenu();
            }}
          >
            <img
              src={logo}
              alt="Clean N Clear"
            />
          </a>


          {/* ------------------------------------------------------ */}
          {/* DESKTOP NAVIGATION */}
          {/* ------------------------------------------------------ */}

          <ul className="rt-navbar__links">

            {NAV_LINKS.map((item) => {

              const hasChildren =
                Boolean(item.children);

              const isOpen =
                openDropdown === item.label;

              return (

                <li
                  key={item.label}
                  className={`rt-navbar__item${
                    hasChildren
                      ? " has-dropdown"
                      : ""
                  }`}
                  onMouseEnter={() => {
                    if (hasChildren) {
                      setOpenDropdown(
                        item.label
                      );
                    }
                  }}
                  onMouseLeave={() => {
                    if (hasChildren) {
                      setOpenDropdown(null);
                    }
                  }}
                >

                  {/* ================================================= */}
                  {/* DROPDOWN MENU ITEM */}
                  {/* ================================================= */}

                  {hasChildren ? (

                    <button
                      type="button"
                      className={`rt-navbar__link${
                        item.label === "Home"
                          ? " is-active"
                          : ""
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                      onClick={() =>
                        toggleDropdown(
                          item.label
                        )
                      }
                    >

                      <span>
                        {item.label}
                      </span>

                      <svg
                        className={`rt-navbar__caret${
                          isOpen
                            ? " is-open"
                            : ""
                        }`}
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        aria-hidden="true"
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>

                    </button>

                  ) : (

                    /* ================================================= */
                    /* NORMAL NAVIGATION ITEM */
                    /* ================================================= */

                    <a
                      href={item.href}
                      className={`rt-navbar__link${
                        item.label === "Home"
                          ? " is-active"
                          : ""
                      }`}
                      onClick={() =>
                        setOpenDropdown(null)
                      }
                    >
                      {item.label}
                    </a>

                  )}


                  {/* ================================================= */}
                  {/* DROPDOWN */}
                  {/* ================================================= */}

                  {hasChildren && (

                    <ul
                      className={`rt-dropdown${
                        isOpen
                          ? " is-open"
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
                              onClick={() =>
                                setOpenDropdown(
                                  null
                                )
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


          {/* ========================================================== */}
          {/* DESKTOP ACTION BUTTONS */}
          {/* ========================================================== */}

          <div className="rt-navbar__actions">

            <a
              href="/request-a-quote"
              className="rt-navbar__cta rt-navbar__cta--solid"
            >
              Get a Quote
            </a>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rt-navbar__cta rt-navbar__cta--outline"
            >
              WhatsApp
            </a>

          </div>


          {/* ========================================================== */}
          {/* MOBILE HAMBURGER */}
          {/* ========================================================== */}

          <button
            type="button"
            className={`rt-hamburger${
              mobileOpen
                ? " is-active"
                : ""
            }`}
            aria-label={
              mobileOpen
                ? "Close menu"
                : "Open menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="rt-sub-navbar"
            onClick={() =>
              setMobileOpen(
                (previous) =>
                  !previous
              )
            }
          >

            <span />
            <span />
            <span />

          </button>

        </div>

      </nav>


      {/* ========================================================== */}
      {/* MOBILE SLIDE-IN MENU */}
      {/* ========================================================== */}

      <SubNavbar
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
      />

    </header>
  );
}