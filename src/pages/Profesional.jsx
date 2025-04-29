// src/pages/Profesional.jsx
import '../style.css'

export default function Profesional() {  // ¡Asegúrate de usar 'export default'!
  return (
    <div className="page-container">
      <h1 className="section-title">Experiencia Profesional</h1>
      
      <div className="timeline">
        <div className="timeline-item">
          <h3>Desarrollador Frontend</h3>
          <p>Empresa XYZ | 2022-Presente</p>
          <ul>
            <li>Desarrollo de aplicaciones con React</li>
            <li>Implementación de diseños responsive</li>
          </ul>
        </div>
        
        <div className="timeline-item">
          <h3>Practicante de Desarrollo</h3>
          <p>Otra Empresa | 2020-2022</p>
          <ul>
            <li>Apoyo en proyectos web</li>
            <li>Mantenimiento de sitios</li>
          </ul>
        </div>
      </div>
    </div>
  )
}