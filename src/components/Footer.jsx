export default function Footer() {
    return (
      <footer className="footer">
        <div className="footer-container">
          <p>© {new Date().getFullYear()} [Tu Nombre]. Todos los derechos reservados.</p>
          <div className="social-links">
            <a href="[tu-linkedin]" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="[tu-github]" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:tuemail@example.com">Contacto</a>
          </div>
        </div>
      </footer>
    )
  }