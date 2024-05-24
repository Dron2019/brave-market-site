import Lenis from '@studio-freight/lenis';

export function formsScroll() {
  const form = document.querySelector('[data-form-wrapper] .form');

  const initLenis = () => {
    const lenis = new Lenis({
      wrapper: form,
      duration: 2,
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  };

  initLenis();
}
