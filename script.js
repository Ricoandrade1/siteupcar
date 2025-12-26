// UP Car Landing Page - Interactive Enhancements

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.nav').offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for scroll animations
    const animatedElements = document.querySelectorAll(
        '.feature-card, .story-slide, .pricing-card, .testimonial-card, .step-card, .mission-box'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Highlight active pricing plan on hover
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            pricingCards.forEach(c => c.style.opacity = '0.6');
            this.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', function() {
            pricingCards.forEach(c => c.style.opacity = '1');
        });
    });

    // Track CTA clicks (preparation for analytics)
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            console.log('CTA Clicked:', buttonText);
            // Future: Add analytics tracking here
            // gtag('event', 'cta_click', { 'button_text': buttonText });
        });
    });

    // Add active state to navigation on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    function setActiveNav() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--color-accent)';
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Parallax effect for hero gradient
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroGradient.style.transform = `translateY(${rate}px)`;
        });
    }

    // Initialize animations for elements already in view
    setTimeout(() => {
        const elementsInView = document.querySelectorAll('.fade-in');
        elementsInView.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.style.opacity = '1';
            }
        });
    }, 100);

});
