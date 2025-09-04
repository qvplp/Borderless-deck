// Game-Style Interactive Features for Ethereum Foundation Clone

class EthereumGame {
    constructor() {
        this.currentStep = 1;
        this.totalSteps = 6;
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.setupGameElements();
        this.setupEventListeners();
        this.setupProgressIndicator();
        this.setupAnimations();
        this.startGame();
    }

    setupGameElements() {
        this.gameContainer = document.querySelector('.game-container');
        this.steps = document.querySelectorAll('.game-step');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.nextButtons = document.querySelectorAll('.next-button');
        this.restartButton = document.querySelector('.restart-button');
        this.progressFill = document.getElementById('progressFill');
        this.currentStepElement = document.getElementById('currentStep');
        this.totalStepsElement = document.getElementById('totalSteps');
    }

    setupEventListeners() {
        // Next button clicks
        this.nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const nextStep = parseInt(button.dataset.next);
                if (nextStep && !this.isTransitioning) {
                    this.goToStep(nextStep);
                }
            });
        });

        // Restart button
        if (this.restartButton) {
            this.restartButton.addEventListener('click', (e) => {
                e.preventDefault();
                if (!this.isTransitioning) {
                    this.restartGame();
                }
            });
        }

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

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.isTransitioning) return;

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
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        this.gameContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.gameContainer.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
    }

    handleSwipe(startX, startY, endX, endY) {
        const deltaX = endX - startX;
        const deltaY = endY - startY;
        const minSwipeDistance = 50;

        // Check if it's a horizontal swipe
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            if (deltaX > 0) {
                // Swipe right - go to previous step
                this.previousStep();
            } else {
                // Swipe left - go to next step
                this.nextStep();
            }
        }
    }

    setupProgressIndicator() {
        if (this.totalStepsElement) {
            this.totalStepsElement.textContent = this.totalSteps;
        }
        this.updateProgress();
    }

    setupAnimations() {
        // Add entrance animations to each step
        this.steps.forEach((step, index) => {
            step.style.opacity = '0';
            step.style.transform = 'translateX(100%)';
        });

        // Animate the first step
        this.animateStepIn(this.steps[0]);
    }

    startGame() {
        // Show the first step
        this.showStep(1);
        
        // Add some initial animations
        setTimeout(() => {
            this.animateStepElements(1);
        }, 500);
    }

    goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > this.totalSteps || this.isTransitioning) {
            return;
        }

        this.isTransitioning = true;
        const currentStepElement = this.steps[this.currentStep - 1];
        const targetStepElement = this.steps[stepNumber - 1];

        // Animate current step out
        this.animateStepOut(currentStepElement, () => {
            // Hide all steps
            this.steps.forEach(step => {
                step.classList.remove('active');
                step.style.opacity = '0';
                step.style.transform = 'translateX(100%)';
            });

            // Show target step
            this.currentStep = stepNumber;
            this.showStep(stepNumber);
            this.updateProgress();
            this.updateNavigation();
            this.animateStepIn(targetStepElement);

            // Animate step elements
            setTimeout(() => {
                this.animateStepElements(stepNumber);
            }, 300);

            this.isTransitioning = false;
        });
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

    showStep(stepNumber) {
        const stepElement = this.steps[stepNumber - 1];
        if (stepElement) {
            stepElement.classList.add('active');
        }
    }

    animateStepIn(stepElement) {
        if (!stepElement) return;

        stepElement.style.opacity = '1';
        stepElement.style.transform = 'translateX(0)';
        stepElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    animateStepOut(stepElement, callback) {
        if (!stepElement) {
            callback();
            return;
        }

        stepElement.style.transform = 'translateX(-100%)';
        stepElement.style.opacity = '0';
        stepElement.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';

        setTimeout(callback, 400);
    }

    animateStepElements(stepNumber) {
        const stepElement = this.steps[stepNumber - 1];
        if (!stepElement) return;

        // Animate visual elements
        const visualElements = stepElement.querySelectorAll('.step-visual > *');
        visualElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, index * 200);
        });

        // Animate text elements
        const textElements = stepElement.querySelectorAll('.step-text > *');
        textElements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, (visualElements.length * 200) + (index * 150));
        });
    }

    updateProgress() {
        if (this.progressFill) {
            const progressPercentage = (this.currentStep / this.totalSteps) * 100;
            this.progressFill.style.width = `${progressPercentage}%`;
        }

        if (this.currentStepElement) {
            this.currentStepElement.textContent = this.currentStep;
        }
    }

    updateNavigation() {
        this.navLinks.forEach((link, index) => {
            const stepNumber = index + 1;
            if (stepNumber === this.currentStep) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    restartGame() {
        this.goToStep(1);
        
        // Reset all animations
        setTimeout(() => {
            this.steps.forEach(step => {
                const elements = step.querySelectorAll('*');
                elements.forEach(element => {
                    element.style.opacity = '';
                    element.style.transform = '';
                    element.style.transition = '';
                });
            });
        }, 1000);
    }

    // Auto-play functionality (optional)
    startAutoPlay(interval = 10000) {
        this.autoPlayInterval = setInterval(() => {
            if (this.currentStep < this.totalSteps) {
                this.nextStep();
            } else {
                this.restartGame();
            }
        }, interval);
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }

    // Step-specific animations
    animateStep1() {
        // Ethereum logo glow animation
        const logoGlow = document.querySelector('.ethereum-logo-glow');
        if (logoGlow) {
            logoGlow.style.animation = 'pulse 3s ease-in-out infinite';
        }
    }

    animateStep2() {
        // Garden scene animations
        const tree = document.querySelector('.garden-tree');
        const butterflies = document.querySelectorAll('.garden-butterfly');
        
        if (tree) {
            tree.style.animation = 'growTree 2s ease-out forwards';
        }
        
        butterflies.forEach((butterfly, index) => {
            butterfly.style.animation = `flutter 4s ease-in-out infinite ${index * 2}s`;
        });
    }

    animateStep3() {
        // Blockchain animation
        const blocks = document.querySelectorAll('.block');
        blocks.forEach((block, index) => {
            block.style.animation = `blockPulse 2s ease-in-out infinite ${index * 0.5}s`;
        });
    }

    animateStep4() {
        // Stats animation
        const statCircles = document.querySelectorAll('.stat-circle');
        statCircles.forEach((circle, index) => {
            circle.style.animation = `statPulse 3s ease-in-out infinite ${index * 1}s`;
        });
    }

    animateStep5() {
        // Timeline animation
        const timelineDots = document.querySelectorAll('.timeline-dot');
        timelineDots.forEach((dot, index) => {
            dot.style.animation = `timelinePulse 2s ease-in-out infinite ${index * 0.5}s`;
        });
    }

    animateStep6() {
        // Philosophy animation
        const rings = document.querySelectorAll('.symbol-ring');
        rings.forEach((ring, index) => {
            ring.style.animation = `rotate ${10 - index * 2}s linear infinite`;
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

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ethereumGame = new EthereumGame();
    
    // Optional: Start auto-play after 5 seconds of inactivity
    let inactivityTimer;
    const resetInactivityTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            if (window.ethereumGame && !window.ethereumGame.isTransitioning) {
                window.ethereumGame.startAutoPlay(8000);
            }
        }, 30000); // 30 seconds of inactivity
    };

    // Reset timer on any user interaction
    document.addEventListener('click', resetInactivityTimer);
    document.addEventListener('keydown', resetInactivityTimer);
    document.addEventListener('touchstart', resetInactivityTimer);

    // Start the inactivity timer
    resetInactivityTimer();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EthereumGame;
}
