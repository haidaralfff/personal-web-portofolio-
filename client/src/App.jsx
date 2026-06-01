import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuroraBackground from "./components/reactbits/AuroraBackground";
import CustomCursor from "./components/CustomCursor";
import SplashScreen from "./components/SplashScreen";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/Footer";

// Eager load Home since it's above the fold
import Home from "./pages/Home";

// Lazy load sections below the fold to reduce initial bundle size
const About = lazy(() => import("./pages/About"));
const Project = lazy(() => import("./pages/Project"));
const Experience = lazy(() => import("./pages/Experience"));
const Contact = lazy(() => import("./pages/Contact"));
const Services = lazy(() => import("./pages/Services"));
const Certifications = lazy(() => import("./pages/Certifications"));
const FAQ = lazy(() => import("./pages/FAQ"));

function LandingPage() {
  return (
    <>
      <Navbar />

      <section id="home"><Home /></section>
      
      {/* Fallback blocks space while JS chunks download in background */}
      <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
        <section id="about"><About /></section>
        <section id="services"><Services /></section>
        <section id="experience"><Experience /></section>
        <section id="certifications"><Certifications /></section>
        <section id="projects"><Project /></section>
        <section id="faq"><FAQ /></section>
        <section id="contact"><Contact /></section>
      </Suspense>

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