
const transformationValues = (type) => {
    switch (type) {
        case 'tablet':
            return {
                from: {
                    y: -100,
                }, 
                to: {
                    y: 100,
                }
            }
        case 'mobile':
            return {
                from: {
                    y: -50,
                }, 
                to: {
                    y: 50,
                }
            }
    
        default:
            return {
                from: {}, 
                to: {}
            }
    }
}


export function paralaxesScreens({
    deviceType = 'desktop', gsap, selector = '.paralax-screen', scale = 1.4, amplutide = 800
}) {

    document.querySelectorAll(selector).forEach(el => {

        gsap.timeline({
            defaults: {
                force3D: true,
                ease: 'none'
            },
            scrollTrigger: {
                trigger: el,
                scrub: true,
            }
            
        })
            .fromTo(el.querySelector('.paralax-screen-wrapper-transform'), {
                y: amplutide / -2,
                ...transformationValues(deviceType).from
            }, {
                y: amplutide / 2,
                ...transformationValues(deviceType).to
            })
            .fromTo(el.querySelector('.paralax-screen-wrapper-scale'), {
                scale: scale
            }, {
                scale: 1
            }, '<');
    })
}