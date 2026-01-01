import Navbar from "./components/layouts/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Project from "./pages/Project";
import Experience from "./pages/Experience";
import Contact from "./pages/Contact";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <>
      <Navbar />

      <section id="home">
        <Home />
      </section>

      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>

      <section id="projects">
        <Project />
      </section>

      <section id= "contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
