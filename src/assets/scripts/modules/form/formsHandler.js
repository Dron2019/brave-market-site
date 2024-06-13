import i18next from 'i18next';
import gsap from 'gsap';
import * as yup from 'yup';
import FormMonster from '../../../../pug/components/form/form';
import SexyInput from '../../../../pug/components/input/input';

export function formsHandler() {
  const formWrapper = document.querySelector('[data-form-wrapper]');
  const modal = document.querySelector('[data-form="data-popup-form"]');
  const formWrapperSuccess = document.querySelector('.form-wrapper-succes-layer');
  let timerId;
  let timerIdAnimateForm;

  document.body.addEventListener('click', evt => {
    const isFormWrapper = evt.target === formWrapper;
    const isSuccessBtn = evt.target === formWrapperSuccess.querySelector('button');
    const isOpenButton = evt.target.closest('[data-form="data-form"]');
    const isCloseBtn = evt.target.closest('[data-close-form="data-close-form"]');

    clearInterval(timerId);
    clearInterval(timerIdAnimateForm);

    if (!isOpenButton && !isCloseBtn && !isSuccessBtn && !isFormWrapper) return;

    isOpenButton ? animateForm() : animateForm(false);
  });

  function animateForm(isShow = true) {
    if (isShow) {
      modal.scrollTo(0, 0);
      gsap.fromTo(formWrapper, { opacity: 0 }, { opacity: 1 });
      gsap.fromTo(modal, { y: 300 }, { y: 0 });

      toggleModal(isShow);
    } else {
      gsap.fromTo(formWrapper, { opacity: 1 }, { opacity: 0 });
      gsap.fromTo(modal, { y: 0 }, { y: 300 });

      timerIdAnimateForm = setTimeout(() => {
        toggleModal(isShow);
      }, 300);
    }
  }

  function toggleModal(isShow) {
    formWrapper.classList.toggle('active', isShow);
    modal.classList.toggle('active', isShow);
    formWrapperSuccess.classList.toggle('active', isShow);
    document.body.classList.toggle('active', isShow);

    if (!formWrapper.classList.contains('active')) {
      window.dispatchEvent(new CustomEvent('form-close'));
    }
  }

  const formsWithTel = ['[data-form="data-popup-form"]'];
  formsWithTel.forEach(form => {
    const $form = document.querySelector(form);
    if ($form) {
      /* eslint-disable */
      new FormMonster({
        /* eslint-enable */
        elements: {
          $form,
          showSuccessMessage: false,
          successAction: () => {
            formWrapperSuccess.classList.add('active');
            modal.classList.remove('active');
            gsap.fromTo(formWrapperSuccess, { opacity: 0 }, { opacity: 1 });
            timerId = setTimeout(() => animateForm(false), 3000);
          },
          $btnSubmit: $form.querySelector('[data-btn-submit]'),
          fields: {
            name: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-text"]'),
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .matches(/^[А-Яа-яІіЇїҐґA-Za-z]+$/, i18next.t('invalid_name'))
                .min(2, i18next.t('name_too_short', { cnt: 2 }))
                .max(15, i18next.t('name_too_long', { cnt: 15 }))
                .trim(),
              defaultMessage: i18next.t('name'),
              valid: false,
              error: [],
            },
            phone: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-phone"]'),
                typeInput: 'phone',
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .min(17, i18next.t('field_too_short', { cnt: 19 - 6 })),
              defaultMessage: i18next.t('phone'),
              valid: false,
              error: [],
            },
            email: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-email"]'),
                typeInput: 'email',
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,3}$/i, i18next.t('invalid_email')),
              defaultMessage: i18next.t('email'),
              valid: false,
              error: [],
            },
            activity: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-activity"]'),
                typeInput: 'text',
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .min(2, i18next.t('activity_too_short', { cnt: 2 })),
              defaultMessage: i18next.t('required'),
              valid: false,
              error: [],
            },
          },
        },
      });
    }
  });
  hiddenFieldsHandler();
}

function hiddenFieldsHandler() {
  const rowField = document.querySelectorAll('input[name="row_number"]');
  const placeField = document.querySelectorAll('input[name="place_number"]');

  window.addEventListener('interactive-map-infobox-open', (evt) => {
    rowField.forEach((el) => {
      el.value = evt.detail.row_number;
    });
    placeField.forEach((el) => {
      el.value = evt.detail.place_number;
    });
  });
  window.addEventListener('form-close', (evt) => {
    rowField.forEach((el) => {
      el.value = '';
    });
    placeField.forEach((el) => {
      el.value ='';
    });
  });
}
