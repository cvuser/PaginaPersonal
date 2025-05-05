// js/modules/theme.js
let themeInitialized = false;

export function initThemeSwitcher() {
  if (themeInitialized) return;
  themeInitialized = true;

  // Verificar si ya existe el botón (por si acaso)
  if (document.getElementById('theme-toggle')) return;

  const themeToggle = document.createElement('button');
  themeToggle.id = 'theme-toggle';
  themeToggle.className = 'theme-toggle';
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  themeToggle.setAttribute('aria-label', 'Cambiar tema');
  
  // Insertar el botón en el header
  const header = document.querySelector('.header-container');
  if (header && !header.querySelector('#theme-toggle')) {
    header.appendChild(themeToggle);
  } else {
    return;
  }
  
  // Comprobar preferencias del usuario
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const currentTheme = localStorage.getItem('theme');
  
  // Aplicar tema inicial
  function setInitialTheme() {
    const isDark = currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches);
    document.body.classList.toggle('dark-theme', isDark);
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    updateThemeColors(isDark);
  }
  
  // Manejar el clic del botón
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeColors(isDark);
  });
  
  // Escuchar cambios en las preferencias del sistema
  prefersDarkScheme.addListener(e => {
    if (!localStorage.getItem('theme')) {
      const isDark = e.matches;
      document.body.classList.toggle('dark-theme', isDark);
      themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      updateThemeColors(isDark);
    }
  });
  
  // Actualizar variables CSS
  function updateThemeColors(isDark) {
    const root = document.documentElement;
    if (isDark) {
      root.style.setProperty('--primary-color', '#2d3748');
      root.style.setProperty('--white', '#1a202c');
      root.style.setProperty('--text-color', '#f7fafc');
      root.style.setProperty('--light-bg', '#1a202c');
    } else {
      root.style.setProperty('--primary-color', '#1e1e2f');
      root.style.setProperty('--white', '#ffffff');
      root.style.setProperty('--text-color', '#333333');
      root.style.setProperty('--light-bg', '#f0f2f5');
    }
  }

  setInitialTheme();
}