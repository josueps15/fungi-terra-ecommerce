// ============================================
// PREMIUM ANIMATIONS & MICROINTERACTIONS
// Biorganix - Advanced UI/UX Enhancements
// ============================================

// Scroll Reveal Animation System
function initPremiumScrollReveal() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation delay
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, index * 100);

                // Unobserve after revealing (performance optimization)
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal classes
    document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right').forEach(el => {
        revealObserver.observe(el);
    });

    // Observe product cards with stagger effect
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.1}s`;
        revealObserver.observe(card);
    });

    // Observe news cards
    document.querySelectorAll('.news-card').forEach((card, index) => {
        card.classList.add('scroll-reveal');
        card.style.transitionDelay = `${index * 0.15}s`;
        revealObserver.observe(card);
    });
}

// Premium Header Scroll Effects
function initPremiumHeaderEffects() {
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Shrink header on scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Hide/show header on scroll direction
        if (currentScroll > lastScroll && currentScroll > 500) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// Cart Overlay Effects
function initCartOverlayEffects() {
    const cartBtn = document.getElementById('cartBtn');
    const cartModal = document.getElementById('cartModal');
    const cartOverlay = document.getElementById('cartOverlay');
    const closeCart = document.getElementById('closeCart');

    if (cartBtn && cartModal && cartOverlay) {
        cartBtn.addEventListener('click', () => {
            cartModal.classList.add('active');
            cartOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        const closeCartModal = () => {
            cartModal.classList.remove('active');
            cartOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeCart) {
            closeCart.addEventListener('click', closeCartModal);
        }

        cartOverlay.addEventListener('click', closeCartModal);

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && cartModal.classList.contains('active')) {
                closeCartModal();
            }
        });
    }
}

// Button Ripple Effect
function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple-effect');

    button.appendChild(ripple);

    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple effect to all buttons
function initButtonRipples() {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', createRipple);
    });
}

// Smooth Scroll for Anchor Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);

            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navMenu = document.querySelector('.nav-menu');
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        });
    });
}

// Parallax Effect for Hero Image
function initParallaxEffect() {
    const heroImage = document.querySelector('.hero-image');

    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;

            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// Number Counter Animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// Initialize counters when visible
function initCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');

    if (counters.length === 0) return;

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-counter'));
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Form Input Focus Effects
function initFormEffects() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea');

    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Check if input has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
}

// Image Lazy Loading with Fade In
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Product Card Hover 3D Effect
function init3DCardEffect() {
    const cards = document.querySelectorAll('.product-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Toast Notification System (Enhanced)
function showPremiumNotification(message, type = 'success', duration = 3000) {
    const existing = document.querySelector('.premium-notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `premium-notification premium-notification-${type}`;

    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';

    notification.innerHTML = `
    <div class="notification-icon">${icon}</div>
    <div class="notification-message">${message}</div>
  `;

    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Add CSS for premium notifications
function addPremiumNotificationStyles() {
    if (document.getElementById('premium-notification-styles')) return;

    const style = document.createElement('style');
    style.id = 'premium-notification-styles';
    style.textContent = `
    .premium-notification {
      position: fixed;
      top: 100px;
      right: -400px;
      max-width: 400px;
      padding: 1.5rem 2rem;
      background: white;
      border-radius: 1rem;
      box-shadow: 0 20px 40px rgba(0,0,0,0.15);
      z-index: 10000;
      transition: right 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      display: flex;
      align-items: center;
      gap: 1rem;
      border-left: 4px solid #4A6B35;
    }
    
    .premium-notification.show {
      right: 2rem;
    }
    
    .premium-notification-success {
      border-left-color: #4A6B35;
      background: linear-gradient(135deg, #ffffff 0%, #f0f9f4 100%);
    }
    
    .premium-notification-error {
      border-left-color: #C75B39;
      background: linear-gradient(135deg, #ffffff 0%, #fef2f2 100%);
    }
    
    .notification-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(135deg, #4A6B35, #6B9B37);
      color: white;
    }
    
    .premium-notification-error .notification-icon {
      background: linear-gradient(135deg, #C75B39, #d47050);
    }
    
    .notification-message {
      flex: 1;
      font-weight: 500;
      color: #1A1A1A;
    }
    
    .ripple-effect {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s ease-out;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    @media (max-width: 768px) {
      .premium-notification {
        max-width: calc(100% - 2rem);
        right: -100%;
      }
      
      .premium-notification.show {
        right: 1rem;
      }
    }
  `;

    document.head.appendChild(style);
}

// Loading Skeleton for Products
function showLoadingSkeleton(gridId) {
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const skeletonHTML = Array(6).fill().map(() => `
    <div class="product-card skeleton">
      <div class="skeleton-image"></div>
      <div class="skeleton-content">
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
  `).join('');

    grid.innerHTML = skeletonHTML;
}

// Initialize all premium animations
function initPremiumAnimations() {
    // Add notification styles
    addPremiumNotificationStyles();

    // Initialize all effects
    initPremiumScrollReveal();
    initPremiumHeaderEffects();
    initCartOverlayEffects();
    initButtonRipples();
    initSmoothScroll();
    initParallaxEffect();
    initCounterAnimations();
    initFormEffects();
    initLazyLoading();

    // 3D card effect only on desktop
    if (window.innerWidth > 1024) {
        init3DCardEffect();
    }

    console.log('✨ Premium Biorganix animations initialized');
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPremiumAnimations);
} else {
    initPremiumAnimations();
}

// Export functions for use in main script
window.BiorganixAnimations = {
    showNotification: showPremiumNotification,
    createRipple,
    animateCounter,
    showLoadingSkeleton
};
