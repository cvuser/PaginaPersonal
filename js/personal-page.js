// Typing animation for personal page
const typedElementPersonal = document.getElementById('typed-text-personal');
const personalMessages = [
    "Conoce mis intereses fuera del trabajo 🎨",
    "Descubre mis hobbies y pasiones",
    "Mi vida más allá del código",
    "¡Un viaje por mis aficiones!"
];

let messageIndexPersonal = 0;
let charIndexPersonal = 0;
let isDeletingPersonal = false;

function typeMessagePersonal() {
    if (!typedElementPersonal) return; // Evita error si el elemento no existe
    const currentMessage = personalMessages[messageIndexPersonal];
    
    if (isDeletingPersonal) {
        typedElementPersonal.textContent = currentMessage.substring(0, charIndexPersonal - 1);
        charIndexPersonal--;
    } else {
        typedElementPersonal.textContent = currentMessage.substring(0, charIndexPersonal + 1);
        charIndexPersonal++;
    }
    
    let typeSpeed = isDeletingPersonal ? 50 : 100;
    
    if (!isDeletingPersonal && charIndexPersonal === currentMessage.length) {
        typeSpeed = 2000;
        isDeletingPersonal = true;
    } else if (isDeletingPersonal && charIndexPersonal === 0) {
        isDeletingPersonal = false;
        messageIndexPersonal = (messageIndexPersonal + 1) % personalMessages.length;
        typeSpeed = 500;
    }
    
    setTimeout(typeMessagePersonal, typeSpeed);
}

typeMessagePersonal();

// Current year for the footer
const currentYearPersonalElement = document.getElementById('current-year-personal');
if (currentYearPersonalElement) {
    currentYearPersonalElement.textContent = new Date().getFullYear();
}

// Scroll animations (re-used from index.html)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            // entry.target.classList.remove('visible'); // Optional: uncomment if you want animation to re-trigger on scroll back up
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Mobile menu toggle (re-used from index.html)
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Use toggle for better mobile menu behavior
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

// Header scroll effect (re-used from index.html)
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