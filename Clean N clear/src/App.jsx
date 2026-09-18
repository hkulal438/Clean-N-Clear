import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import SubNavbar from "./Components/subNavbar/subNavbar";
import Hero from "./Components/Hero/Hero";
import Section from "./Components/Section/Section";
import Footer from "./Components/Footer/Footer";

import "./App.css";

function Home() {
  return (
    <>
      <Hero />
      <Section />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <SubNavbar />

      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Future pages */}
          {/* Add pages here later */}
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;