import i18next from 'i18next';
import gsap from 'gsap';
import * as yup from 'yup';
import FormMonster from "../../../../pug/components/form/form";
import SexyInput from "../../../../pug/components/input/input";


export function formsHandler() {


    const formsWithTel = ['[data-form="data-form"]', '[data-form="data-popup-form"]'];
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
                console.log('successAction', document.querySelector(`${form} .form-wrapper-succes-layer`));
                document.querySelector(`${form}`).parentElement.querySelector('.form-wrapper-succes-layer').classList.add('active');
            },
            $btnSubmit: $form.querySelector('[data-btn-submit]'),
            fields: {
            name: {
                inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
                rule: yup.string().required(i18next.t('required')).trim(),
                defaultMessage: i18next.t('name'),
                valid: false,
                error: [],
            },
            phone: {
                inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-phone]'),
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



    document.body.addEventListener('click',function(evt){
        const target = evt.target.closest('[data-popup-form-call]');
        if (!target) return;
        document.querySelector('[data-form="data-popup-form"]').closest('.form-wrapper').classList.add('active');
    });

    document.body.addEventListener('click', (evt) => {
        const target = evt.target.closest('.form-close');
        if (!target) return;
        target.closest('.form-wrapper').classList.remove('active');
    })
    document.body.addEventListener('click', (evt) => {
        const target = evt.target.closest('[data-form-wrapper-succes-layer-close]');
        if (!target) return;
        target.closest('.form-wrapper-succes-layer').classList.remove('active');
    })
}