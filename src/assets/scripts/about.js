import innerPagesOnLoadAnimation from './modules/animations/innerPagesOnLoadAnimation.js';

const tl = innerPagesOnLoadAnimation(gsap);
window.addEventListener('DOMContentLoaded', () => {
    tl.play();
});

console.log(gsap);


gsap.timeline({
    scrollTrigger: {
        trigger: '.home-screen1__grid',
        start: 'top center',
        end: 'bottom center',
        scrub: true,
    },
})

function applyScrollTriggerAnimation(selectors) {
    document.querySelectorAll(selectors).forEach((el) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '50% bottom',
                // end: 'bottom center',
                once: true,
            },
        })
            .fromTo(el.children,
                { y: 25, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, clearProps: 'all', duration: 1.25, ease: 'power4.out', stagger: 0.1 },
            );
    });
}

const selectors = '.about-screen2__grid-item, .about-screen2__grid-center-item, .contact-screen__content,.footer__top-content';
applyScrollTriggerAnimation(selectors);