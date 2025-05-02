// Configuración inicial del sitio
document.addEventListener('DOMContentLoaded', () => {
  // Actualizar año en el footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Menú responsive
  setupMobileMenu();
  
  // Smooth scrolling para enlaces internos
  setupSmoothScrolling();
  
  // Animación de barras de habilidades
  animateSkillBars();
  
  // Cargar módulos según la página
  loadPageSpecificModules();
});

function setupMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('active');
    });
  }
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar');
  if (skillBars.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = level + '%';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillBars.forEach(bar => {
    observer.observe(bar);
  });
}

function loadPageSpecificModules() {
  // Carga dinámica de módulos según la página
  const bodyClass = document.body.classList;
  
  if (bodyClass.contains('personal-page')) {
    import('./modules/stories.js')
      .then(module => module.initStoryGenerator())
      .catch(err => console.error('Error loading stories module:', err));
  }
  
  if (bodyClass.contains('contact-page')) {
    import('./modules/contact.js')
      .then(module => module.initContactForm())
      .catch(err => console.error('Error loading contact module:', err));
  }
  
  // Cargar módulo de tema oscuro/claro
  import('./modules/theme.js')
    .then(module => module.initThemeSwitcher())
    .catch(err => console.error('Error loading theme module:', err));
}
// Cargar módulo de video si existe en la página
if (document.getElementById('sports-video')) {
  import('./modules/video.js')
    .then(module => module.initVideoPlayer())
    .catch(err => console.error('Error loading video module:', err));
}

