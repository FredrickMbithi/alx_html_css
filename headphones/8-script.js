/**
 * Hamburger Menu Toggle Script
 * Handles the mobile navigation menu functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Check if elements exist
    if (!hamburger || !navMenu) {
        console.error('Hamburger menu elements not found');
        return;
    }

    // Toggle mobile menu
    function toggleMenu() {
        const isActive = hamburger.classList.contains('active');
        
        // Toggle classes
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Update aria-expanded for accessibility
        hamburger.setAttribute('aria-expanded', !isActive);
        
        // Prevent body scroll when menu is open
        if (!isActive) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = '';
        }
    }

    // Close mobile menu
    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        body.style.overflow = '';
    }

    // Event listeners
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        // Close menu if window is resized to desktop size
        if (window.innerWidth > 480 && navMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            const href = this.getAttribute('href');
            
            // Only handle internal links (starting with #)
            if (href && href.startsWith('#')) {
                event.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Close mobile menu first
                    closeMenu();
                    
                    // Smooth scroll to target
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300); // Delay to allow menu close animation
                }
            }
        });
    });
});

// Add loading class to body for initial animation
document.body.classList.add('loading');

// Remove loading class after page load
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
});