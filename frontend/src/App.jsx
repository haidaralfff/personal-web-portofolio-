import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { analyticsService } from "./services/api";

import Navbar from "./components/layouts/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";

import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardHome from "./pages/dashboard/DashboardHome";
import DashboardProject from "./pages/dashboard/DashboardProject";
import DashboardSettings from "./pages/dashboard/DashboardSettings";
import DashboardMessages from "./pages/dashboard/DashboardMessages";

function LandingPage() {
  useEffect(() => {
    analyticsService.recordView("/");
  }, []);

  return (
    <>
      <Navbar />

      <section id="home"><Home /></section>
      <section id="about"><About /></section>
      <section id="experience"><Experience /></section>
      <section id="projects"><Project /></section>
      <section id="contact"><Contact /></section>

      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Secure Login Page */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* Protected Admin Dashboard Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardHome />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/projects" 
        element={
          <ProtectedRoute>
            <DashboardProject />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/messages" 
        element={
          <ProtectedRoute>
            <DashboardMessages />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/dashboard/settings" 
        element={
          <ProtectedRoute>
            <DashboardSettings />
          </ProtectedRoute>
        } 
      />
      
      {/* Fallback Redirect */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;