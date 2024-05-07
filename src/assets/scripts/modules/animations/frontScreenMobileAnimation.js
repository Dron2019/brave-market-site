export default function frontScreenMobileAnimation(gsap) {
    gsap.timeline({
        scrollTrigger: {
            trigger: '[data-home-screen-1-anim]',
            scrub: true,
            start: '0% top',
            pin: "[data-home-screen-1-anim] .front-screen__content",
            // markers: true,
        }
    })
    .fromTo('.home-screen1-1', {
        webkitClipPath: 'polygon(25% 22%, 75% 22%, 75% 100%, 25% 100%)'
    }, 
    {
        webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
    });
}