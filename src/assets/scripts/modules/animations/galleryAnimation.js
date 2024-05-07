export function galleryAnimation() {
    const  $sliderImages = Array.from(document.querySelectorAll('.home-gallery__slider-item'));
    const sliderWidth = $sliderImages.reduce((acc,el) => {
      const margin = getComputedStyle(el).marginLeft ? 
      parseInt(getComputedStyle(el).marginLeft) : 
      0;
      console.log(margin);
      acc+=el.querySelector('img').getBoundingClientRect().width + margin;
      return acc;
    }, 0);
  
    console.log(sliderWidth);

    gsap.set('[data-gallery-scene]', {
      height: sliderWidth
    });
  
    let scrollTween = gsap.timeline({
      defaults: {
        ease: 'none'
      },
      scrollTrigger: {
        trigger: '[data-gallery-scene]',
        pin: '[data-gallery-scene] .home-gallery__content',
        scrub: true,
        end: '100% bottom',
        onLeaveBack: () => {
          gsap.to('.home-gallery__title, .home-gallery__remark, .home-gallery__delemiter', {
            y: '0'
          })
        },
        onEnter: () => {
          // gsap.to('.home-gallery__title, .home-gallery__remark, .home-gallery__delemiter', {
          //   y: '50%'
          // })
        }
      }
    })
    .fromTo('[data-gallery-scene] .home-gallery__slider', {
      x: window.innerWidth  * 0.45
    },{
      x: (sliderWidth - window.innerWidth) * -1 - 100
    })
  
    console.log($sliderImages);

    $sliderImages.forEach(image => {
      gsap.timeline({
        defaults: {
          ease: 'none'
        },
        scrollTrigger: {
          trigger: image,
          containerAnimation: scrollTween,
          scrub: true,
          start: '0% right',
          end: '20% right'
        }
      })
      .fromTo(image, {
        scale: 0.95
      }, {
        scale: 1,
      })
    })
    if (document.documentElement.classList.contains('desktop')) {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.home-gallery',
          start: '98% bottom',
          end: '100% bottom',
          scrub: true
        }
      })
      .fromTo('.home-gallery__content>.button-30', {
        autoAlpha: 0
      }, {
        autoAlpha: 1
      })
    }
}