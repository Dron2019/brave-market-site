import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import './modules/scroll/leniscroll';
import menu from './menu3d';

import upArrow from './modules/upArrow';
import { formsHandler } from './modules/form/formsHandler';
import { formsScroll } from './modules/form/formsScroll';

gsap.registerPlugin(ScrollTrigger);

upArrow();

gsap
  .timeline({
    scrollTrigger: {
      trigger: '.home-screen4__content',
      start: 'top center',
      end: '20% center',
      // markers: true,
      scrub: 1,
    },
  })
  .from('.home-screen4__content img', {
    rotate: 0,
  });

splitToLinesAndFadeUp('.text-style-1920-h-1');

// menu();

// formsHandler();
// formsScroll();


const iframeStyle = `
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const style = document.createElement('style')

style.textContent = iframeStyle

frames[0].document.head.appendChild(style)