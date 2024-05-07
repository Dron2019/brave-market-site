
export function frontScreenAnim(scroller, deviceType = 'desktop') {

    const imageAnimationValues = (type) => {
        switch (type) {
            case 'tablet':
                return {
                    from: {
                        webkitClipPath: 'polygon(5% 15%, 95% 15%, 95% 50%, 5% 50%)'
                    }, 
                    to: {
                        webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)'
                    }
                }
        
            default:
                return {
                    from: {}, 
                    to: {}
                }
        }
    }

    gsap.timeline({
        scrollTrigger: {
            trigger: '[data-home-screen-1-anim]',
            scrub: true,
            start: '0% top',
            pin: "[data-home-screen-1-anim] .front-screen__content",
        }
    });
    
    
    const screen1ImageTl = gsap.timeline({
        paused: true
    }).fromTo('.home-screen1-1 img', {
        webkitClipPath: 'polygon(25% 25%, 75% 25%, 75% 75%, 25% 75%)',
        ...imageAnimationValues(deviceType).from
    }, {
        webkitClipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        duration: 1.25,
        ease: 'power4.in',
        ...imageAnimationValues(deviceType).to
        // scale: 0.5,
        // delay: 0.75,
    });
    gsap.timeline({
        scrollTrigger: {
            trigger: '.home-screen1-1',
            scrub: true,
            start: '-10% bottom',
            end: '0% top',
            onEnterBack: () => {
                console.log(scroller);
                scroller.stop();
                screen1ImageTl.reverse();
                setTimeout(() => {
                    scroller.start();
                }, 1000);
            },
            onLeave: () => {
                console.log(scroller);
                scroller.stop();
                screen1ImageTl.play();
                setTimeout(() => {
                    scroller.start();
                }, 1000);
            }
        }
    })
        .to('.front-screen__content>*', {
            scale: 0.9
        })
}