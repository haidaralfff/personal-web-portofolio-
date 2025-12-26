import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/layouts/Navbar'
import Project from './pages/Project'
import Experience from './pages/Experience'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project" element={<Project />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </>
  )
}

export default App
