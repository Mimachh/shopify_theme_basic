document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animationsEnabled = body.dataset.enableAnimations === 'true' && !reducedMotion;

  const config = {
    reducedMotion,
    animationsEnabled,
    reveal: animationsEnabled && body.dataset.enableReveal === 'true',
    parallax: animationsEnabled && body.dataset.enableParallax === 'true',
    counters: animationsEnabled && body.dataset.enableCounters === 'true',
    scrollStorytelling: animationsEnabled && body.dataset.enableScrollStorytelling === 'true',
  };

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (window.Theme && window.Theme.animations) {
    window.Theme.animations.init(config);
  }
});
