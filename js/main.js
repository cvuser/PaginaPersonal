// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupPerformanceOptimizations(); // Optimizaciones primero
    setupMobileMenu();
    setupTypingAnimation();
    setupVisitorCounter();
    setupScrollAnimations();
    setupThemeToggle();
    setupHeaderScroll();
    setupParallaxEffects();
    setupScrollIndicator();
    setCurrentYear();
    setupSmoothScroll();
    setupAdvancedHomeEffects(); // Efectos avanzados al final
}

// ===== MENÚ MÓVIL CORREGIDO =====
function setupMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');

    if (!menuToggle || !mainNav) return;

    // Toggle del menú
    menuToggle.addEventListener('click', function() {
        const isActive = mainNav.classList.contains('active');
        
        if (isActive) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                closeMenu();
            }
        });
    });

    // Cerrar menú al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMenu();
        }
    });

    function openMenu() {
        mainNav.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.innerHTML = '✕';
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        mainNav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.innerHTML = '☰';
        document.body.style.overflow = '';
    }

    // Cerrar menú al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });
}

// ===== ANIMACIÓN DE ESCRITURA =====
function setupTypingAnimation() {
    const typedElement = document.getElementById('typed-text') || document.getElementById('typed-greeting');
    if (!typedElement) return;

    const messages = [
        "¡Hola! Welcome! 👋",
        "Bienvenido/a a mi Página Personal",
        "Soy Carlos Velasco García",
        "Desarrollador Web Full Stack",
        "¡Explora y conoce mi trabajo!"
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeMessage() {
        const currentMessage = messages[messageIndex];
        
        if (isDeleting) {
            typedElement.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedElement.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentMessage.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
            typeSpeed = 500;
        }
        
        setTimeout(typeMessage, typeSpeed);
    }
    
    // Agregar saludo horario
    addTimeBasedGreeting(typedElement);
    
    // Iniciar animación
    setTimeout(typeMessage, 1000);
}

function addTimeBasedGreeting(element) {
    const hour = new Date().getHours();
    let saludo = "¡Hola!";
    
    if (hour < 12) saludo = "¡Buenos días!";
    else if (hour < 20) saludo = "¡Buenas tardes!";
    else saludo = "¡Buenas noches!";
    
    const greetingSpan = document.createElement('span');
    greetingSpan.style.cssText = 'color: #4facfe; font-size: 1.1rem; display: block; margin-bottom: 0.5rem;';
    greetingSpan.textContent = saludo;
    
    element.parentNode.insertBefore(greetingSpan, element);
}

// ===== CONTADOR DE VISITANTES =====
function setupVisitorCounter() {
    const visitorElement = document.getElementById("visitor-count");
    if (!visitorElement) return;

    const VISITOR_KEY = "cvg-visitor-count";
    let count = localStorage.getItem(VISITOR_KEY);
    
    if (!count) {
        count = Math.floor(Math.random() * 1000) + 2000;
    } else {
        count = parseInt(count) + 1;
    }
    
    localStorage.setItem(VISITOR_KEY, count);
    
    // Animación del contador
    animateCounter(visitorElement, count);
}

function animateCounter(element, targetCount) {
    let currentCount = 0;
    const increment = targetCount / 100;
    
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= targetCount) {
            currentCount = targetCount;
            clearInterval(timer);
        }
        element.textContent = Math.floor(currentCount);
    }, 20);
}

// ===== ANIMACIONES DE SCROLL =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos con fade-in
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Observar cards y elementos animables
    document.querySelectorAll('.card, .skill-card, .quick-link').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// ===== TOGGLE DE TEMA =====
function setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    // Detectar tema guardado
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    updateThemeIcon(themeToggle, currentTheme === 'dark');

    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcon(themeToggle, isDark);
    });
}

function updateThemeIcon(toggle, isDark) {
    toggle.innerHTML = isDark ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
}

// ===== SCROLL DEL HEADER =====
function setupHeaderScroll() {
    let lastScrollY = window.scrollY;
    const header = document.querySelector('.main-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        // Cambiar opacidad del header
        const opacity = Math.max(0.8, 1 - currentScrollY / 200);
        header.style.background = `rgba(44, 62, 80, ${opacity})`;
        
        lastScrollY = currentScrollY;
    });
}

