import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/layouts/Navbar'
import Project from './pages/Project'

import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
    </>
  )
}

export default App
