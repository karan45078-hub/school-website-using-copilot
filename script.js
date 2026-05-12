// ============================
// DOM ELEMENTS
// ============================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const welcomeBtn = document.getElementById('welcomeBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// ============================
// MOBILE MENU TOGGLE
// ============================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    const isClickInsideNav = navMenu.contains(event.target);
    const isClickOnHamburger = hamburger.contains(event.target);
    
    if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================
// WELCOME BUTTON ANIMATION
// ============================
welcomeBtn.addEventListener('click', () => {
    welcomeMessage.classList.toggle('show');
    
    // Auto-hide after 5 seconds
    if (welcomeMessage.classList.contains('show')) {
        setTimeout(() => {
            welcomeMessage.classList.remove('show');
        }, 5000);
    }
});

// ============================
// FORM VALIDATION
// ============================
const validateForm = () => {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Validate Name
    if (name.value.trim() === '') {
        showError('name', 'Please enter your name');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError('name', 'Name must be at least 2 characters');
        isValid = false;
    }
    
    // Validate Email
    if (email.value.trim() === '') {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Subject
    if (subject.value.trim() === '') {
        showError('subject', 'Please enter a subject');
        isValid = false;
    } else if (subject.value.trim().length < 5) {
        showError('subject', 'Subject must be at least 5 characters');
        isValid = false;
    }
    
    // Validate Message
    if (message.value.trim() === '') {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError('message', 'Message must be at least 10 characters');
        isValid = false;
    }
    
    return isValid;
};

// ============================
// EMAIL VALIDATION
// ============================
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// ============================
// ERROR HANDLING
// ============================
const showError = (fieldId, errorMessage) => {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    const formGroup = field.parentElement;
    
    formGroup.classList.add('error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('show');
};

const clearFormErrors = () => {
    const errorElements = document.querySelectorAll('.error-message');
    const formGroups = document.querySelectorAll('.form-group');
    
    errorElements.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    formGroups.forEach(group => {
        group.classList.remove('error');
    });
};

// ============================
// FORM SUBMISSION
// ============================
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Show success message
        successMessage.textContent = '✓ Message sent successfully! Thank you for contacting us.';
        successMessage.classList.add('show');
        
        // Reset form
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
        
        // Optional: Log form data (in real application, send to server)
        console.log('Form submitted:', {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        });
    }
});

// ============================
// REAL-TIME VALIDATION
// ============================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() !== '') {
            const fieldId = input.id;
            const errorElement = document.getElementById(`${fieldId}Error`);
            const formGroup = input.parentElement;
            
            if (errorElement.classList.contains('show')) {
                // Re-validate on blur
                formGroup.classList.remove('error');
                errorElement.textContent = '';
                errorElement.classList.remove('show');
            }
        }
    });
    
    input.addEventListener('focus', () => {
        const fieldId = input.id;
        const errorElement = document.getElementById(`${fieldId}Error`);
        errorElement.classList.remove('show');
    });
});

// ============================
// SMOOTH SCROLL ENHANCEMENT
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (href === '#') {
            e.preventDefault();
            return;
        }
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
            e.preventDefault();
            
            // Calculate offset for fixed navbar
            const offsetTop = targetElement.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe course cards and feature cards
document.querySelectorAll('.course-card, .feature-card, .info-card').forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 10) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================
// ACTIVE NAVIGATION LINK
// ============================
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================
// ACCESSIBILITY: KEYBOARD SUPPORT
// ============================
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================
// PERFORMANCE: LAZY LOADING
// ============================
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================
// INITIALIZATION
// ============================
document.addEventListener('DOMContentLoaded', () => {
    console.log('School Website loaded successfully');
    
    // Add any additional initialization code here
});

// ============================
// UTILITY FUNCTIONS
// ============================

// Debounce function for performance
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for performance
const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Log performance metrics (optional)
window.addEventListener('load', () => {
    if (window.performance && window.performance.timing) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    }
});
