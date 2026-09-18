import React, {
  useState,
  useRef,
  useEffect,
} from "react";

import "./Navbar.css";
import SubNavbar from "../subNavbar/subNavbar";

import logo from "../../images/CLEANNCLEAR_LOGO-01.png";
import whatsappIcon from "../../images/WhatsApp.png";


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

const WHATSAPP_NUMBER = "919597812345";


/* =========================================================
   COMPANY / BRAND OPTIONS
   ========================================================= */

const COMPANY_OPTIONS = [
  "Clean N Clear",
  "Clean N Clear Solutions",
  "Kärcher",
];


/* =========================================================
   NAVBAR
   ========================================================= */

export default function Navbar() {

  const [openDropdown, setOpenDropdown] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [selectedCompany, setSelectedCompany] = useState(
    COMPANY_OPTIONS[0]
  );

  const navRef = useRef(null);


  /* =======================================================
     CLICK OUTSIDE
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
      previous === label
        ? null
        : label
    );

  };


  /* =======================================================
     MOBILE OPEN
     ======================================================= */

  const openMobileMenu = () => {

    setOpenDropdown(null);
    setMobileOpen(true);

  };


  /* =======================================================
     MOBILE CLOSE
     ======================================================= */

  const closeMobileMenu = () => {

    setMobileOpen(false);
    setOpenDropdown(null);

  };


  /* =======================================================
     COMPANY CHANGE
     ======================================================= */

  const handleCompanyChange = (event) => {

    setSelectedCompany(event.target.value);

  };


  return (
    <header
      className={`rt-header${
        mobileOpen
          ? " rt-header--menu-open"
          : ""
      }`}
    >

      {/* ===================================================
          TOP INFORMATION BAR
          =================================================== */}

      <div className="rt-topbar">

        <div className="rt-topbar__inner">

          {/* CONTACT INFORMATION */}

          <div className="rt-topbar__info">

            <span className="rt-topbar__item">

              <strong>Phone :</strong>{" "}

              <a href="tel:+919597812345">
                +91 95978 12345
              </a>

            </span>


            <span className="rt-topbar__divider">
              |
            </span>


            <span className="rt-topbar__item">

              <strong>Email :</strong>{" "}

              <a href="mailto:rmclsales@rootsemail.com">
                rmclsales@rootsemail.com
              </a>

            </span>


            <span className="rt-topbar__divider">
              |
            </span>


            <span className="rt-topbar__item rt-topbar__cin">

              <strong>CIN :</strong>{" "}

              U36999TZ1992PLC003662

            </span>

          </div>


          {/* =================================================
              COMPANY SEARCH / SELECTOR
              ================================================= */}

          <div className="rt-company-selector">

            <span className="rt-company-selector__icon">

              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >

                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="2"
                />

                <path
                  d="M16.5 16.5L21 21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />

              </svg>

            </span>


            <select
              className="rt-company-selector__select"
              value={selectedCompany}
              onChange={handleCompanyChange}
              aria-label="Select company or brand"
            >

              {COMPANY_OPTIONS.map(
                (company) => (

                  <option
                    key={company}
                    value={company}
                  >
                    {company}
                  </option>

                )
              )}

            </select>


            <span className="rt-company-selector__arrow">

              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                aria-hidden="true"
              >

                <path
                  d="M1 1L6 6L11 1"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </svg>

            </span>

          </div>

        </div>

      </div>


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


          {/* =================================================
              DESKTOP MENU
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

                  {hasChildren ? (

                    <button
                      type="button"
                      className="rt-navbar__link"
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

                  ) : (

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


                  {/* =================================================
                      DESKTOP DROPDOWN
                      ================================================= */}

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
            >
              Get a Quote
            </a>

          </div>


          {/* =================================================
              MOBILE HAMBURGER
              ================================================= */}

          <button
            type="button"
            className="rt-hamburger"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="rt-sub-navbar"
            onClick={openMobileMenu}
          >

            <span />
            <span />
            <span />

          </button>

        </div>

      </nav>


      {/* ===================================================
          MOBILE SUB NAVBAR
          =================================================== */}

      <SubNavbar
        isOpen={mobileOpen}
        onClose={closeMobileMenu}
      />

    </header>
  );
}