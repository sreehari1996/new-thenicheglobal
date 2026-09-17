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
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.background = 'rgba(11, 17, 32, 0.9)';
    header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.background = 'rgba(11, 17, 32, 0.6)';
    header.style.boxShadow = 'none';
  }
});

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






// Section 08: GSAP Horizontal Scroll Logic
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  const horizontalSection = document.querySelector('.gsap-horizontal-section');
  const horizontalContainer = document.querySelector('.gsap-horizontal-container');
  const slides = document.querySelectorAll('.gsap-story-slide');

  if (horizontalSection && horizontalContainer && slides.length > 0) {
    let mm = gsap.matchMedia();
    
    // Only apply horizontal pin on desktop/tablet
    mm.add("(min-width: 993px)", () => {
      let scrollWidth = horizontalContainer.offsetWidth - window.innerWidth;

      gsap.to(horizontalContainer, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: horizontalSection,
          start: "top top",
          end: () => "+=" + scrollWidth, 
          pin: true,
          scrub: 1, 
          invalidateOnRefresh: true
        }
      });
    });
  }
}

