
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


export function paralaxesScreens(deviceType = 'desktop') {

    document.querySelectorAll('.paralax-screen').forEach(el => {

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
                y: -400,
                ...transformationValues(deviceType).from
            }, {
                y: 400,
                ...transformationValues(deviceType).to
            })
            .fromTo(el.querySelector('.paralax-screen-wrapper-scale'), {
                scale: 1.4
            }, {
                scale: 1
            }, '<');
    })
}