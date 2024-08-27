export default function innerPagesOnLoadAnimation(gsap) {
    gsap.set('.inner-page-front-screen .button-colored', {
        transition: 'none'
    })
    const tl = gsap.timeline({
        paused: true,
    })
        .fromTo('.inner-page-front-screen .button-colored, .inner-page-front-screen__title, .inner-page-front-screen__description, .inner-page-front-screen__subtitle', {
            x: -50,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power4.out',
            stagger: 0.25
        })
        .fromTo('.inner-page-front-screen__img img', {
            x: 50,
            autoAlpha: 0
        }, {
            x: 0,
            autoAlpha: 1,
            duration: 1.5,
            ease: 'power4.out',
        }, '<')
        .add(() => {
            gsap.set('.inner-page-front-screen .button-colored', {
                transition: '',})
        })
    ;
    return tl;
}