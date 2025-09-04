// Hamburger Menu Functionality
class HamburgerMenu {
    constructor() {
        this.toggle = document.getElementById('hamburgerToggle');
        this.overlay = document.getElementById('hamburgerOverlay');
        this.close = document.getElementById('hamburgerClose');
        this.links = document.querySelectorAll('.hamburger-link');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateActiveLink();
    }
    
    setupEventListeners() {
        // Toggle menu
        this.toggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu
        this.close.addEventListener('click', () => {
            this.closeMenu();
        });
        
        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeMenu();
            }
        });
        
        // Handle menu links
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const step = parseInt(link.dataset.step);
                this.navigateToStep(step);
                this.closeMenu();
            });
        });
        
        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeMenu();
            }
        });
        
        // Update active link when step changes
        document.addEventListener('stepChanged', (e) => {
            this.updateActiveLink(e.detail.step);
        });
    }
    
    toggleMenu() {
        if (this.isOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.isOpen = true;
        this.toggle.classList.add('active');
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        this.animateMenuItems();
    }
    
    closeMenu() {
        this.isOpen = false;
        this.toggle.classList.remove('active');
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    animateMenuItems() {
        this.links.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
    
    navigateToStep(step) {
        // Dispatch custom event to notify vertical scroll navigation
        const event = new CustomEvent('navigateToStep', {
            detail: { step: step }
        });
        document.dispatchEvent(event);
    }
    
    updateActiveLink(step = null) {
        // Get current step from vertical scroll navigation if not provided
        if (!step) {
            const activeSection = document.querySelector('.scroll-section.active');
            if (activeSection) {
                step = parseInt(activeSection.dataset.step);
            }
        }
        
        // Update active state
        this.links.forEach(link => {
            link.classList.remove('active');
            if (parseInt(link.dataset.step) === step) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize hamburger menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HamburgerMenu();
});
