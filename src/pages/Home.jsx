import { Link } from 'react-router-dom'
import '../style.css'

export default function Home() {
  return (
    <div className="page-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Hola, soy <span>[Tu Nombre]</span></h1>
          <p>Desarrollador web | Futbolista | Apasionado por la tecnología</p>
          <div className="cta-buttons">
            <Link to="/profesional" className="btn primary">Mi carrera</Link>
            <Link to="/deportiva" className="btn secondary">Logros deportivos</Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="/src/assets/your-photo.jpg" alt="[Tu Nombre]" />
        </div>
      </section>
    </div>
  )
}