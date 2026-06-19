(function () {
  document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const animationsEnabled = body.dataset.enableAnimations === 'true' && !reducedMotion;
    const enabled = animationsEnabled && body.dataset.enableScrollStorytelling === 'true';

    if (!enabled) return;
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    document.querySelectorAll('[data-sticky-storytelling]').forEach((section) => {
      const steps = Array.from(section.querySelectorAll('[data-story-step]'));
      const panels = Array.from(section.querySelectorAll('[data-story-panel]'));
      if (!steps.length || !panels.length) return;

      gsap.set(panels, { opacity: 0 });
      gsap.set(panels[0], { opacity: 1 });

      function showPanel(index) {
        panels.forEach((panel, i) => {
          gsap.to(panel, {
            opacity: i === index ? 1 : 0,
            duration: 0.7,
            ease: 'power2.inOut',
            overwrite: true,
          });
        });
      }

      steps.forEach((step, i) => {
        ScrollTrigger.create({
          trigger: step,
          start: 'top 55%',
          end: 'bottom 45%',
          invalidateOnRefresh: true,
          onEnter: () => showPanel(i),
          onEnterBack: () => showPanel(i),
        });
      });

      section.querySelectorAll('img').forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
        }
      });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());
  });
})();
