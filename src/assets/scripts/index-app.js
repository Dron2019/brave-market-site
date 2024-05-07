import $ from "jquery";
import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swiper, { EffectFade, FreeMode, Navigation, Pagination, Thumbs } from 'swiper';
import Headroom from "headroom.js";
import { lenis } from './modules/scroll/leniscroll';
import buttonHover from './modules/buttonHover';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap, ScrollTrigger } from 'gsap/all';
import deviceInfo from "current-device";
import menu from './modules/menu';
import './modules/form';
import { useState } from './modules/helpers/helpers';
import { sideSwitchArrow } from './modules/effects/sideSwitchArrow';
import fadeInUp from "./modules/effects/fadeInUp";
import { galleryAnimation } from "./modules/animations/galleryAnimation";
import { paralaxesScreens } from "./modules/animations/paralaxesScreens";
import { frontScreenAnim } from "./modules/animations/frontScreenAnim";
import frontScreenMobileAnimation from "./modules/animations/frontScreenMobileAnimation";
import { modalHandler } from "./modules/layouts/modal";
import { formsHandler } from "./modules/form/formsHandler";


const scroller = lenis;


/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.ScrollTrigger = ScrollTrigger;
gsap.core.globals("ScrollTrigger", ScrollTrigger);
global.axios = axios;

gsap.registerPlugin(ScrollTrigger);


var myElement = document.querySelector("header");
// construct an instance of Headroom, passing the element
var headroom  = new Headroom(myElement);
headroom.init();



if (deviceInfo.type !== 'mobile') {
  frontScreenAnim(scroller, deviceInfo.type);
}

if (device.type === 'mobile') {
  frontScreenMobileAnimation(gsap);
}


paralaxesScreens(deviceInfo.type);


// splitToLinesAndFadeUp('.home-about-text__subtitle, .home-about-text__title, .home-about-text__text p')


fadeInUp('.contacts__item, .contacts__text, .contacts__link');



galleryAnimation();


function paralaxWithWhiteTextLayoutAnim() {
  const el = document.querySelector('[data-about-scene]');
  gsap.timeline({
    defaults: {
      ease: 'none'
    },
    scrollTrigger: {
      trigger: '[data-about-scene]',
      scrub: true,
    }
  })
  // .fromTo('.home-about__img', {
  //   scale: 1.25,
  //   y: window.innerHeight * -0.5
  // }, {
  //   scale: 1,
  //   y: 0
  // })
  .fromTo(el.querySelector('.home-about__img-transform'), {
      y: -400,
  }, {
      y: 400,
  })
  .fromTo(el.querySelector('.home-about__img-scale'), {
      scale: 1.4
  }, {
      scale: 1
  }, '<');


  gsap.timeline({
    defaults: {
      duration: 0.75,
      ease: 'expo.out'
    },
    scrollTrigger: {
      trigger: '.home-about-text',
      once: true,
      start: '50% 80%'
    }
  })

    .from('.home-about-text__title', {
      y: 20,
      opacity: 0
    })
    .from('.home-about-text__text p', {
      y: 20,
      opacity: 0,
      stagger: 0.25
    })
    .fromTo('.home-about-text .button-30', {
      y: 20,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
    }, '>-0.5')
    .from('.home-about-text .delimiter', {
      scale: 0
    }, '>-0.5')
}

paralaxWithWhiteTextLayoutAnim();


document.body.addEventListener('click',function(evt){
  const target = evt.target.closest('[data-arrow-down]');
  if (!target) return;
  window.scrollTo({
    top: window.innerHeight,
    behavior: 'smooth',
  })
});

menu();




splitToLinesAndFadeUp('section:not(.section-1) .text-style-h-1, section  .text-style-h-3');




function addIntersectionOnceWithCallback (el, cb = () => {}) {
  const image = el;
  const target = image;
  const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
              const lazyImage = entry.target;
              cb();
              observer.unobserve(target);
          }
        });
      }, {
          rootMargin: '0px',
          threshold: 0.1,
        });
      observer.observe(target);
}

