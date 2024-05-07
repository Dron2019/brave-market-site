const transformationValues = (type) => {
  switch (type) {
      case 'tablet':
          return {
              from: {
                  y: 0,
              }, 
              to: {
                  y: 0,
              }
          }
  
      default:
          return {
              from: {}, 
              to: {}
          }
  }
}


export function paralaxWithWhiteTextLayoutAnim(deviceType = 'desktop') {
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
        y: -300,
        ...transformationValues(deviceType).from
    }, {
        y: 300,
        ...transformationValues(deviceType).to
    })
    .fromTo(el.querySelector('.home-about__img-scale'), {
        scale: 1.4
    }, {
        scale: 1
    }, '<')
    .fromTo('.home-about-text', {
      scale: 0.85
    }, {
      scale: 1
    }, '<')
    // .fromTo('.home-about-text', {
    //   scale: 1
    // }, {
    //   scale: 0.85
    // })
  
  
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