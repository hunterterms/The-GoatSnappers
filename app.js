// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Fade-in animation on scroll
const fadeElements = document.querySelectorAll('.fade-in');

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

fadeElements.forEach(element => {
    observer.observe(element);
});

// CTA Button interactions
const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Check if it's not a navigation button
        if (!button.classList.contains('nav-cta') && button.textContent.includes('Estimator')) {
            e.preventDefault();
            alert('Our estimator is coming soon.\nEnter your email below to get early access.');
            
            // Scroll to CTA section
            const ctaSection = document.querySelector('.cta-section');
            if (ctaSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = ctaSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else if (button.textContent.includes('Learn More')) {
            e.preventDefault();
            const solutionSection = document.querySelector('.solution-section');
            if (solutionSection) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = solutionSection.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        } else if (button.textContent.includes('Get Started')) {
            e.preventDefault();
            const emailInput = document.querySelector('.email-input');
            if (emailInput && emailInput.value) {
                // Simple email validation
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(emailInput.value)) {
                    alert('Thank you for your interest! 🎉\n\nWe\'ll send you early access information to: ' + emailInput.value);
                    emailInput.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            } else if (emailInput) {
                emailInput.focus();
                emailInput.style.border = '2px solid #e67e22';
                setTimeout(() => {
                    emailInput.style.border = 'none';
                }, 2000);
            }
        }
    });
});

// Email input enter key handler
const emailInput = document.querySelector('.email-input');
if (emailInput) {
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const getStartedBtn = document.querySelector('.cta-section .btn-primary');
            if (getStartedBtn) {
                getStartedBtn.click();
            }
        }
    });
}

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroContent && scrolled < 800) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Initialize animations on page load
window.addEventListener('load', () => {
    // Trigger initial fade-in for elements in viewport
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('visible');
        }
    });
});
