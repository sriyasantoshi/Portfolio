// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorGlow = document.querySelector('.cursor-glow');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor expand on hover
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-item');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('cursor-expand');
    });
    el.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('cursor-expand');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInElements = document.querySelectorAll('.project-card, .stat-item, .skill-item, .about-container');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, observerOptions);

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    observer.observe(el);
});

// Parallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.gradient-orb');
    parallaxElements.forEach((el, index) => {
        const speed = 0.3 + (index * 0.1);
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Skill items random animation delay
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((skill, index) => {
    skill.style.animationDelay = `${index * 0.05}s`;
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '%');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '%');
        }
    }, 16);
};

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const number = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(number.textContent);
            animateCounter(number, targetValue);
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statObserver.observe(stat);
});

// Add magnetic effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Add typing effect to hero badge
const badge = document.querySelector('.hero-badge');
const originalText = badge.textContent;
badge.textContent = '';
let charIndex = 0;

setTimeout(() => {
    const typeInterval = setInterval(() => {
        if (charIndex < originalText.length) {
            badge.textContent += originalText[charIndex];
            charIndex++;
        } else {
            clearInterval(typeInterval);
        }
    }, 50);
}, 1000);