document.querySelectorAll('[data-srcset]').forEach(el => {
  addIntersectionOnceWithCallback(el, () => {
    el.setAttribute('srcset', el.dataset.srcset);
  })
})
document.querySelectorAll('img[data-src]').forEach(el => {
  addIntersectionOnceWithCallback(el, () => {
    el.setAttribute('src', el.dataset.src);
  })
})
document.querySelectorAll('[data-lazy]').forEach(el => {


  addIntersectionOnceWithCallback(el, () => {
    const lazyElemt = el.querySelector('[data-href]');
    lazyElemt.setAttribute('href', lazyElemt.dataset.href);
  })
})



gsap.timeline({
  defaults: {
    ease: 'power4.out'
  },
  scrollTrigger: {
    once: true,
    trigger: '.progress-line'
  }
})
  .from('.progress-line', {
    autoAlpha: 0
  })
    .fromTo('.section-progress-item', {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      stagger: 0.2
    })
    .fromTo('.section-progress-item__title', {
      autoAlpha: 0,
      y: 50
    }, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.2
    })
    .fromTo('.section-progress-item__value', {
      autoAlpha: 0,
      y: -50
    }, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.2
    }, '<')
    .fromTo('.ocean-wrapper', {
      autoAlpha: 0,
      y: -50
    }, {
      autoAlpha: 1,
      y: 0,
      stagger: 0.2
    }, '<')

gsap.timeline({
  scrollTrigger: {
    trigger: '[data-map-animation]',
    scrub: true,
    start: '0% bottom',
    end: '100% bottom',
  }
})
  .fromTo('[data-map-animation]', {
    webkitClipPath: 'polygon(20% 0%, 80% 0%, 80% 100%, 20% 100%)'
  }, {
    webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
  });



function homeTextScreensAnimation() {
  // home-screen-3

  document.querySelectorAll('.home-screen-3').forEach(screen => {
    gsap.timeline({
      scrollTrigger: {
        trigger: screen,
        once: true,
        start: '50% 80%'
      }
    })
    .fromTo(Array.from(screen.children).filter(el => !el.classList.contains('delimiter')), {
      y: '10%',
      opacity: 0
    }, {
      opacity: 1,
      y: 0,
      duration: 1.25,
      ease: 'power4.out',
      stagger: 0.15
    })
    .fromTo(screen.querySelector('.delimiter'), {
      scale: 0
    }, {
      scale: 1
    })
  })
}

homeTextScreensAnimation();




function videoScreenParalax() {
  // .home-video-screen
  document.querySelector('.home-video-screen__link').style.opacity = 0;
  gsap.timeline({
    defaults: {
      ease: 'none',
    }, 
    scrollTrigger: {
      trigger: '.home-video-screen',
      scrub: true,
      onLeave: () => {
        document.querySelector('.home-video-screen video').pause()
      },
      onLeaveBack: () => {
        document.querySelector('.home-video-screen video').pause()
      },
      onEnter: () => {
        document.querySelector('.home-video-screen video').play()
      },
      onEnterBack: () => {
        document.querySelector('.home-video-screen video').play()
      }
    }
  })
  .fromTo('.home-video-screen-transform', {
      y: deviceInfo.type === 'desktop' ? -400 : -100,
  }, {
    y: deviceInfo.type === 'desktop' ? 400 : 100,
  })
  .fromTo('.home-video-screen-scale', {
      scale: 1.4
  }, {
      scale: 1
  }, '<');

}

document.body.addEventListener('click', (evt) => {
  const target = evt.target.closest('[data-home-video-link]');
  if (!target) return;
  target.closest('.container').querySelector('video').play();
  target.style.opacity = 0;
});

// if (document.documentElement.classList.contains('desktop')) {
//   gsap.timeline({
//     trigger: '.home-screen-location',
//     once: true,
//     onEnter: () => {
//       const video = document.querySelector('[data-poster]');
//       video.setAttribute('poster', video.dataset.poster);
//     }
//   })
// } else {

//   gsap.timeline({
//     trigger: '.home-screen-location',
//     once: true,
//     onEnter: () => {
//       const video = document.querySelector('[data-poster]');
//       video.play();
//     }
//   })
// }

videoScreenParalax();

modalHandler();

formsHandler();