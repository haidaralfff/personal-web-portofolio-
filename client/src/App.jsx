import { Routes, Route, Navigate } from "react-router-dom";
import AuroraBackground from "./components/reactbits/AuroraBackground";
import CustomCursor from "./components/CustomCursor";
import SplashScreen from "./components/SplashScreen";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Services from "./pages/Services";
import Certifications from "./pages/Certifications";

import Contributions from "./pages/Contributions";

function LandingPage() {
  return (
    <>
      <Navbar />

      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="services"><Services /></section>
      <section id="experience"><Experience /></section>
      <section id="certifications"><Certifications /></section>
      <section id="projects"><Project /></section>
      <section id="contributions"><Contributions /></section>
      <section id="contact"><Contact /></section>

      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <SplashScreen />
      <CustomCursor />
      <AuroraBackground>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Fallback Redirect */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuroraBackground>
    </>
  );
}

export default App;