// ===== EFECTOS PARALLAX =====
function setupParallaxEffects() {
    const heroImg = document.querySelector('.hero-image img');
    const floatingElements = document.querySelectorAll('.floating-element');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax para imagen del hero
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.08}px)`;
        }

        // Parallax para elementos flotantes
        floatingElements.forEach((element, index) => {
            element.style.transform = `translateY(${rate * (index + 1) * 0.1}px)`;
        });
    });
}

// ===== SCROLL SUAVE =====
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FUNCIONES AUXILIARES =====
function setCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ===== DATOS CURIOSOS (SI EXISTE EL ELEMENTO) =====
function setupCuriousFacts() {
    const factElement = document.getElementById("curious-fact");
    if (!factElement) return;

    const facts = [
        "El primer sitio web fue creado en 1991 por Tim Berners-Lee.",
        "JavaScript fue creado en solo 10 días.",
        "Los humanos comparten un 60% de su ADN con los plátanos 🍌.",
        "GitHub fue lanzado en 2008 y ahora tiene más de 100 millones de repositorios.",
        "Cada minuto se suben más de 500 horas de video a YouTube.",
        "Los emojis son considerados parte del lenguaje digital moderno."
    ];
    
    let currentFactIndex = 0;
    
    function rotateFact() {
        factElement.textContent = facts[currentFactIndex];
        currentFactIndex = (currentFactIndex + 1) % facts.length;
    }
    
    rotateFact();
    setInterval(rotateFact, 5000);
}

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.warn('Error capturado:', e.error);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Throttle function para eventos de scroll
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar throttle a eventos de scroll intensivos
const throttledScroll = throttle(() => {
    setupParallaxEffects();
    setupHeaderScroll();
}, 16);

window.addEventListener('scroll', throttledScroll);

// ===== INICIALIZACIÓN PARA TYPED.JS (SI ESTÁ DISPONIBLE) =====
if (typeof Typed !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        const typedGreeting = document.getElementById('typed-greeting');
        if (typedGreeting) {
            new Typed('#typed-greeting', {
                strings: [
                    "¡Hola! Welcome! 👋",
                    "Bienvenido/a a mi Página Personal",
                    "Soy Carlos Velasco García",
                    "Desarrollador Web Full Stack",
                    "¡Explora y conoce mi trabajo!"
                ],
                typeSpeed: 55,
                backSpeed: 30,
                backDelay: 1200,
                startDelay: 400,
                loop: true,
                showCursor: false
            });
        }
    });
}

// ===== EFECTOS AVANZADOS PÁGINA DE INICIO =====
function setupAdvancedHomeEffects() {
    // Solo aplicar en la página de inicio
    if (!document.querySelector('.hero-home')) return;
    
    setupParticleSystem();
    setupMouseInteraction();
    setupScrollBasedAnimations();
    setupCounterAnimations();
    setupAdvancedTyping();
}

// Sistema de partículas más avanzado (optimizado)
function setupParticleSystem() {
    const heroHome = document.querySelector('.hero-home');
    if (!heroHome) return;
    
    const particlesContainer = document.querySelector('.hero-particles');
    if (!particlesContainer) return;
    
    // Crear menos partículas para mejor rendimiento (10 en lugar de 20)
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'dynamic-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: ${getRandomColor()};
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticles ${Math.random() * 8 + 6}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            box-shadow: 0 0 10px currentColor;
            z-index: 1;
            will-change: transform;
        `;
        particlesContainer.appendChild(particle);
    }
}

