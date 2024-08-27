import innerPagesOnLoadAnimation from './modules/animations/innerPagesOnLoadAnimation.js';

const tl = innerPagesOnLoadAnimation(gsap);
window.addEventListener('DOMContentLoaded', () => {
    tl.play();
});