import gsap from 'gsap/all';

export default function menu() {
  let isOpened = false;

  const closeMenuTl = gsap
    .timeline({
      paused: true,
    })
    .fromTo(
      '.menu',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      },
    )
    .to(
      '.menu',
      {
        autoAlpha: 0,
        pointerEvents: 'none',
      },
      '<',
    )
    .to('[data-change-icon-on-menu]', {
      opacity: 0,
      duration: 0.25,
    })
    .add(() => {
      isOpened = false;
      document.body.classList.remove('menu-opened');
      document.querySelectorAll('[data-change-icon-on-menu]').forEach(el => {
        el.setAttribute('d', el.dataset.defaultPath);
      });
      console.log('closeMenuTl finish');
    })
    .to('[data-change-icon-on-menu]', {
      opacity: 1,
      duration: 0.15,
    });
  const openMenuTl = gsap
    .timeline({
      paused: true,
    })
    .to('.menu', {
      autoAlpha: 1,
      pointerEvents: 'all',
    })
    .fromTo(
      '.menu',
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      },
      {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      '<',
    )
    .to('[data-change-icon-on-menu]', {
      opacity: 0,
      duration: 0.25,
    })
    .add(() => {
      isOpened = true;
      document.body.classList.add('menu-opened');
      document.querySelectorAll('[data-change-icon-on-menu]').forEach(el => {
        el.setAttribute(
          'd',
          'M21.6667 20.2524L22.3738 20.9595L27.1042 25.6899L31.8345 20.9595L32.5417 20.2524L33.9559 21.6667L33.2488 22.3738L28.5184 27.1042L33.2488 31.8345L33.9559 32.5417L32.5417 33.9559L31.8345 33.2488L27.1042 28.5184L22.3738 33.2488L21.6667 33.9559L20.2524 32.5417L20.9595 31.8345L25.6899 27.1042L20.9595 22.3738L20.2524 21.6667L21.6667 20.2524Z',
        );
      });
    })
    .to('[data-change-icon-on-menu]', {
      opacity: 1,
      duration: 0.15,
    });
  document.body.addEventListener('click', function(evt) {
    const target = evt.target.closest('[data-menu-call]');

    if (!target) return;
    evt.stopPropagation();
    console.log('menu call');
    isOpened
      ? closeMenuTl
          .timeScale(1.5)
          .progress(0)
          .play()
      : openMenuTl.progress(0).play();
  });
  document.body.addEventListener('click', function(evt) {
    const target = evt.target.closest('[data-menu-close]');

    if (!target) return;
    closeMenuTl
      .timeScale(1.5)
      .progress(0)
      .play();
  });

  window.addEventListener('resize', changeText);

  window.addEventListener('DOMContentLoaded', changeText);

  function changeText() {
    const headerButton = document.querySelector('.header-not-desktop [data-form] span');
    const screenWidth = window.screen.width;

    const text = {
      lg: 'Подати заявку на оренду',
      sm: 'Подати заявку',
    };

    if (screenWidth <= 540 || (screenWidth <= 840 && screenWidth > 768)) {
      headerButton.textContent = text.sm;
    } else if (screenWidth < 840 && screenWidth > 540) {
      headerButton.textContent = text.lg;
    } else {
      headerButton.textContent = text.lg;
    }
  }
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
  });

  popup.addEventListener('click', ({ target }) => {
    target === popup ? close(popup) : null;
  });
  call.forEach(el => el.addEventListener('click', () => open(popup)));
  // call.forEach(el => el.addEventListener('touchstart', () => open(popup)));
}

// mobPopupHandler();

// menu();
