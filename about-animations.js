window.addEventListener("load", () => {
  // Ensure GSAP and ScrollTrigger are available
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero Section Animations
  const heroTl = gsap.timeline();

  heroTl.from(".about-hero .label", {
    y: 20,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out"
  })
  .from(".about-hero h1", {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.6")
  .from(".about-hero p", {
    y: 20,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  }, "-=0.6");

  // 2. Intro Text Reveal
  gsap.fromTo(".intro-text-large", 
    { y: 40, opacity: 0 },
    {
      scrollTrigger: {
        trigger: ".about-intro-section",
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }
  );

  // 3. Glass Cards Stagger (Expertise Section)
  gsap.fromTo(".glass-card", 
    { y: 50, opacity: 0 },
    {
      scrollTrigger: {
        trigger: ".capabilities-section",
        start: "top 75%",
      },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out"
    }
  );

  // 4. Kochi Story Reveal
  const kochiTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".kochi-story-section",
      start: "top 75%",
    }
  });

  kochiTl.fromTo(".kochi-text > *", 
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    }
  )
  .fromTo(".kochi-image", 
    { x: 30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out"
    }, "-=0.8"
  );

  // 5. The Distinct Edge List Stagger
  const edgeTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".distinct-edge-section",
      start: "top 75%",
    }
  });

  edgeTl.fromTo(".edge-image", 
    { scale: 0.95, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.2,
      ease: "power3.out"
    }
  )
  .fromTo(".edge-content > *", 
    { x: 30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=1"
  )
  .fromTo(".edge-list li", 
    { x: 20, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out"
    }, "-=0.5"
  );

  // 6. Global Footprint Chips Stagger
  gsap.fromTo(".location-chip", 
    { y: 30, opacity: 0, scale: 0.9 },
    {
      scrollTrigger: {
        trigger: ".global-footprint-section",
        start: "top 80%",
      },
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "back.out(1.7)"
    }
  );

  // Force ScrollTrigger to recalculate all positions now that preloader is gone
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 800);
});
