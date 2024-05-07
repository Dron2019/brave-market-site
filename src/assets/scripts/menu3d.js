import gsap from 'gsap/all';


export default function menu() {
    let isOpened = false;

  const closeMenuTl = gsap.timeline({
      paused: true,
    })
      .fromTo('.menu', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
      })
      .to('.menu', {
        autoAlpha: 0,
        pointerEvents: 'none',
      }, '<')
      .add(() => {
        isOpened = false;
      });



      const openMenuTl = gsap.timeline({
        paused: true,
      })
      .to('.menu', {
        autoAlpha: 1,
        pointerEvents: 'all',
      })
      .fromTo('.menu', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'
      }, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      }, '<')
        .add(() => {
          isOpened = true;
        });
  document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-menu-call]');

    if (!target) return;
    isOpened ? closeMenuTl.timeScale(1.5).progress(0).play() :
    openMenuTl.progress(0).play();

  });
  document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-menu-close]');

    if (!target) return;
    closeMenuTl.timeScale(1.5).progress(0).play();

  });
}


/** Mobile callback popup */
function mobPopupHandler() {
  function close(el) {
    gsap.to(el, { autoAlpha: 0, zIndex: 10 });
  }
  function open(el) {
    gsap.to(el, { autoAlpha: 1, zIndex: 50 });
  }
  const popup = document.querySelector('[data-mobile-callback-popup]');
  const call = document.querySelectorAll('[data-call-mobile-callback-popup]');
  const closeEl = document.querySelectorAll('[data-mobile-callback-close]');
  closeEl.forEach(el => {
    el.addEventListener('click', () => close(popup));
  })

  popup.addEventListener('click', ({target}) => {
    target === popup ? close(popup) : null;
  })
  call.forEach(el => el.addEventListener('click', () => open(popup)));
  // call.forEach(el => el.addEventListener('touchstart', () => open(popup)));
}

// mobPopupHandler();

menu();