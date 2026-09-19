import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout/Layout";
import Footer from "./Components/Footer/Footer";

// Home Components
import Hero from "./Components/Hero/Hero";
import Section from "./Components/Section/Section";
import Supply from "./Components/Supply/Supply";
import Client from "./Components/Client/Client";

// About Components
import About from "./Components/About/About";
import Why from "./Components/Why/Why";
import Committment from "./Components/Committment/Committment";

// Kärcher
import Karcher from "./Components/Karcher/Karcher";

import "./App.css";

/* =====================================================
   HOME PAGE
===================================================== */

function Home() {
  return (
    <>
      <Hero />
      <Section />
      <Supply />
      <Client />
    </>
  );
}

/* =====================================================
   ABOUT PAGE
===================================================== */

function AboutPage() {
  return (
    <>
      <About />
      <Why />
      <Committment />
    </>
  );
}

/* =====================================================
   TEMPORARY PAGE COMPONENT
===================================================== */

function Page({ title }) {
  return (
    <section
      style={{
        minHeight: "65vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "120px 30px 80px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "Cambria, Georgia, serif",
          fontSize: "42px",
          fontWeight: 700,
          color: "#164c78",
        }}
      >
        {title}
      </h1>
    </section>
  );
}

/* =====================================================
   KÄRCHER LAYOUT

   No default Navbar
   Kärcher page
   Default Footer
===================================================== */

function KarcherLayout() {
  return (
    <>
      <main className="karcher-page">
        <Karcher />
      </main>

      <Footer />
    </>
  );
}

/* =====================================================
   APP
===================================================== */

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =================================================
            NORMAL WEBSITE LAYOUT

            Navbar
              ↓
            Page
              ↓
            Footer
        ================================================= */}

        <Route element={<Layout />}>

          {/* ================= HOME ================= */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* ================= ABOUT ================= */}

          <Route
            path="/about-us"
            element={<AboutPage />}
          />

          {/* ================= PRODUCTS ================= */}

          <Route
            path="/products"
            element={<Page title="Products" />}
          />

          <Route
            path="/products/cleaning-chemicals"
            element={<Page title="Cleaning Chemicals" />}
          />

          <Route
            path="/products/cleaning-tools"
            element={<Page title="Cleaning Tools" />}
          />

          <Route
            path="/products/professional-cleaning-equipment"
            element={
              <Page title="Professional Cleaning Equipment" />
            }
          />

          <Route
            path="/products/hygiene-supplies"
            element={<Page title="Hygiene Supplies" />}
          />

          <Route
            path="/products/household-cleaning"
            element={<Page title="Household Cleaning" />}
          />

          <Route
            path="/products/commercial-institutional-supplies"
            element={
              <Page title="Commercial & Institutional Supplies" />
            }
          />

          {/* ================= SOLUTIONS ================= */}

          <Route
            path="/solutions"
            element={<Page title="Solutions" />}
          />

          <Route
            path="/solutions/commercial"
            element={<Page title="Commercial Solutions" />}
          />

          <Route
            path="/solutions/household"
            element={<Page title="Household Solutions" />}
          />

          <Route
            path="/solutions/institutional"
            element={<Page title="Institutional Solutions" />}
          />

          <Route
            path="/solutions/retail"
            element={<Page title="Retail Solutions" />}
          />

          <Route
            path="/solutions/wholesale"
            element={<Page title="Wholesale Solutions" />}
          />

          {/* ================= INDUSTRIES ================= */}

          <Route
            path="/industries"
            element={<Page title="Industries" />}
          />

          <Route
            path="/industries/healthcare"
            element={<Page title="Healthcare" />}
          />

          <Route
            path="/industries/hospitality"
            element={<Page title="Hospitality" />}
          />

          <Route
            path="/industries/education"
            element={<Page title="Education" />}
          />

          <Route
            path="/industries/offices-commercial"
            element={<Page title="Offices & Commercial" />}
          />

          <Route
            path="/industries/industrial"
            element={<Page title="Industrial" />}
          />

          <Route
            path="/industries/residential"
            element={<Page title="Residential" />}
          />

          {/* ================= BRANDS ================= */}

          <Route
            path="/brands"
            element={<Page title="Brands" />}
          />

          {/* ================= CONTACT ================= */}

          <Route
            path="/contact"
            element={<Page title="Contact" />}
          />

          {/* ================= REQUEST A QUOTE ================= */}

          <Route
            path="/request-a-quote"
            element={<Page title="Request a Quote" />}
          />

        </Route>

        {/* =================================================
            KÄRCHER PAGE

            IMPORTANT:
            This route is OUTSIDE Layout.

            Therefore:
            ❌ Default Navbar
            ✅ Kärcher Hero
            ✅ Default Footer
        ================================================= */}

        <Route
          path="/karcher"
          element={<KarcherLayout />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;