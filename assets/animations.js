window.Theme = window.Theme || {};

/**
 * Reusable GSAP animation library, driven by data-attributes so any
 * section/snippet can opt in without writing JS:
 *
 *   data-animate="fade|reveal|zoom"   reveal-on-scroll, once
 *   data-animate-delay="0.2"          optional delay (seconds)
 *   data-animate-duration="1"         optional duration override (seconds)
 *   data-parallax="0.3"               vertical parallax speed
 *   data-counter data-counter-to="150" data-counter-prefix="+" data-counter-suffix="%"
 *   data-hover-lift                   subtle lift on hover
 *
 * All entry points are gated by the config flags computed in theme.js,
 * which already account for prefers-reduced-motion and the theme's
 * animation toggles.
 */
Theme.animations = (() => {
  const REVEAL_START = 'top 85%';

  function num(el, key, fallback) {
    const value = el.dataset[key];
    return value ? parseFloat(value) : fallback;
  }

  function revealTween(el, props, durationFallback) {
    return gsap.to(el, {
      ...props,
      duration: num(el, 'animateDuration', durationFallback),
      delay: num(el, 'animateDelay', 0),
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
    });
  }

  function initFade(config) {
    if (!config.reveal) return;
    document.querySelectorAll('[data-animate="fade"]').forEach((el) => {
      gsap.set(el, { opacity: 0 });
      revealTween(el, { opacity: 1 }, 0.8);
    });
  }

  function initReveal(config) {
    if (!config.reveal) return;
    document.querySelectorAll('[data-animate="reveal"]').forEach((el) => {
      gsap.set(el, { opacity: 0, y: 40 });
      revealTween(el, { opacity: 1, y: 0 }, 0.8);
    });
  }

  function initZoom(config) {
    if (!config.reveal) return;
    document.querySelectorAll('[data-animate="zoom"]').forEach((el) => {
      gsap.set(el, { opacity: 0, scale: 1.08 });
      revealTween(el, { opacity: 1, scale: 1 }, 1);
    });
  }

  function initParallax(config) {
    if (!config.parallax) return;
    document.querySelectorAll('[data-parallax]').forEach((el) => {
      const speed = num(el, 'parallax', 0.3);
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el.parentElement,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    });
  }

  function initCounters(config) {
    document.querySelectorAll('[data-counter]').forEach((el) => {
      const target = num(el, 'counterTo', parseFloat(el.textContent) || 0);
      const decimals = num(el, 'counterDecimals', 0);
      const prefix = el.dataset.counterPrefix || '';
      const suffix = el.dataset.counterSuffix || '';
      const render = (value) => {
        el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      };

      if (!config.counters) {
        render(target);
        return;
      }

      render(0);
      gsap.to({ value: 0 }, {
        value: target,
        duration: num(el, 'counterDuration', 2),
        ease: 'power1.out',
        scrollTrigger: { trigger: el, start: REVEAL_START, once: true },
        onUpdate() {
          render(this.targets()[0].value);
        },
      });
    });
  }

  function initCtaHover(config) {
    if (!config.animationsEnabled) return;
    document.querySelectorAll('[data-hover-lift]').forEach((el) => {
      el.addEventListener('mouseenter', () => gsap.to(el, { y: -2, duration: 0.25, ease: 'power2.out' }));
      el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.25, ease: 'power2.out' }));
    });
  }

  function init(config) {
    if (typeof gsap === 'undefined') return;
    initFade(config);
    initReveal(config);
    initZoom(config);
    initParallax(config);
    initCounters(config);
    initCtaHover(config);
  }

  return { init };
})();
