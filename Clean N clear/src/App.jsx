import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ======================================================
// LAYOUT
// ======================================================

import Layout from "./Components/Layout/Layout";
import Footer from "./Components/Footer/Footer";

// ======================================================
// HOME
// ======================================================

import Hero from "./Components/Hero/Hero";
import Section from "./Components/Section/Section";
import Supply from "./Components/Supply/Supply";
import Client from "./Components/Client/Client";

// ======================================================
// ABOUT
// ======================================================

import About from "./Components/About/About";
import Why from "./Components/Why/Why";
import Committment from "./Components/Committment/Committment";

// ======================================================
// PRODUCTS
// ======================================================

import Product from "./Components/Product/Product";

// ======================================================
// CLEANING CHEMICALS
// ======================================================

import CleaningChemicals from "./Components/CleaningChemicals/CleaningChemicals";
import CleaningTools from "./Components/CleaningChemicals/CleaningTools";
import ProffessionalEquiment from "./Components/CleaningChemicals/ProffessionalEquiment";
import AdminOrders from "./Components/pages/AdminOrders/AdminOrders";

// ======================================================
// KÄRCHER
// ======================================================

import Karcher from "./Components/Karcher/Karcher";
import WhyKarcher from "./Components/Whykarcher/Whykarcher";
import ProductCategory from "./Components/ProductCategory/ProductCategory";
// import Appointment from "./Components/Appointment/Appointment";

//industries

import Industries from "./Components/Industries/Industries";
import Healthcare from "./Components/Pagesofindustries/Healthcare";
import Hospitality from "./Components/Pagesofindustries/Hospitality";
import Education from "./Components/Pagesofindustries/Education";
import Office from "./Components/Pagesofindustries/Office";
import Industrial from "./Components/Pagesofindustries/Industrial";
import Residential from "./Components/Pagesofindustries/Residential";

// contact

import Contact from "./Components/Contact/Contact";

// ======================================================
// APP CSS
// ======================================================

import "./App.css";


// ======================================================
// HOME PAGE
// ======================================================

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


// ======================================================
// ABOUT PAGE
// ======================================================

function AboutPage() {
  return (
    <>
      <About />
      <Why />
      <Committment />
    </>
  );
}


// ======================================================
// KÄRCHER PAGE
// ======================================================

function KarcherPage() {
  return (
    <>
      <Karcher />
      <WhyKarcher />
      <ProductCategory />
      {/* <Appointment /> */}
      <Footer />
    </>
  );
}


// ======================================================
// SIMPLE PAGE
// ======================================================

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


// ======================================================
// APP
// ======================================================

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* ==================================================
            MAIN WEBSITE
            Navbar + Page Content
        ================================================== */}

        <Route element={<Layout />}>

          {/* ==================================================
              HOME
          ================================================== */}

          <Route
            path="/"
            element={<Home />}
          />


          {/* ==================================================
              ABOUT US
          ================================================== */}

          <Route
            path="/about-us"
            element={<AboutPage />}
          />


          {/* ==================================================
              PRODUCTS
          ================================================== */}

          <Route
            path="/products"
            element={<Product />}
          />


          {/* ==================================================
              PRODUCT CATEGORIES
          ================================================== */}

          <Route
            path="/products/cleaning-chemicals"
            element={<CleaningChemicals />}
          />

           <Route
          path="/admin/orders"
          element={<AdminOrders />}
        />




          <Route
            path="/products/cleaning-tools"
            element={
              <CleaningTools />
            }
          />

          <Route
            path="/products/professional-cleaning-equipment"
            element={
              <ProffessionalEquiment />
            }
          />

          <Route
            path="/products/hygiene-supplies"
            element={
              <Page title="Hygiene Supplies" />
            }
          />

          <Route
            path="/products/household-cleaning"
            element={
              <Page title="Household Cleaning" />
            }
          />

          <Route
            path="/products/commercial-institutional-supplies"
            element={
              <Page title="Commercial & Institutional Supplies" />
            }
          />


          {/* ==================================================
              SOLUTIONS
          ================================================== */}

          <Route
            path="/solutions"
            element={
              <Page title="Solutions" />
            }
          />

          <Route
            path="/solutions/commercial"
            element={
              <Page title="Commercial Solutions" />
            }
          />

          <Route
            path="/solutions/household"
            element={
              <Page title="Household Solutions" />
            }
          />

          <Route
            path="/solutions/institutional"
            element={
              <Page title="Institutional Solutions" />
            }
          />

          <Route
            path="/solutions/retail"
            element={
              <Page title="Retail Solutions" />
            }
          />

          <Route
            path="/solutions/wholesale"
            element={
              <Page title="Wholesale Solutions" />
            }
          />


          {/* ==================================================
              INDUSTRIES
          ================================================== */}

          <Route
            path="/industries"
            element={
              <Industries />
            }
          />

          <Route
            path="/industries/healthcare"
            element={
              <Healthcare />
            }
          />

          <Route
            path="/industries/hospitality"
            element={
              <Hospitality />
            }
          />

          <Route
            path="/industries/education"
            element={
              <Education />
            }
          />

          <Route
            path="/industries/offices-commercial"
            element={
              <Office />
            }
          />

          <Route
            path="/industries/industrial"
            element={
              <Industrial />
            }
          />

          <Route
            path="/industries/residential"
            element={
              <Residential />
            }
          />


          {/* ==================================================
              BRANDS
          ================================================== */}

          <Route
            path="/brands"
            element={
              <Page title="Brands" />
            }
          />


          {/* ==================================================
              CONTACT
          ================================================== */}

          <Route
            path="/contact"
            element={
              <Contact />
            }
          />


          {/* ==================================================
              REQUEST A QUOTE
          ================================================== */}

          <Route
            path="/request-a-quote"
            element={
              <Page title="Request a Quote" />
            }
          />

        </Route>


        {/* ==================================================
            KÄRCHER PAGE
            Separate from normal Layout
        ================================================== */}

        <Route
          path="/karcher"
          element={<KarcherPage />}
        />


        {/* ==================================================
            PAGE NOT FOUND
        ================================================== */}

        <Route
          path="*"
          element={
            <Page title="Page Not Found" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;