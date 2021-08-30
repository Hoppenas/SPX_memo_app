import * as yup from 'yup';
import i18n from 'i18next';

export const createActorValidationSchema = yup.object({
  name: yup.string().required(() => i18n.t('errors:nameRequired')),
  email: yup
    .string()
    .required(() => i18n.t('errors:emailRequired'))
    .email(() => i18n.t('errors:emailValid')),
  phone: yup
    .string()
    .required(() => i18n.t('errors:phoneRequired'))
    .min(6, () => i18n.t('errors:phoneValid')),
});

export const createSceneValidationSchema = yup.object({
  name: yup.string().required(() => i18n.t('errors:nameRequired')),
  location: yup.string().required(() => i18n.t('errors:locationRequired')),
  date: yup.string().required(() => i18n.t('errors:dateRequired')),
});

export const createMovieValidationSchema = yup.object({
  name: yup.string().required(() => i18n.t('errors:nameRequired')),
  director: yup.string().required(() => i18n.t('errors:directorRequired')),
  date: yup.string().required(() => i18n.t('errors:dateRequired')),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required(() => i18n.t('errors:emailRequired'))
    .email(() => i18n.t('errors:emailValid')),
  password: yup
    .string()
    .required(() => i18n.t('errors:passwordRequired'))
    .min(6, () => i18n.t('errors:passwordValid'))
    .max(10, () => i18n.t('errors:passwordTooLong')),
});

export const registrationValidationSchema = yup.object({
  email: yup
    .string()
    .required(() => i18n.t('errors:emailRequired'))
    .email(() => i18n.t('errors:emailValid')),
  password: yup
    .string()
    .required(() => i18n.t('errors:passwordRequired'))
    .min(6, () => i18n.t('errors:passwordValid'))
    .max(10, () => i18n.t('errors:passwordTooLong')),
  passwordRepeat: yup
    .string()
    .required(() => i18n.t('errors:passwordRequired'))
    .oneOf([yup.ref('password'), null], i18n.t('errors:mustMatch')),
});
