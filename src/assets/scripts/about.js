import Swiper from 'swiper/bundle';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import sideSwitchArrow from './modules/side-switch-arrow';
import splitToLinesAndFadeUp from './modules/effects/splitLinesAndFadeUp';
// import 'swiper/swiper.scss';

const questionList = document.querySelector('.about-screen5__list.about-list');

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

const initSLider = (
  sliderSelector,
  nextBtnSelector,
  prevBtnSelector,
  adaptObj,
  paginationSelector = '',
  simulateTouch = false,
) => {
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
};

questionList.addEventListener('click', evt => {
  const button = evt.target.closest('[data-about-item-label]');

  if (!button) return;
  if (button.closest('.answer-active')) {
    button.classList.remove('answer-active');
    button.nextElementSibling.style.display = 'none';
  } else {
    button.classList.add('answer-active');
    button.nextElementSibling.style.display = 'block';
  }
});

document.addEventListener('DOMContentLoaded', () => {
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

function pad(num) {
  return num < 10 ? '0' + num : num;
}

splitToLinesAndFadeUp('.text-style-1920-h-1');
