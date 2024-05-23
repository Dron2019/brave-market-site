import i18next from 'i18next';
import gsap from 'gsap';
import * as yup from 'yup';
import FormMonster from '../../../../pug/components/form/form';
import SexyInput from '../../../../pug/components/input/input';

export function formsHandler() {
  const overlay = document.querySelector('[data-overlay]');
  const form = document.querySelector('[data-form="data-popup-form"]');

  document.body.addEventListener('click', evt => {
    const isOpenButton = evt.target.closest('[data-form="data-form"]');
    const isOverlay = evt.target.closest('[data-overlay]');
    const isCloseBtn = evt.target.closest('[data-close-form="data-close-form"]');

    if (!isOpenButton && !isOverlay && !isCloseBtn) return;

    isOpenButton ? toggleAnimation(true) : toggleAnimation();
  });

  function toggleAnimation(animation = false) {
    animation
      ? gsap.fromTo(form, { y: 400, opacity: 0 }, { y: 0, opacity: 1 })
      : gsap.to(form, { y: 400, opacity: 0, duration: 0.5 });

    form.classList.toggle('active');
    overlay.classList.toggle('active');
  }

  // data-popup-form-call
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
              console.log(
                'successAction !!!!',
                document.querySelector(`${form} .form-wrapper-succes-layer`),
              );
              // document
              //   .querySelector(`${form}`)
              //   .parentElement.querySelector('.form-wrapper-succes-layer')
              //   .classList.add('active');
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
                  .min(15, i18next.t('field_too_short', { cnt: 19 - 8 })),

                defaultMessage: i18next.t('phone'),
                valid: false,
                error: [],
              },
            },
          },
        });
      }
    });
}
