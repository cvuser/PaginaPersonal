export function initScrollAnimations() {
    const animateOnScroll = (elements, animationClass) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      elements.forEach(el => observer.observe(el));
    };
    
    // Animaciones para elementos con data-animate
    document.querySelectorAll('[data-animate]').forEach(el => {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    animateOnScroll(document.querySelectorAll('[data-animate="fade"]'), 'animate-fade');
    animateOnScroll(document.querySelectorAll('[data-animate="fade-up"]'), 'animate-fade-up');
    animateOnScroll(document.querySelectorAll('[data-animate="fade-left"]'), 'animate-fade-left');
    
    // Añadir estilos para las animaciones
    const style = document.createElement('style');
    style.textContent = `
      .animate-fade {
        opacity: 1 !important;
      }
      .animate-fade-up {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
      .animate-fade-left {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }
      [data-animate="fade-up"] {
        transform: translateY(20px);
      }
      [data-animate="fade-left"] {
        transform: translateX(-20px);
      }
    `;
    document.head.appendChild(style);
  }