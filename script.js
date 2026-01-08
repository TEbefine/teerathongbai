// ============================================
// Smooth Scroll Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Update active nav link
            updateActiveNav(this.getAttribute('href'));
        }
    });
});

// ============================================
// Active Navigation on Scroll
// ============================================
function updateActiveNav(hash) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === hash) {
            link.classList.add('active');
        }
    });
}

// Intersection Observer for sections
const sections = document.querySelectorAll('section[id]');
const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            updateActiveNav(`#${entry.target.id}`);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// Scroll Reveal Animation
// ============================================
const revealElements = document.querySelectorAll('.section-header, .about-content, .work-item, .contact-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealObserver.observe(el);
});

// Add revealed class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// ============================================
// Mobile Navigation Toggle
// ============================================
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Add mobile nav styles
const mobileNavStyles = document.createElement('style');
mobileNavStyles.textContent = `
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(10, 10, 10, 0.98);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.4s ease, visibility 0.4s ease;
        }
        
        .nav-links.active {
            opacity: 1;
            visibility: visible;
        }
        
        .nav-links .nav-link {
            font-size: 1.5rem;
        }
        
        .nav-toggle.active span:first-child {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:last-child {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    }
`;
document.head.appendChild(mobileNavStyles);

// ============================================
// Parallax Effect on Hero Image
// ============================================
const heroImage = document.querySelector('.hero-image');

if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroHeight = document.querySelector('.hero').offsetHeight;
        
        if (scrolled < heroHeight) {
            heroImage.style.transform = `scale(1.05) translateY(${scrolled * 0.3}px)`;
        }
    });
}

// ============================================
// Cursor Effect (Optional Enhancement)
// ============================================
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-circle"></div>';
document.body.appendChild(cursor);

const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        position: fixed;
        top: 0;
        left: 0;
        pointer-events: none;
        z-index: 9999;
        mix-blend-mode: difference;
    }
    
    .cursor-dot {
        position: absolute;
        width: 8px;
        height: 8px;
        background: white;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.1s ease;
    }
    
    .cursor-circle {
        position: absolute;
        width: 40px;
        height: 40px;
        border: 1px solid rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: transform 0.3s ease, width 0.3s ease, height 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .custom-cursor {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Hover effects on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .work-item');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.querySelector('.cursor-circle').style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursor.querySelector('.cursor-circle').style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

console.log('🚀 Portfolio loaded successfully');
