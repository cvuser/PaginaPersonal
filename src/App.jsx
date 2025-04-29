// src/App.jsx
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Personal from './pages/Personal'
import Deportiva from './pages/Deportiva'  // Asegúrate que esta línea existe
import Profesional from './pages/Profesional'
import './style.css'

export default function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/deportiva" element={<Deportiva />} /> {/* Verifica que esté usando el componente */}
          <Route path="/profesional" element={<Profesional />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}