function getRandomColor() {
    const colors = ['#4ECDC4', '#06D6A0', '#FFD166', '#FF6B6B', '#FF8A00'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Interacción con el mouse (optimizada)
function setupMouseInteraction() {
    const heroHome = document.querySelector('.hero-home');
    if (!heroHome) return;
    
    let mouseX = 0, mouseY = 0;
    let rafId;
    
    function updateMouseEffects() {
        // Efecto parallax en elementos (reducido para mejor rendimiento)
        const heroContent = document.querySelector('.hero-content');
        const particles = document.querySelectorAll('.dynamic-particle');
        
        if (heroContent) {
            heroContent.style.transform = `translate(${mouseX * 5}px, ${mouseY * 5}px)`;
        }
        
        particles.forEach((particle, index) => {
            const speed = (index % 3 + 1) * 2; // Reducido de 5 a 2
            particle.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
        });
    }
    
    heroHome.addEventListener('mousemove', (e) => {
        const rect = heroHome.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        
        // Cancelar frame anterior si existe
        if (rafId) {
            cancelAnimationFrame(rafId);
        }
        
        // Programar actualización
        rafId = requestAnimationFrame(updateMouseEffects);
    });
    
    heroHome.addEventListener('mouseleave', () => {
        const heroContent = document.querySelector('.hero-content');
        const particles = document.querySelectorAll('.dynamic-particle');
        
        if (heroContent) {
            heroContent.style.transform = 'translate(0, 0)';
        }
        
        particles.forEach(particle => {
            particle.style.transform = 'translate(0, 0)';
        });
        
        // Cancelar animación pendiente
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = null;
        }
    });
}

// Animaciones basadas en scroll más avanzadas (optimizadas)
function setupScrollBasedAnimations() {
    const heroHome = document.querySelector('.hero-home');
    if (!heroHome) return;
    
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const heroHeight = heroHome.offsetHeight;
        const scrollPercent = Math.min(scrollY / heroHeight, 1);
        
        // Solo aplicar efectos si el hero está visible
        if (scrollPercent <= 1) {
            // Efecto parallax en el fondo (reducido para mejor rendimiento)
            heroHome.style.transform = `translateY(${scrollY * 0.3}px)`;
            
            // Fade out del contenido
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.style.opacity = Math.max(0, 1 - scrollPercent * 1.5);
                heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
            }
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    // Throttle el evento scroll
    window.addEventListener('scroll', requestTick, { passive: true });
}

// Animaciones de contador avanzadas
function setupCounterAnimations() {
    const stats = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (target === 100 ? '%' : '+');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
            }
        }, 16);
    };
    
    // Observar cuando las estadísticas entren en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const text = number.textContent;
                const value = parseInt(text.replace(/[^\d]/g, ''));
                
                animateCounter(number, value);
                observer.unobserve(number);
            }
        });
    });
    
    stats.forEach(stat => observer.observe(stat));
}

// Efecto de escritura más avanzado
function setupAdvancedTyping() {
    const typedTextElement = document.getElementById('typed-text');
    if (!typedTextElement) return;
    
    const phrases = [
        'Desarrollando el futuro, una línea de código a la vez ⚡',
        'Transformando ideas en experiencias digitales únicas 🚀',
        'Especialista en React, Spring Boot y migración de datos 💻',
        'Siempre aprendiendo, siempre innovando 🌟',
        'Creando soluciones que marcan la diferencia 🎯'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; // Pausa al final
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pausa antes de empezar nueva frase
        }
        
        setTimeout(typeEffect, typingSpeed);
    }
    
    // Añadir efecto de brillo mientras escribe
    typedTextElement.style.textShadow = '0 0 20px rgba(255, 209, 102, 0.8)';
    
    setTimeout(typeEffect, 1000);
}

// ===== DETECCIÓN DE DISPOSITIVO Y OPTIMIZACIONES =====
function isMobile() {
    return window.innerWidth <= 768 || 'ontouchstart' in window;
}

function setupPerformanceOptimizations() {
    // Reducir efectos en dispositivos móviles
    if (isMobile()) {
        // Desactivar partículas dinámicas en móvil
        const particles = document.querySelectorAll('.dynamic-particle');
        particles.forEach(particle => particle.remove());
        
        // Desactivar efectos de mouse en móvil
        const heroHome = document.querySelector('.hero-home');
        if (heroHome) {
            heroHome.style.transform = 'none';
        }
        
        // Reducir animaciones complejas
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Detectar preferencia de movimiento reducido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduce-motion');
    }
}

// Llamar a las funciones de optimización al cargar
window.addEventListener('load', () => {
    setupPerformanceOptimizations();
});

// Re-aplicar optimizaciones al cambiar tamaño de ventana
window.addEventListener('resize', () => {
    setupPerformanceOptimizations();
});

// ===== INDICADOR DE SCROLL =====
function setupScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const nextSection = document.querySelector('.visitor-section') || 
                              document.querySelector('.about-section') ||
                              document.querySelector('main section:nth-of-type(2)');
            
            if (nextSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = nextSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });

        // Ocultar indicador cuando se hace scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            const opacity = scrollY > 100 ? 0 : 1;
            scrollIndicator.style.opacity = opacity;
            scrollIndicator.style.pointerEvents = scrollY > 100 ? 'none' : 'auto';
        });
    }
}