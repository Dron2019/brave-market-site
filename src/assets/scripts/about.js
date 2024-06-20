import Swiper from 'swiper/bundle';
import sideSwitchArrow from './modules/side-switch-arrow';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
import { gsap } from 'gsap/all';

document.addEventListener('DOMContentLoaded', () => {
  splitToLinesAndFadeUp('.text-style-1920-h-1');

  document.querySelectorAll('.about-item').forEach(item => {
    createTimeline(item);
    attachEvents(item);
  });

  const breakpointsForScreenSlide3 = {
    320: {
      slidesPerGroup: 1,
      slidesPerView: 'auto',
      spaceBetween: 8,
    },
    600: {
      slidesPerGroup: 1,
      slidesPerView: 1.3,
      spaceBetween: 16,
    },
    800: {
      slidesPerGroup: 1,
      slidesPerView: 2.3,
      spaceBetween: 20,
    },
    1100: {
      slidesPerGroup: 2,
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1200: {
      spaceBetween: 20,
      slidesPerView: 4,
    },
  };
  const breakpointsForScreenSlider4 = {
    350: {
      slidesPerView: 1,
      spaceBetween: 5,
    },
    480: {
      slidesPerGroup: 1,
      slidesPerView: 1,
      spaceBetween: 8,
    },
    600: {
      slidesPerView: 1.2,
      spaceBetween: 10,
    },
    800: {
      slidesPerView: 1.7,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2.3,
      spaceBetween: 20,
    },
  };

  let prevButton;
  let nextButton;

  if (window.innerWidth <= 1024) {
    prevButton = '[data-button-gallery-slider-min-prev]';
    nextButton = '[data-button-gallery-slider-min-next]';
  } else {
    prevButton = '[data-button-gallery-slider-prev]';
    nextButton = '[data-button-gallery-slider-next]';
  }

  initSLider(
    '.about-screen3__slider',
    '[data-about-button__next]',
    '[data-about-button__prev]',
    breakpointsForScreenSlide3,
  );
  const aboutSwiper = initSLider(
    '.about-slider',
    nextButton,
    prevButton,
    breakpointsForScreenSlider4,
    '.about-slider__slides-count',
    true,
  );

  if (document.documentElement.classList.contains('desktop')) {
    const $movingArrow = document.querySelector('[data-gallery-switcher]');
    const $movingArrowCurrentIndex = document.querySelector('[data-gallery-switcher-current]');
    const $movingArrowSlidesLength = document.querySelector('[data-gallery-switcher-all]');
    const $containerForMovingArrow = document.querySelector('.about-slider');

    $movingArrowSlidesLength.textContent = aboutSwiper.slides.length;
    $movingArrowCurrentIndex.textContent = pad(aboutSwiper.realIndex + 1);

    window.aboutSwiper = aboutSwiper;
    sideSwitchArrow(
      {
        onPrev: () => {
          aboutSwiper.slidePrev();
          $movingArrowCurrentIndex.textContent = pad(aboutSwiper.realIndex + 1);
        },
        onNext: () => {
          aboutSwiper.slideNext();
          $movingArrowCurrentIndex.textContent = pad(aboutSwiper.realIndex + 1);
        },
      },
      $movingArrow,
      $containerForMovingArrow,
    );
  }
});

function initSLider(
  sliderSelector,
  nextBtnSelector,
  prevBtnSelector,
  adaptObj,
  paginationSelector = '',
  simulateTouch = false,
) {
  const swiper = new Swiper(sliderSelector, {
    loop: true,
    autoplay: true,
    preloadImages: false,
    simulateTouch: !simulateTouch,
    lazy: true,
    speed: 800,
    watchSlidesVisibility: true,
    navigation: {
      nextEl: document.querySelector(nextBtnSelector),
      prevEl: document.querySelector(prevBtnSelector),
    },
    pagination: {
      el: paginationSelector,
      type: 'fraction',
      formatFractionCurrent: num => {
        return num > 9 ? num : '0' + num;
      },
      formatFractionTotal: num => {
        return num > 9 ? num : '0' + num;
      },
      renderFraction: function(currentClass, totalClass) {
        return (
          '<span class="' +
          currentClass +
          '">' +
          '</span>' +
          '/' +
          '<span class="' +
          totalClass +
          '">' +
          '</span>'
        );
      },
    },
    breakpoints: adaptObj,
  });

  return swiper;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}

function createTimeline(accordion) {
  const timeline = gsap.timeline({
    paused: true,
    onStart: timelineStart,
    onStartParams: [accordion],
    onReverseCompleteParams: [accordion],
  });

  timeline
    .fromTo(
      accordion.querySelector('[data-about-item-answer]'),
      {
        height: 0,
        marginTop: 0,
      },
      {
        marginTop: 20,
        height: 'auto',
        duration: 0.35,
        ease: 'power4.inOut',
      },
    )
    .fromTo(
      accordion.querySelector('[data-about-item-close-icon]'),
      { rotate: 0 },
      { rotate: -45, 
        duration: 0.35,
        ease: 'power4.inOut', },
      '<',
    );

  timeline.reverse();

  accordion.querySelector('[data-about-item-label]').accordionTimeline = timeline;
}

function timelineStart(accordion) {
  accordion.querySelector('[data-about-item-answer]').style.display = 'block';
}

function attachEvents(accordion) {
  const trigger = accordion.querySelector('[data-about-item-label]');

  trigger.addEventListener('click', () => {
    trigger.accordionTimeline.reversed()
      ? trigger.accordionTimeline.play()
      : trigger.accordionTimeline.reverse();
  });
}
