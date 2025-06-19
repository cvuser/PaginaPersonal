// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupTypingAnimation();
    setupVisitorCounter();
    setupScrollAnimations();
    setupThemeToggle();
    setupHeaderScroll();
    setupParallaxEffects();
    setCurrentYear();
    setupSmoothScroll();
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