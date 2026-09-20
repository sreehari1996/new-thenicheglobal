// Preloader Logic
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('loaded');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 600); // Matches CSS transition duration
  }
});

// ==========================================
// Lenis Smooth Scrolling Initialization
// ==========================================
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Premium momentum ease
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Sync Lenis scroll with GSAP ScrollTrigger
if (typeof ScrollTrigger !== 'undefined') {
  lenis.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
} else {
  // Fallback requestAnimationFrame if GSAP isn't loaded
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

// Handle anchor links for smooth scrolling via Lenis
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId && targetId !== '#') {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, { offset: -80 }); // Offset for fixed header
      }
    } else if (targetId === '#') {
      lenis.scrollTo(0); // Scroll to top
    }
  });
});

// Intersection Observer for scroll animations
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Optional: Stop observing once revealed
      // observer.unobserve(entry.target);
    }
  });
};

const revealOptions = {
  root: null,
  rootMargin: '0px 0px -100px 0px',
  threshold: 0.1
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
  revealObserver.observe(el);
});

// Interactive Profile Matcher Logic
function nextStep(stepNumber) {
  // Hide all steps
  const steps = document.querySelectorAll('.matcher-step');
  steps.forEach(step => {
    step.classList.remove('active');
  });
  
  // Show target step
  const targetStep = document.getElementById(`step-${stepNumber}`);
  if (targetStep) {
    targetStep.classList.add('active');
  }
}

function showResult() {
  // Hide all steps
  const steps = document.querySelectorAll('.matcher-step');
  steps.forEach(step => {
    step.classList.remove('active');
  });
  
  // Show result step
  const resultStep = document.getElementById('step-result');
  if (resultStep) {
    resultStep.classList.add('active');
  }
}

// Header scroll effect
const header = document.querySelector('.header');
const heroSection = document.querySelector('section[class*="hero"]') || document.querySelector('#home');

