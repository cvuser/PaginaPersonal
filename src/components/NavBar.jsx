import { Link } from 'react-router-dom'
import '../style.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          [Tu Nombre]
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link to="/personal" className="nav-link">Personal</Link>
          </li>
          <li className="nav-item">
            <Link to="/deportiva" className="nav-link">Deportiva</Link>
          </li>
          <li className="nav-item">
            <Link to="/profesional" className="nav-link">Profesional</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}