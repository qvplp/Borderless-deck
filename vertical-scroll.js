// Vertical Scroll Navigation for Borderless World

class VerticalScrollNavigation {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.isTransitioning = false;
        this.scrollThreshold = 100;
        this.init();
    }

    init() {
        this.setupElements();
        this.setupEventListeners();
        this.setupScrollDetection();
        this.startNavigation();
    }

    setupElements() {
        this.scrollContainer = document.querySelector('.vertical-scroll-container');
        this.sections = document.querySelectorAll('.scroll-section');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.nextPageButtons = document.querySelectorAll('.next-page-button');
    }

    setupEventListeners() {
        // Navigation links
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const step = parseInt(link.dataset.step);
                if (step && !this.isTransitioning) {
                    this.goToStep(step);
                }
            });
        });


        // Next page buttons
        this.nextPageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const nextStep = parseInt(button.dataset.next);
                if (nextStep && !this.isTransitioning) {
                    this.goToStep(nextStep);
                }
            });
        });

        // Keyboard navigation (optional - for accessibility)
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) {
                e.preventDefault();
                return;
            }

            switch(e.key) {
                case 'ArrowRight':
                case ' ':
                    e.preventDefault();
                    this.nextStep();
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    this.previousStep();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.goToStep(1);
                    break;
                case 'End':
                    e.preventDefault();
                    this.goToStep(this.totalSteps);
                    break;
            }
        });

        // Touch/swipe support
        this.setupTouchEvents();
    }

    setupTouchEvents() {
        let startY = 0;
        let endY = 0;
        let touchStartTime = 0;

        this.scrollContainer.addEventListener('touchstart', (e) => {
            if (this.isTransitioning) {
                e.preventDefault();
                return;
            }
            startY = e.touches[0].clientY;
            touchStartTime = Date.now();
        });

        this.scrollContainer.addEventListener('touchend', (e) => {
            if (this.isTransitioning) {
                e.preventDefault();
                return;
            }
            endY = e.changedTouches[0].clientY;
            const touchDuration = Date.now() - touchStartTime;
            
            // Only process swipe if it's quick enough
            if (touchDuration < 500) {
                this.handleSwipe(startY, endY);
            }
        });
    }

    handleSwipe(startY, endY) {
        const deltaY = endY - startY;
        const minSwipeDistance = 80; // Increased threshold

        if (Math.abs(deltaY) > minSwipeDistance) {
            if (deltaY > 0) {
                // Swipe down - go to previous step
                this.previousStep();
            } else {
                // Swipe up - go to next step
                this.nextStep();
            }
        }
    }

    setupScrollDetection() {
        // Enable native scroll
        document.body.style.overflow = 'auto';
        this.scrollContainer.style.overflow = 'visible';
        
        // Add scroll event listener for section visibility
        window.addEventListener('scroll', () => {
            this.updateActiveSection();
        });
    }

    updateActiveSection() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + sectionHeight / 2;
            
            // Check if section is in viewport
            if (scrollPosition + windowHeight / 2 >= sectionTop && 
                scrollPosition + windowHeight / 2 <= sectionTop + sectionHeight) {
                this.currentStep = index + 1;
                this.updateNavigation();
            }
        });
    }

    detectCurrentSection() {
        // This method is no longer needed as we control navigation manually
        // Keeping it for potential future use
    }

    startNavigation() {
        this.updateCurrentStep(1);
        this.animateSection(1);
    }

    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps || this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;
        const targetSection = this.sections[stepNumber - 1];
        
        if (targetSection) {
            // Smooth scroll to section
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update current step
            this.updateCurrentStep(stepNumber);
            
            setTimeout(() => {
                this.isTransitioning = false;
            }, 800);
        }
    }

    nextStep() {
        if (this.currentStep < this.totalSteps) {
            this.goToStep(this.currentStep + 1);
        }
    }

    previousStep() {
        if (this.currentStep > 1) {
            this.goToStep(this.currentStep - 1);
        }
    }

    updateCurrentStep(stepNumber) {
        this.currentStep = stepNumber;
        


        // Update navigation
        this.updateNavigation();
    }

    updateNavigation() {
        // Update nav links
        this.navLinks.forEach((link, index) => {
            const stepNumber = index + 1;
            if (stepNumber === this.currentStep) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });


        // Update sections
        this.sections.forEach((section, index) => {
            const stepNumber = index + 1;
            if (stepNumber === this.currentStep) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });
    }

    animateSection(stepNumber) {
        const section = this.sections[stepNumber - 1];
        if (!section) return;

        // Animate text elements
        const textElements = section.querySelectorAll('.flowing-text');
        textElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate feature cards
        const featureCards = section.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, (textElements.length * 200) + (index * 150));
        });

        // Animate visual elements
        const visualElements = section.querySelectorAll('.visual-element > *');
        visualElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }

    // Public API
    getCurrentStep() {
        return this.currentStep;
    }

    getTotalSteps() {
        return this.totalSteps;
    }

    isAtLastStep() {
        return this.currentStep === this.totalSteps;
    }

    isAtFirstStep() {
        return this.currentStep === 1;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.verticalScroll = new VerticalScrollNavigation();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = VerticalScrollNavigation;
}