window.addEventListener('scroll', () => {
  // Use hero section height, fallback to window height (minus header padding)
  const threshold = (heroSection ? heroSection.offsetHeight : window.innerHeight) - 80;

  if (window.scrollY > threshold) {
    header.style.backgroundColor = 'rgba(18, 31, 40, 0.95)';
    header.style.backdropFilter = 'blur(10px)';
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
    header.style.padding = '1rem 24px';
  } else {
    header.style.backgroundColor = 'transparent';
    header.style.backdropFilter = 'none';
    header.style.boxShadow = 'none';
    header.style.padding = '1.5rem 24px';
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navItems = navLinks.querySelectorAll('a');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

// Hero Carousel Logic
let currentSlide = 0;
const slidesContent = document.querySelectorAll('.hero-content');
const slidesBg = document.querySelectorAll('.hero-bg');
const dots = document.querySelectorAll('.carousel-dot');

function goToSlide(index) {
  if (!slidesContent.length || index === currentSlide) return;
  
  slidesContent[currentSlide].classList.remove('slide-active');
  slidesBg[currentSlide].classList.remove('slide-active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = index;
  
  slidesContent[currentSlide].classList.add('slide-active');
  slidesBg[currentSlide].classList.add('slide-active');
  dots[currentSlide].classList.add('active');
}

// Auto-advance
setInterval(() => {
  if(slidesContent.length > 0) {
    let next = (currentSlide + 1) % slidesContent.length;
    goToSlide(next);
  }
}, 6000);


// GSAP Animations
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // Who We Are Section Animations (Clean Elegant Overlap)
  const whoWeAreTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#who-we-are',
      start: 'top 70%',
      toggleActions: 'play none none none'
    }
  });

  // Fade in text block
  whoWeAreTl.fromTo('.gsap-clean-text',
    { opacity: 0, x: -40 },
    { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
  );

  // Bring in the main image
  whoWeAreTl.fromTo('.gsap-img-main',
    { opacity: 0, y: 60, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power4.out' },
    '-=0.6'
  );

  // Bring in the secondary image overlapping it
  whoWeAreTl.fromTo('.gsap-img-secondary',
    { opacity: 0, x: -40, y: 40 },
    { opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out' },
    '-=0.8'
  );

  // Pop in the floating badge
  whoWeAreTl.fromTo('.gsap-img-badge',
    { opacity: 0, scale: 0.8 },
    { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' },
    '-=0.6'
  );

  // Fade up the CTA button
  whoWeAreTl.fromTo('.gsap-cta-reveal',
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
    '-=0.4'
  );

  // Methodology Section Animations (Section 03) - Cinematic Glass Timeline
  
  // Reveal the header
  gsap.fromTo('.gsap-meth-header-new',
    { opacity: 0, y: -30 },
    {
      opacity: 1, y: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: {
        trigger: '#methodology',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    }
  );

  // Animate the timeline central line glowing down
  gsap.to('.timeline-progress', {
    height: '100%',
    ease: 'none',
    scrollTrigger: {
      trigger: '.cinematic-timeline',
      start: 'top 50%',
      end: 'bottom 80%',
      scrub: true
    }
  });

  // Reveal timeline cards individually as you scroll down
  const timelineCards = document.querySelectorAll('.gsap-timeline-card');
  timelineCards.forEach((card, i) => {
    // Alternate sides for slide-in effect
    let startX = i % 2 === 0 ? -50 : 50; 
    if (i === 4) startX = 0; // Last card is center

    gsap.fromTo(card,
      { opacity: 0, x: startX, y: 30 },
      {
        opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
}

// Mobile View: Apply GSAP Stagger Animations to Each Section on Scroll
let mmMobile = gsap.matchMedia();
mmMobile.add("(max-width: 900px)", () => {
  
  // Hide the first slide (Intro slide) of success stories on mobile view
  const firstStorySlide = document.querySelector('#success-stories .gsap-story-slide:first-child');
  if (firstStorySlide) {
    firstStorySlide.style.display = 'none';
  }

  const mobileSections = document.querySelectorAll('.section');
  mobileSections.forEach(section => {
    // Skip sections that already have dedicated GSAP timelines handled elsewhere
    if (section.id === 'who-we-are' || section.id === 'methodology' || section.id === 'how-it-works') return;
    
    // Select key content elements to stagger animate (removed .dest-card to give it a custom animation)
    const elementsToAnimate = section.querySelectorAll('h2, h3, p, .subtitle, .btn, .pathway-card, .trust-list li, .collage-img, .partner-logo, .form-input');
    
    if (elementsToAnimate.length > 0) {
      gsap.fromTo(elementsToAnimate,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  });

  // Dedicated Mobile Animation for Destination Cards
  const destCards = document.querySelectorAll('.dest-card');
  if (destCards.length > 0) {
    destCards.forEach((card, i) => {
      let destTl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      });
      
      // Card scales and fades up
      destTl.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power3.out' }
      )
      // Content inside staggers in
      .fromTo(card.querySelectorAll('.dest-card-content h3, .dest-card-content p, .dest-card-content a'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' },
        "-=0.4"
      );
    });
  }
  
  // Cleanup function runs when transitioning back to desktop view (> 900px)
  return () => {
    if (firstStorySlide) {
      firstStorySlide.style.display = '';
    }
  };
});

// Removed GSAP Horizontal Scroll and Mobile Slider Logic since Success Stories is now a CSS Grid.

// ==========================================
// Section 09: Profile Matcher Logic
// ==========================================
let matcherState = {
  Qualification: '',
  Experience: '',
  Field: '',
  Objective: '',
  Destination: ''
};

function updateMatcherProgress(step) {
  const bars = document.querySelectorAll('#matcher-progress-container .progress-bar');
  bars.forEach((bar, index) => {
    if (index < step) {
      bar.classList.add('active');
    } else {
      bar.classList.remove('active');
    }
  });
}

window.nextMatcherStep = function(nextStepId, key, value) {
  if (key && value) {
    matcherState[key] = value;
  }
  
  // Hide all steps
  document.querySelectorAll('.matcher-step').forEach(step => {
    step.style.display = 'none';
  });
  
  // Show next step
  const nextStep = document.getElementById(`matcher-step-${nextStepId}`);
  if (nextStep) {
    nextStep.style.display = 'block';
    
    // Animate in
    gsap.fromTo(nextStep, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });
  }
  
  updateMatcherProgress(nextStepId > 6 ? 6 : nextStepId);
};

window.prevMatcherStep = function(prevStepId) {
  // Hide all steps
  document.querySelectorAll('.matcher-step').forEach(step => {
    step.style.display = 'none';
  });
  
  // Show prev step
  const prevStep = document.getElementById(`matcher-step-${prevStepId}`);
  if (prevStep) {
    prevStep.style.display = 'block';
  }
  
  updateMatcherProgress(prevStepId);
};

window.submitMatcher = function(event) {
  event.preventDefault();
  
  // Collect lead details
  matcherState.Name = document.getElementById('m-name').value;
  matcherState.Phone = document.getElementById('m-phone').value;
  matcherState.Email = document.getElementById('m-email').value;
  
  // Update result text dynamically based on selected field
  const resultField = document.getElementById('result-field');
  if (resultField) {
    resultField.textContent = matcherState.Field || 'your chosen field';
  }
  
  // Move to result step
  nextMatcherStep(7);
};

// ==========================================
// Section 10: Horizontal Journey GSAP
// ==========================================
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  const hjSteps = document.querySelectorAll('.gsap-hj-step');
  if (hjSteps.length > 0) {
    gsap.fromTo(hjSteps,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.horizontal-journey',
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  // Animate the progress line (width on desktop, height on mobile)
  const hjProgress = document.getElementById('hj-progress');
  if (hjProgress) {
    let hjMm = gsap.matchMedia();
    
    hjMm.add("(min-width: 993px)", () => {
      gsap.to(hjProgress, {
        width: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-journey',
          start: 'top 75%',
          end: 'bottom 85%',
          scrub: true
        }
      });
    });

    hjMm.add("(max-width: 992px)", () => {
      gsap.to(hjProgress, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '.horizontal-journey',
          start: 'top 80%',
          end: 'bottom 90%',
          scrub: true
        }
      });
    });
  }
}

// ==========================================
// Section 11: FAQ Accordion Logic
// ==========================================
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
  const header = item.querySelector('.faq-header');
  header.addEventListener('click', () => {
    const isActive = item.classList.contains('active');
    
    // Close all
    faqItems.forEach(faq => {
      faq.classList.remove('active');
      const content = faq.querySelector('.faq-content');
      if (content) content.style.maxHeight = null;
    });

    // Open if it wasn't active
    if (!isActive) {
      item.classList.add('active');
      const content = item.querySelector('.faq-content');
      if (content) content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// ==========================================
// Back to Top Button Logic
// ==========================================
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==========================================
// Success Stories Mobile Slider Logic
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const storiesGrid = document.querySelector('.stories-grid');
  const storyCards = document.querySelectorAll('.stories-grid .story-card');
  const dotsContainer = document.querySelector('.stories-slider-dots');
  
  if (storiesGrid && storyCards.length > 0 && dotsContainer) {
    let currentStory = 0;
    
    // Create dots
    storyCards.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('story-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        scrollToStory(i);
      });
      dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.story-dot');
    
    function scrollToStory(index) {
      if (index < 0 || index >= storyCards.length) return;
      currentStory = index;
      
      // Update dots
      dots.forEach(d => d.classList.remove('active'));
      if(dots[currentStory]) dots[currentStory].classList.add('active');
      
      // Scroll grid
      const card = storyCards[currentStory];
      storiesGrid.scrollTo({
        left: card.offsetLeft - storiesGrid.offsetLeft,
        behavior: 'smooth'
      });
    }
    
    // Auto slide
    let storyAutoSlide = setInterval(() => {
      // Only auto-slide if on mobile/tab view (where dots are visible)
      if (window.innerWidth <= 992) {
        let next = (currentStory + 1) % storyCards.length;
        scrollToStory(next);
      }
    }, 4000);
    
    // Pause on touch/interaction
    storiesGrid.addEventListener('touchstart', () => clearInterval(storyAutoSlide), {passive: true});
    storiesGrid.addEventListener('mousedown', () => clearInterval(storyAutoSlide), {passive: true});
    
    // Listen for manual scrolling to update dots
    storiesGrid.addEventListener('scroll', () => {
      if (window.innerWidth > 992) return;
      
      const scrollLeft = storiesGrid.scrollLeft;
      const cardWidth = storyCards[0].offsetWidth;
      let newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== currentStory && newIndex >= 0 && newIndex < storyCards.length) {
        currentStory = newIndex;
        dots.forEach(d => d.classList.remove('active'));
        if(dots[currentStory]) dots[currentStory].classList.add('active');
      }
    }, {passive: true});
  }
});
