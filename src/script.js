// Smooth Scroll Animation for All Sections
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    const scrollTopBtn = document.getElementById('scrollToTop');
    const currentYearSpan = document.getElementById('currentYear');
    
    // Set current year in footer
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    // Initialize animation states
    function initAnimations() {
        // Animate hero section on load
        animateSection('home');
        
        // Check for hash in URL (direct link to section)
        if (window.location.hash) {
            const targetId = window.location.hash.substring(1);
            setTimeout(() => {
                scrollToSection(targetId, false);
            }, 500);
        }
    }
    
    // Animate specific section
    function animateSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        switch(sectionId) {
            case 'home':
                // Hero animations already handled by CSS
                break;
                
            case 'about':
                // Animate skills items
                const skillItems = section.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    item.style.animationDelay = `${0.6 + (index * 0.1)}s`;
                });
                break;
                
            case 'portfolio':
                // Animate portfolio items
                const portfolioItems = section.querySelectorAll('.portfolio-item');
                portfolioItems.forEach((item, index) => {
                    item.style.animationDelay = `${0.2 + (index * 0.2)}s`;
                });
                break;
        }
    }
    
    // Smooth scroll to section with custom easing
    function scrollToSection(sectionId, updateHash = true) {
        const targetSection = document.getElementById(sectionId);
        if (!targetSection) return;
        
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000;
        let startTime = null;
        
        // Update URL hash (optional)
        if (updateHash && history.pushState) {
            history.pushState(null, null, `#${sectionId}`);
        }
        
        // Update active nav link
        updateActiveNavLink(sectionId);
        
        // Custom easing function
        function easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        }
        
        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const easeProgress = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + (distance * easeProgress));
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                // Scroll complete - trigger animations
                triggerSectionAnimations(sectionId);
            }
        }
        
        requestAnimationFrame(animation);
    }
    
    // Trigger animations when section is scrolled to
    function triggerSectionAnimations(sectionId) {
        const section = document.getElementById(sectionId);
        if (!section) return;
        
        // Add highlight animation
        section.style.animation = 'sectionHighlight 1.5s ease';
        setTimeout(() => {
            section.style.animation = '';
        }, 1500);
        
        // Trigger specific animations based on section
        switch(sectionId) {
            case 'about':
                // Animate skills with ripple effect
                const skillItems = section.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                        // Ripple effect
                        const ripple = document.createElement('span');
                        ripple.style.cssText = `
                            position: absolute;
                            border-radius: 50%;
                            background: rgba(24, 28, 20, 0.1);
                            transform: scale(0);
                            animation: ripple 0.6s linear;
                            pointer-events: none;
                        `;
                        item.style.position = 'relative';
                        item.style.overflow = 'hidden';
                        item.appendChild(ripple);
                        
                        // Remove ripple after animation
                        setTimeout(() => {
                            ripple.remove();
                        }, 600);
                    }, index * 200);
                });
                break;
                
            case 'portfolio':
                // Animate portfolio items with bounce
                const portfolioItems = section.querySelectorAll('.portfolio-item');
                portfolioItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'fadeInUp 0.6s ease forwards, bounce 0.5s ease 0.6s';
                    }, index * 200);
                });
                break;
                
            case 'home':
                // Add floating animation to profile photo
                const profilePhoto = section.querySelector('.profile-photo');
                if (profilePhoto) {
                    profilePhoto.style.animation = 'fadeInRight 1s ease, float 6s ease-in-out infinite';
                }
                break;
        }
    }
    
    // Update active nav link
    function updateActiveNavLink(activeId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkTarget = link.getAttribute('data-target') || 
                              link.getAttribute('href')?.substring(1);
            if (linkTarget === activeId) {
                link.classList.add('active');
            }
        });
    }
    
    // Check which section is in view
    function checkSectionInView() {
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.id;
            }
        });
        
        if (currentSection) {
            updateActiveNavLink(currentSection);
        }
        
        // Show/hide scroll to top button
        if (scrollTopBtn) {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }
    }
    
    // Add ripple effect to buttons
    function addRippleEffect(button) {
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: 100px;
                height: 100px;
                margin-top: -50px;
                margin-left: -50px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }
    
    // Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Skip for external links
            if (this.classList.contains('external-link') || 
                this.classList.contains('footer-link')) {
                return;
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('data-target') || 
                           this.getAttribute('href').substring(1);
            
            scrollToSection(targetId);
        });
        
        // Add ripple to CTA buttons
        if (link.classList.contains('cta-button')) {
            addRippleEffect(link);
        }
    });
    
    // Scroll to top button
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            scrollToSection('home');
        });
        
        addRippleEffect(scrollTopBtn);
    }
    
    // Window event listeners
    window.addEventListener('scroll', checkSectionInView);
    window.addEventListener('resize', checkSectionInView);
    
    // Initialize
    initAnimations();
    checkSectionInView();
    
    // Add CSS for ripple animation if not already in stylesheet
    if (!document.querySelector('#ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
});