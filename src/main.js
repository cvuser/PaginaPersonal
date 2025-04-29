import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <header class="header">
      <h1>Bienvenidos a mi Página Personal</h1>
      <p class="intro">¡Hola! Soy [tu nombre], un apasionado del fútbol, desarrollo web y tecnología. Aquí comparto mis logros profesionales y deportivos.</p>
    </header>

    <section class="achievements">
      <h2>Mis Logros</h2>
      <div class="cards">
        <div class="card">
          <h3>Logro Profesional</h3>
          <p>[Tu logro profesional]</p>
        </div>
        <div class="card">
          <h3>Logro Deportivo</h3>
          <p>[Tu logro deportivo]</p>
        </div>
        <div class="card">
          <h3>Logro Personal</h3>
          <p>[Tu logro personal]</p>
        </div>
      </div>
    </section>

    <section class="video">
      <h2>Mi Video Jugando al Fútbol</h2>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/eH9FtgVen_w" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </section>
  </div>
`

// Opcional: Añadir una animación en el cuerpo
document.body.classList.add('fade-in');
