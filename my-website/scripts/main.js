// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav item
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Handle dropdowns on mobile
                if (this.classList.contains('dropdown')) {
                    this.classList.toggle('active');
                }
            }
        });
    });
    
    // Scroll animation for content section
    const contentSection = document.querySelector('.content-section');
    
    function checkScroll() {
        const sectionTop = contentSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            contentSection.classList.add('visible');
            window.removeEventListener('scroll', checkScroll);
        }
    }
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Check on initial load
});