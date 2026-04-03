/* ============================================
   KASHMIR ESTATES — INTERACTIONS & ANIMATIONS
   ============================================ */

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavigation();
  initScrollAnimations();
  initHorizontalScroll();
  initMagneticButtons();
  initWhatsAppFloat();
  initMenuOverlay();
  initPageTransitions();
});

// Custom Cursor
function initCursor() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor';
  document.body.appendChild(cursor);
  
  const isTouch = window.matchMedia('(hover: none)').matches;
  if (isTouch) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    requestAnimationFrame(animateCursor);
  }
  
  animateCursor();
  
  // Cursor states
  const hoverElements = document.querySelectorAll('a, button, .property-card, .filter-pill');
  
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  // Property cards get explore cursor
  document.querySelectorAll('.property-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      cursor.classList.remove('hover');
      cursor.classList.add('explore');
    });
    card.addEventListener('mouseleave', () => {
      cursor.classList.remove('explore');
    });
  });
  
  // Horizontal scroll gets drag cursor
  const horizontalContainer = document.querySelector('.properties-horizontal__container');
  if (horizontalContainer) {
    horizontalContainer.addEventListener('mouseenter', () => {
      cursor.classList.remove('hover');
      cursor.classList.add('drag');
    });
    horizontalContainer.addEventListener('mouseleave', () => {
      cursor.classList.remove('drag');
    });
  }
}

// Navigation Scroll Effect
function initNavigation() {
  const nav = document.querySelector('.nav');
  if (!nav) return;
  
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Scroll Animations with IntersectionObserver
function initScrollAnimations() {
  const observerOptions = {    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        
        // Animate stats if present
        if (entry.target.classList.contains('why__stats')) {
          animateStats();
        }
      }
    });
  }, observerOptions);
  
  // Observe reveal elements
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
  // Also observe sections for staggered animations
  document.querySelectorAll('.scene, .lifestyle, .why, .editorial').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}

// Animate Stats Counter
function animateStats() {
  const stats = document.querySelectorAll('.why__stat-number');
  
  stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        stat.textContent = stat.textContent;
        clearInterval(timer);
      } else {
        stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
      }
    }, 16);
  });
}

// Horizontal Scroll with Dragfunction initHorizontalScroll() {
  const container = document.querySelector('.properties-horizontal__container');
  if (!container) return;
  
  let isDown = false;
  let startX;
  let scrollLeft;
  
  container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.style.cursor = 'grabbing';
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;
  });
  
  container.addEventListener('mouseleave', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });
  
  container.addEventListener('mouseup', () => {
    isDown = false;
    container.style.cursor = 'grab';
  });
  
  container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
  });
}

// Magnetic Buttons
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn.magnetic');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });  });
}

// WhatsApp Float Button
function initWhatsAppFloat() {
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (!whatsappBtn) return;
  
  // Show after 3 seconds
  setTimeout(() => {
    whatsappBtn.classList.add('visible');
    
    // Pulse once
    setTimeout(() => {
      whatsappBtn.classList.add('pulse');
      setTimeout(() => {
        whatsappBtn.classList.remove('pulse');
      }, 2000);
    }, 500);
  }, 3000);
}

// Mobile Menu Overlay
function initMenuOverlay() {
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay = document.querySelector('.menu-overlay');
  const overlayLinks = document.querySelectorAll('.menu-overlay__link');
  
  if (!hamburger || !overlay) return;
  
  hamburger.addEventListener('click', () => {
    overlay.classList.toggle('active');
    document.body.style.overflow = overlay.classList.contains('active') ? 'hidden' : '';
  });
  
  overlayLinks.forEach(link => {
    link.addEventListener('click', () => {
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// Page Transitions
function initPageTransitions() {
  const links = document.querySelectorAll('a[href^="/"], a[href^="http"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');      if (href === '#' || href.startsWith('tel:') || href.startsWith('mailto:')) return;
      
      // Check if it's an external link or same page
      if (href.startsWith('http') && !href.includes(window.location.hostname)) return;
      
      e.preventDefault();
      
      document.body.style.opacity = '0';
      document.body.style.transition = 'opacity 200ms ease-out';
      
      setTimeout(() => {
        window.location.href = href;
      }, 200);
    });
  });
}

// Property Card Heart Toggle
document.addEventListener('click', (e) => {
  if (e.target.closest('.property-card__heart')) {
    const heart = e.target.closest('.property-card__heart');
    heart.classList.toggle('saved');
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroImage = document.querySelector('.hero__image');
  
  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `scale(1.1) translateY(${scrolled * 0.5}px)`;
  }
});

// Filter pills active statedocument.querySelectorAll('.filter-pill').forEach(pill => {
  pill.addEventListener('click', function() {
    this.parentElement.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
    this.classList.add('active');
  });
});
