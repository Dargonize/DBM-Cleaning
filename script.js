/* Updated script.js with fixed mobile navigation and animation */

document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // Mobile Navigation Toggle - Fixed implementation
    const setupMobileNav = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const nav = document.querySelector('nav');
        
        if (menuToggle && nav) {
            menuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                nav.classList.toggle('active');
                
                // Prevent body scrolling when menu is open
                if (nav.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu when clicking on a link
            const navLinks = nav.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    nav.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
    };
    
    // Back to Top Button
    const setupBackToTopButton = () => {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top';
        backToTopBtn.innerHTML = '↑';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        document.body.appendChild(backToTopBtn);
        
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    };
    
    // Form Validation
    const setupFormValidation = () => {
        const contactForm = document.querySelector('#contact form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const formData = {};
                const formFields = this.querySelectorAll('input, textarea, select');
                
                formFields.forEach(field => {
                    // Remove existing error messages
                    const existingError = field.parentNode.querySelector('.error-message');
                    if (existingError) {
                        existingError.remove();
                    }
                    
                    field.classList.remove('error');
                    
                    if (field.hasAttribute('required') && !field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        
                        const errorMsg = document.createElement('div');
                        errorMsg.className = 'error-message';
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMsg);
                    } else if (field.type === 'email' && field.value.trim()) {
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailPattern.test(field.value)) {
                            isValid = false;
                            field.classList.add('error');
                            
                            const errorMsg = document.createElement('div');
                            errorMsg.className = 'error-message';
                            errorMsg.textContent = 'Please enter a valid email address';
                            field.parentNode.appendChild(errorMsg);
                        }
                    }
                    
                    formData[field.name] = field.value;
                });
                
                if (isValid) {
                    // Show success message
                    contactForm.innerHTML = `
                        <div class="form-success">
                            <h3>Thank you for your message!</h3>
                            <p>We have received your inquiry and will get back to you shortly.</p>
                        </div>
                    `;
                    
                    // In a real implementation, you would send the form data to a server here
                    console.log('Form submitted successfully', formData);
                }
            });
        }
    };
    
    // Parallax effect for hero section
    const setupParallax = () => {
        const hero = document.querySelector('.hero');
        
        if (hero && window.innerWidth > 768) { // Only apply parallax on desktop
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                if (scrollPosition < hero.offsetHeight) {
                    // Move the background slightly as user scrolls
                    hero.style.backgroundPositionY = `${50 + scrollPosition * 0.1}%`;
                }
            });
        }
    };
    
    // Smooth scrolling for navigation links
    const setupSmoothScroll = () => {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    const mobileNav = document.querySelector('nav.active');
                    const menuToggle = document.querySelector('.menu-toggle.active');
                    if (mobileNav && menuToggle) {
                        mobileNav.classList.remove('active');
                        menuToggle.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                    
                    // Calculate offset for fixed header
                    let headerOffset = 0;
                    const header = document.querySelector('header');
                    
                    // Different offsets for mobile vs desktop
                    if (window.innerWidth > 768) {
                        headerOffset = header ? header.offsetHeight : 0;
                    } else {
                        headerOffset = 20; // Smaller offset for mobile
                    }
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };
    
    // Add "animate-on-scroll" class to elements
    const setupAnimationClasses = () => {
        // Add animation classes to section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            if (!title.classList.contains('animate-on-scroll')) {
                title.classList.add('animate-on-scroll');
            }
        });
        
        // Add animation classes to service cards
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            if (!card.classList.contains('animate-on-scroll')) {
                card.classList.add('animate-on-scroll');
                card.style.animationDelay = `${index * 0.1}s`;
            }
        });
        
        // Add animation to about section
        const aboutImg = document.querySelector('.about-img');
        const aboutContent = document.querySelector('.about-content');
        if (aboutImg && !aboutImg.classList.contains('animate-on-scroll')) {
            aboutImg.classList.add('animate-on-scroll');
        }
        if (aboutContent && !aboutContent.classList.contains('animate-on-scroll')) {
            aboutContent.classList.add('animate-on-scroll');
        }
        
        // Add animation to contact section
        const contactForm = document.querySelector('.contact-form');
        const contactInfo = document.querySelector('.contact-info');
        if (contactForm && !contactForm.classList.contains('animate-on-scroll')) {
            contactForm.classList.add('animate-on-scroll');
        }
        if (contactInfo && !contactInfo.classList.contains('animate-on-scroll')) {
            contactInfo.classList.add('animate-on-scroll');
        }
    };
    
    // Header effect on scroll
   const setupHeaderScroll = () => {
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    if (header && window.innerWidth > 768) { // Apenas aplicar em desktop
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Esconder apenas o header quando rolar para baixo
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.classList.add('hide');
                // NÃO modificar a barra de contatos superior
            } else {
                header.classList.remove('hide');
                // NÃO modificar a barra de contatos superior
            }

            // Adicionar/remover classe "scrolled" para estilização
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScrollTop = scrollTop;
        });
    }
};
    
    // Check if images exist and handle missing images
    const handleMissingImages = () => {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.onerror = function() {
                this.onerror = null;
                this.src = ''; // You could set a placeholder here
                this.alt = 'Image not found';
                this.style.display = 'none'; // Hide broken images
            };
        });
        
        // Handle background images 
        const bgElements = document.querySelectorAll('.service-img, .about-img, .hero');
        bgElements.forEach(el => {
            if (window.getComputedStyle(el).backgroundImage === 'none' || 
                window.getComputedStyle(el).backgroundImage === '') {
                // Set a fallback background color
                el.style.backgroundColor = '#f1f1f1';
            }
        });
    };
    
    // Run all setup functions
    setupMobileNav();
    setupAnimationClasses();
    animateOnScroll();
    setupBackToTopButton();
    setupFormValidation();
    setupParallax();
    setupSmoothScroll();
    setupHeaderScroll();
    handleMissingImages();
});