// Typing animation
const typedElement = document.getElementById('typed-text');
const messages = [
    "¡Hola! Bienvenido/a a mi Página Personal 👋",
    "Soy Carlos Velasco García",
    "Desarrollador Web Full Stack",
    "Especialista en Migración de Datos",
    "¡Explora y conoce mi trabajo y mis intereses!"
];

let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeMessage() {
    if (!typedElement) return; // Evita error si el elemento no existe
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

typeMessage();

// Visitor counter
const visitorElement = document.getElementById("visitor-count");
if (visitorElement) {
    const VISITOR_KEY = "cvg-visitor-count";
    let count = localStorage.getItem(VISITOR_KEY);
    if (!count) {
      count = Math.floor(Math.random() * 1000) + 2000;
    } else {
      count = parseInt(count) + 1;
    }
    localStorage.setItem(VISITOR_KEY, count);
    
    let currentCount = 0;
    const increment = count / 100;
    const timer = setInterval(() => {
      currentCount += increment;
      if (currentCount >= count) {
        currentCount = count;
        clearInterval(timer);
      }
      visitorElement.textContent = Math.floor(currentCount);
    }, 20);
}

// Current year
const currentYearElement = document.getElementById('current-year');
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Scroll animations (fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // entry.target.classList.remove('visible'); // Opcional: para que la animación se reinicie si sale de vista
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
    });

    // Hide mobile menu when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });
}

// Header scroll effect
let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.main-header');
    if (!header) return;
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
});