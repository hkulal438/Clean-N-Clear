import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout
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
import WhyKarcher from "./Components/Whykarcher/Whykarcher";

// Cleaning Chemicals
import Cleaning from "./Components/Cleaning-chemicals/Cleaning";

import "./App.css";


// --------------------------------------------------
// HOME PAGE
// --------------------------------------------------

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


// --------------------------------------------------
// ABOUT PAGE
// --------------------------------------------------

function AboutPage() {
  return (
    <>
      <About />
      <Why />
      <Committment />
    </>
  );
}


// --------------------------------------------------
// SIMPLE PLACEHOLDER PAGE
// --------------------------------------------------

function Page({ title }) {
  return (
    <section
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 20px",
        fontFamily: "Cambria, Georgia, serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "42px",
          color: "#081FEF",
          margin: 0,
        }}
      >
        {title}
      </h1>
    </section>
  );
}


// --------------------------------------------------
// KÄRCHER PAGE
// --------------------------------------------------

function KarcherLayout() {
  return (
    <>
      <Karcher />
      <WhyKarcher />
      <Footer />
    </>
  );
}


// --------------------------------------------------
// APP
// --------------------------------------------------

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==========================================
            MAIN WEBSITE WITH NAVBAR + FOOTER
        ========================================== */}

        <Route element={<Layout />}>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="/about-us"
            element={<AboutPage />}
          />


          {/* ==========================================
              PRODUCTS
          ========================================== */}

          <Route
            path="/products"
            element={<Page title="Products" />}
          />

          {/* CLEANING CHEMICALS */}
          <Route
            path="/products/cleaning-chemicals"
            element={<Cleaning />}
          />

          {/* CLEANING TOOLS */}
          <Route
            path="/products/cleaning-tools"
            element={
              <Page title="Cleaning Tools" />
            }
          />

          {/* PROFESSIONAL CLEANING EQUIPMENT */}
          <Route
            path="/products/professional-cleaning-equipment"
            element={
              <Page title="Professional Cleaning Equipment" />
            }
          />

          {/* HYGIENE SUPPLIES */}
          <Route
            path="/products/hygiene-supplies"
            element={
              <Page title="Hygiene Supplies" />
            }
          />

          {/* HOUSEHOLD CLEANING */}
          <Route
            path="/products/household-cleaning"
            element={
              <Page title="Household Cleaning" />
            }
          />

          {/* COMMERCIAL & INSTITUTIONAL SUPPLIES */}
          <Route
            path="/products/commercial-institutional-supplies"
            element={
              <Page title="Commercial & Institutional Supplies" />
            }
          />


          {/* ==========================================
              SOLUTIONS
          ========================================== */}

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


          {/* ==========================================
              KÄRCHER
          ========================================== */}

          <Route
            path="/karcher"
            element={<Page title="Kärcher" />}
          />


          {/* ==========================================
              INDUSTRIES
          ========================================== */}

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


          {/* ==========================================
              BRANDS
          ========================================== */}

          <Route
            path="/brands"
            element={<Page title="Brands" />}
          />


          {/* ==========================================
              CONTACT
          ========================================== */}

          <Route
            path="/contact"
            element={<Page title="Contact Us" />}
          />


          {/* ==========================================
              REQUEST QUOTE
          ========================================== */}

          <Route
            path="/request-quote"
            element={<Page title="Request a Quote" />}
          />

        </Route>


        {/* ==========================================
            KÄRCHER DEDICATED PAGE
            No normal Layout/Navbar
        ========================================== */}

        <Route
          path="/karcher-page"
          element={<KarcherLayout />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;