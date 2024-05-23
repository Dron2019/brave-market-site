import i18next from 'i18next';
import gsap from 'gsap';
import * as yup from 'yup';
import FormMonster from '../../../../pug/components/form/form';
import SexyInput from '../../../../pug/components/input/input';

export function formsHandler() {
  const formWrapper = document.querySelector('[data-form-wrapper]');
  const modal = document.querySelector('[data-form="data-popup-form"]');
  const formWrapperSuccess = document.querySelector('.form-wrapper-succes-layer');

  document.body.addEventListener('click', evt => {
    const isFormWrapper = evt.target == formWrapper;
    const isOpenButton = evt.target.closest('[data-form="data-form"]');
    const isCloseBtn = evt.target.closest('[data-close-form="data-close-form"]');
    const isSuccessBtn = evt.target.closest(
      '[data-form-wrapper-succes-layer-close="data-form-wrapper-succes-layer-close"]',
    );

    if (!isOpenButton && !isCloseBtn && !isSuccessBtn && !isFormWrapper) return;

    isOpenButton ? showModal() : hiddenModal();
  });

  const hiddenModal = () => {
    formWrapper.classList.remove('active');
    modal.classList.remove('active');
    formWrapperSuccess.classList.remove('active');
    document.body.classList.remove('active');
  };

  const showModal = () => {
    formWrapper.classList.add('active');
    modal.classList.add('active');
    document.body.classList.add('active');
  };

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
            // console.log(
            //   'successAction !!!!',
            //   document.querySelector(`${form} .form-wrapper-succes-layer`),
            // );
            formWrapperSuccess.classList.add('active');
            modal.classList.remove('active');
            setTimeout(() => hiddenModal(), 3000);
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
            email: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-email"]'),
                typeInput: 'email',
              }),
              rule: yup.string().required(i18next.t('required')),
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
              rule: yup.string().required(i18next.t('required')),
              defaultMessage: i18next.t('activity'),
              valid: false,
              error: [],
            },
          },
        },
      });
    }
  });
}
