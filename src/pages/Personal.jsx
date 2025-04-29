// src/pages/Personal.jsx
import '../style.css'

export default function Personal() {  // Asegúrate de usar 'export default'
  return (
    <div className="page-container">
      <h1 className="section-title">Sobre Mí</h1>
      
      <div className="personal-content">
        <div className="bio-card">
          <h2>Mi Historia</h2>
          <p>Aquí puedes escribir sobre tus intereses personales, hobbies y experiencias de vida.</p>
        </div>
        
        <div className="skills-card">
          <h2>Habilidades Personales</h2>
          <ul>
            <li>Trabajo en equipo</li>
            <li>Creatividad</li>
            <li>Gestión del tiempo</li>
          </ul>
        </div>
      </div>
    </div>
  )
}