// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    // Smooth cursor movement
    const distX = mouseX - cursorX;
    const distY = mouseY - cursorY;
    cursorX += distX * 0.3;
    cursorY += distY * 0.3;
    
    const distFollowerX = mouseX - followerX;
    const distFollowerY = mouseY - followerY;
    followerX += distFollowerX * 0.1;
    followerY += distFollowerY * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor expand effect on hover
const hoverElements = document.querySelectorAll('a, button, .feature-card, .result-card, .tech-tag');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('expand');
        cursorFollower.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('expand');
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all content blocks
document.querySelectorAll('.content-block').forEach(block => {
    observer.observe(block);
});

// Parallax effect for background orbs
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.bg-orb');
    
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.05;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Card hover effect with tilt
document.querySelectorAll('.feature-card, .result-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Add shimmer effect to tech tags on load
document.querySelectorAll('.tech-tag').forEach((tag, index) => {
    setTimeout(() => {
        tag.style.animation = 'shimmer 1s forwards';
    }, index * 100);
});

// Shimmer animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shimmer {
        0% {
            background-position: -1000px 0;
        }
        100% {
            background-position: 1000px 0;
        }
    }
    
    .tech-tag {
        background-image: linear-gradient(
            90deg,
            rgba(0, 212, 255, 0.1) 0%,
            rgba(0, 212, 255, 0.3) 50%,
            rgba(0, 212, 255, 0.1) 100%
        );
        background-size: 1000px 100%;
    }
`;
document.head.appendChild(style);

// Counter animation for result numbers
const animateCounter = (element) => {
    const target = element.textContent;
    const isPercentage = target.includes('%');
    const isDecimal = target.includes('.');
    const hasPlus = target.includes('+');
    const hasLessThan = target.includes('<');
    
    let numericValue = parseFloat(target.replace(/[^\d.]/g, ''));
    
    if (isNaN(numericValue)) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
            current = numericValue;
            clearInterval(timer);
        }
        
        let displayValue = isDecimal ? current.toFixed(2) : Math.floor(current);
        if (isPercentage) displayValue += '%';
        if (hasPlus) displayValue = '+' + displayValue;
        if (hasLessThan) displayValue = '<' + displayValue;
        
        element.textContent = displayValue;
    }, duration / steps);
};

// Observe result numbers and animate when visible
const resultObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            animateCounter(entry.target);
            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.result-number').forEach(number => {
    resultObserver.observe(number);
});

// Add page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Mobile menu toggle (if needed in future)
const createMobileMenu = () => {
    if (window.innerWidth <= 768) {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.createElement('button');
        menuToggle.classList.add('menu-toggle');
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            background: none;
            border: none;
            color: var(--primary);
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
        `;
        
        // Add toggle functionality if needed
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add any additional initialization here
    console.log('Project page loaded successfully');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Handle responsive adjustments
    }, 250);
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.querySelectorAll('.bg-orb').forEach(orb => {
            orb.style.animation = 'float 2s infinite ease-in-out, rainbow 3s infinite';
        });
        
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { filter: blur(100px) hue-rotate(0deg); }
                100% { filter: blur(100px) hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(rainbowStyle);
    }
});
