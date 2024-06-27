import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp, { splitElementByWords } from './modules/effects/splitLinesAndFadeUp';
import './modules/scroll/leniscroll';

import upArrow from './modules/upArrow';

gsap.registerPlugin(ScrollTrigger);

upArrow();

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.home-screen4__content',
      start: 'top center',
      end: '20% center',
      // markers: true,
      scrub: true,
    },
  })
  .from('.home-screen4__content-img1 img, .home-screen4__content-img3 img', {
    rotate: 0,
  })
  .from('.home-screen4__content-img2', {
    rotate: -4,
  }, '<');

splitToLinesAndFadeUp('.text-style-1920-h-1:not(.front-screen__title):not(.front-screen__subtitle)', gsap);

function homeAnimation() {
  splitElementByWords(document.querySelector('.front-screen__title'), gsap);
  splitElementByWords(document.querySelector('.front-screen__subtitle'), gsap);

  gsap.timeline()
    .fromTo('.front-screen picture img', { y: 150, opacity: 0.5 }, { y: 0, autoAlpha: 1, ease: 'power2.out', duration: 1.5 })
    .fromTo('.front-screen button', { opacity: 0.5 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 1.5 }, '<')
    .fromTo('.front-screen__subtitle', { opacity: 0.5 }, { y: 0, opacity: 1, ease: 'power2.out', duration: 1.5 }, '<')
    .fromTo('.front-screen__subtitle span span', 
      { yPercent: 100,  },
      { yPercent: 0,  stagger: 1 / 10, duration: 0.5, ease: 'power4.out' },
      '<'
    )
    .fromTo('.front-screen__title span span', 
      { yPercent: 100,  },
      { yPercent: 0,  stagger: 1 / 3, duration: 0.75, ease: 'power4.out' },
      '<'
    )
    .add(() => {
      document.querySelector('.front-screen__title').innerHTML = text.textContent;
      document.querySelector('.front-screen__subtitle').innerHTML = text.textContent;
    })



  gsap.timeline({
    scrollTrigger: {
      trigger: '.home-screen2',
      start: 'top bottom',
      end: 'bottom top',
      markers: /localhost/.test(window.location.href),
      scrub: true,
    },
  })
  .to('.front-screen', {
    y: '100%'
  })
  gsap.timeline({
    scrollTrigger: {
      trigger: '.home-screen4',
      start: 'top bottom',
      end: '50% top',
      markers: /localhost/.test(window.location.href),
      scrub: true,
    },
  })
  .to('.home-screen3', {
    y: '60%'
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: '.home-news-screen',
      start: 'top bottom',
      end: '50% top',
      markers: /localhost/.test(window.location.href),
      scrub: true,
    },
  })
  .to('.home-screen4', {
    y: '30%'
  });


  gsap.timeline({
    scrollTrigger: {
      trigger: '.home-news-screen__slider',
      once: true,
    }
  })
  .from('.home-news-screen__slider .news-card', {
    y: (index,a) => {
      if (window.screen.width < 1024) {
        return 50;
      }
      return index % 2 === 0 ? 50 : -50;
    },
    opacity: 0.5,
    duration: 0.5,
    ease: 'power2.out',
  });


  
}

window.addEventListener('DOMContentLoaded',homeAnimation);