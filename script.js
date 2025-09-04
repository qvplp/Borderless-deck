// Ethereum Foundation Website - Interactive Features
class EthereumFoundation {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupScrollAnimations();
        this.setupHeroAnimations();
        this.setupGardenInteractions();
        this.setupSmoothScrolling();
        this.setupMobileMenu();
        this.setupParallaxEffects();
        this.setupLoadingStates();
    }

    // Navigation functionality
    setupNavigation() {
        const nav = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 10, 0.98)';
                nav.style.backdropFilter = 'blur(20px)';
            } else {
                nav.style.background = 'rgba(10, 10, 10, 0.95)';
                nav.style.backdropFilter = 'blur(10px)';
            }
        });

        // Active link highlighting
        const sections = document.querySelectorAll('section[id]');
        
        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Scroll animations
    setupScrollAnimations() {
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

        // Observe elements for scroll animations
        const animatedElements = document.querySelectorAll('.garden-card, .feature-item, .stat-item, .section-title, .section-description');
        animatedElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });
    }

    // Hero section animations
    setupHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroCta = document.querySelector('.hero-cta');
        const gardenNodes = document.querySelectorAll('.garden-node');

        // Staggered animation on load
        setTimeout(() => {
            if (heroTitle) {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }
        }, 100);

        setTimeout(() => {
            if (heroSubtitle) {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }
        }, 300);

        setTimeout(() => {
            if (heroCta) {
                heroCta.style.opacity = '1';
                heroCta.style.transform = 'translateY(0)';
            }
        }, 500);

        // Garden nodes animation
        gardenNodes.forEach((node, index) => {
            setTimeout(() => {
                node.style.opacity = '1';
                node.style.transform = 'scale(1)';
            }, 800 + (index * 200));
        });

        // CTA button interaction
        const ctaButton = document.querySelector('.cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToSection('infinite-garden');
            });
        }
    }

    // Garden interactions
    setupGardenInteractions() {
        const gardenCards = document.querySelectorAll('.garden-card');
        
        gardenCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 25px 50px rgba(98, 98, 255, 0.2)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
            });
        });

        // Blockchain animation
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            block.addEventListener('mouseenter', () => {
                block.style.animation = 'none';
                block.style.transform = 'scale(1.3)';
                block.style.background = 'linear-gradient(135deg, #4a4aff 0%, #6262ff 100%)';
            });

            block.addEventListener('mouseleave', () => {
                block.style.animation = 'blockPulse 2s ease-in-out infinite';
                block.style.transform = 'scale(1)';
                block.style.background = 'linear-gradient(135deg, #6262ff 0%, #4a4aff 100%)';
            });
        });
    }

    // Smooth scrolling
    setupSmoothScrolling() {
        const scrollHint = document.querySelector('.scroll-hint');
        if (scrollHint) {
            scrollHint.addEventListener('click', () => {
                this.scrollToSection('infinite-garden');
            });
        }

        // Scroll indicator animation
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                this.scrollToSection('infinite-garden');
            });
        }
    }

    // Mobile menu
    setupMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });

            // Close menu when clicking on links
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        }
    }

    // Parallax effects
    setupParallaxEffects() {
        const heroVisual = document.querySelector('.hero-visual');
        const gardenNodes = document.querySelectorAll('.garden-node');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;

            if (heroVisual) {
                heroVisual.style.transform = `translateY(${rate}px)`;
            }

            // Parallax effect for garden nodes
            gardenNodes.forEach((node, index) => {
                const speed = 0.1 + (index * 0.05);
                node.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Loading states
    setupLoadingStates() {
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            
            // Animate in elements
            const elements = document.querySelectorAll('.fade-in');
            elements.forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add('visible');
                }, index * 100);
            });
        });
    }

    // Utility functions
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const offsetTop = section.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Performance optimizations
    debounce(func, wait) {
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

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new EthereumFoundation();
});

// Additional interactive features
class InteractiveFeatures {
    constructor() {
        this.setupParticleSystem();
        this.setupTypingEffect();
        this.setupHoverEffects();
        this.setupScrollProgress();
    }

    // Particle system for hero section
    setupParticleSystem() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        `;

        hero.appendChild(particleContainer);

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.createParticle(particleContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(98, 98, 255, 0.6);
            border-radius: 50%;
            pointer-events: none;
        `;

        // Random position and animation
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = 3 + Math.random() * 4;
        const delay = Math.random() * 2;

        particle.style.left = `${x}%`;
        particle.style.top = `${y}%`;
        particle.style.animation = `particleFloat ${duration}s ease-in-out ${delay}s infinite`;

        container.appendChild(particle);

        // Add CSS animation
        if (!document.querySelector('#particle-animation')) {
            const style = document.createElement('style');
            style.id = 'particle-animation';
            style.textContent = `
                @keyframes particleFloat {
                    0%, 100% {
                        transform: translateY(0) translateX(0);
                        opacity: 0;
                    }
                    50% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100px) translateX(20px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // Typing effect for hero title
    setupTypingEffect() {
        const infiniteText = document.querySelector('.infinite-text');
        if (!infiniteText) return;

        const text = infiniteText.textContent;
        infiniteText.textContent = '';
        infiniteText.style.borderRight = '2px solid #6262ff';

        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                infiniteText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    infiniteText.style.borderRight = 'none';
                }, 1000);
            }
        };

        setTimeout(typeWriter, 2000);
    }

    // Enhanced hover effects
    setupHoverEffects() {
        const cards = document.querySelectorAll('.garden-card, .stat-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // Scroll progress indicator
    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #6262ff, #4a4aff);
            z-index: 9999;
            transition: width 0.1s ease;
        `;

        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    new InteractiveFeatures();
});

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.monitorPerformance();
    }

    monitorPerformance() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.entryType === 'largest-contentful-paint') {
                        console.log('LCP:', entry.startTime);
                    }
                    if (entry.entryType === 'first-input') {
                        console.log('FID:', entry.processingStart - entry.startTime);
                    }
                }
            });

            observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
        }

        // Monitor scroll performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                // Throttle scroll events for better performance
            }, 16);
        });
    }
}

// Initialize performance monitoring
new PerformanceMonitor();
