import Swiper from 'swiper';
import { Navigation } from 'swiper';
import splitToLinesAndFadeUp, { splitElementByWords } from './modules/effects/splitLinesAndFadeUp';
import './modules/scroll/leniscroll';

import upArrow from './modules/upArrow';
import { paralaxesScreens } from './modules/effects/paralaxesScreens';


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

splitToLinesAndFadeUp('.home-screen5__title, .text-style-1920-h-1:not(.front-screen__title):not(.front-screen__subtitle)', gsap);

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
}
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
  y: '75%'
})

document.querySelectorAll('[data-curtain-open]').forEach((el) => {
  const curtain = el.querySelector('div');
  const img = el.querySelector('img');
  const curtainDuration = 0.65;

  gsap.set(img, {
    autoAlpha: 0,
  })
  gsap.set(curtain, {
    scaleY: 0,
  })
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      once: true,
      // scrub: true,
      start: '50% bottom',
    },
  })
  .fromTo(el, {
    opacity: 0,
  }, {
    opacity: 1,
    duration: 0.25,
  })
  .fromTo(curtain, {
    scaleY: 0,
  }, {
    scaleY: 1,
    ease: 'power4.out',
    duration: curtainDuration,
    transformOrigin: 'bottom',
  }, '<')
  .to(img, {
    autoAlpha: 1,
    duration: 0.05,
  })
  .fromTo(curtain, {
    scaleY: 1,
  }, {
    scaleY: 0,
    ease: 'power4.out',
    duration: curtainDuration,
    transformOrigin: 'top',
  }, '<')

});


//data-curtain-open

const home4Slider = new Swiper('[data-screen4-slider]', {
  modules: [Navigation],
  slidesPerView: document.documentElement.classList.contains('dekstop') ? 2.1 : 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '[data-screen4-slider-next]',
    prevEl: '[data-screen4-slider-prev]',
  },
});

paralaxesScreens({
  gsap,
  selector: '.paralax-screen',
  amplutide: 800,
});


paralaxesScreens({
  gsap,
  selector: '.home-screen2__grid-img1, .home-screen2__grid-img2',
  amplutide: 150,
  scale: 1.1
});


// window.addEventListener('DOMContentLoaded',homeAnimation);

function screenVideoHandler() {
  gsap.timeline({
    scrollTrigger: {
      trigger: '.front-screen',
      start: 'top center',
      end: 'bottom center',
      onLeave: () => {
        document.querySelector('.front-screen video').pause();
      },
      onEnterBack: () => {
        document.querySelector('.front-screen video').play();
      },
    },
  });
}


screenVideoHandler();



document.querySelectorAll('.home-screen6__table-item--with-text, .text-style-h-3, .home-screen7__title').forEach((el) => {
  gsap.timeline({
    scrollTrigger: {
      // trigger: el.parentElement,
      trigger: el,
      start: '100px bottom',
      end: '200px bottom',
      // markers: true,
      // once: true,
      scrub: true,
    },
  })
  .fromTo(el, 
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)' }, 
    { clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }
  );
});


console.log('home.js');
