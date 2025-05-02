export function initThemeSwitcher() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'theme-toggle';
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.setAttribute('aria-label', 'Cambiar tema');
    
    // Insertar el botón en el header
    const header = document.querySelector('.header-container');
    if (header) {
      header.appendChild(themeToggle);
    }
    
    // Comprobar preferencias del usuario
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
      document.body.classList.add('dark-theme');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Manejar el clic del botón
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    
    // Escuchar cambios en las preferencias del sistema
    prefersDarkScheme.addListener(e => {
      if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('dark-theme', e.matches);
        themeToggle.innerHTML = e.matches ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      }
    });
  }