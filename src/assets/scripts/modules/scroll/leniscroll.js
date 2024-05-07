// eslint-disable-next-line import/no-extraneous-dependencies
import Lenis from '@studio-freight/lenis';
import { SCROLL_TO } from '../globals/constants';

export const lenis = new Lenis({
    lerp: document.documentElement.classList.contains('mobile') ? 0.5 : 0.05
})



window.addEventListener(SCROLL_TO,function(evt){
    lenis.scrollTo(evt.detail, {
        duration: 1.25
    });
});

function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
}
  
if (!document.documentElement.classList.contains('mobile')) {
}
requestAnimationFrame(raf)
// if (document.documentElement.classList.contains('mobile')) {
//     lenis.destroy();
// }