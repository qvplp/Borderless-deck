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
        this.progressDots = document.querySelectorAll('.progress-dot');
        this.progressFill = document.getElementById('progressFill');
        this.currentStepElement = document.getElementById('currentStep');
        this.totalStepsElement = document.getElementById('totalSteps');
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

        // Progress dots
        this.progressDots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                e.preventDefault();
                const step = parseInt(dot.dataset.step);
                if (step && !this.isTransitioning) {
                    this.goToStep(step);
                }
            });
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;

            switch(e.key) {
                case 'ArrowDown':
                case ' ':
                    e.preventDefault();
                    this.nextStep();
                    break;
                case 'ArrowUp':
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

        this.scrollContainer.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
        });

        this.scrollContainer.addEventListener('touchend', (e) => {
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startY, endY);
        });
    }

    handleSwipe(startY, endY) {
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

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
        // Mouse wheel navigation
        this.scrollContainer.addEventListener('wheel', (e) => {
            if (this.isTransitioning) return;
            
            e.preventDefault();
            if (e.deltaY > 0) {
                this.nextStep();
            } else if (e.deltaY < 0) {
                this.previousStep();
            }
        });

        // Scroll-based section detection
        window.addEventListener('scroll', () => {
            this.detectCurrentSection();
        });
    }

    detectCurrentSection() {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        this.sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionCenter = sectionTop + (sectionHeight / 2);
            
            if (scrollPosition >= sectionTop - windowHeight / 2 && 
                scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
                this.updateCurrentStep(index + 1);
            }
        });
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
            
            // Animate section
            setTimeout(() => {
                this.animateSection(stepNumber);
                this.isTransitioning = false;
            }, 500);
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
        
        // Update progress bar
        if (this.progressFill) {
            const progressPercentage = (stepNumber / this.totalSteps) * 100;
            this.progressFill.style.width = `${progressPercentage}%`;
        }

        // Update step counter
        if (this.currentStepElement) {
            this.currentStepElement.textContent = stepNumber;
        }

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

        // Update progress dots
        this.progressDots.forEach((dot, index) => {
            const stepNumber = index + 1;
            if (stepNumber === this.currentStep) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
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
