import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

export const createActorValidationSchema = yup.object({
  name: yup.string().required(() => t('errors:nameRequired')),
  email: yup
    .string()
    .required(() => t('errors:emailRequired'))
    .email(() => t('errors:emailValid')),
  phone: yup
    .string()
    .required(() => t('errors:phoneRequired'))
    .min(9, () => t('errors:phoneValid')),
});

export const loginValidationSchema = yup.object({
  email: yup
    .string()
    .required(() => t('errors:emailRequired'))
    .email(() => t('errors:emailValid')),
  password: yup
    .string()
    .required(() => t('errors:passwordRequired'))
    .min(6, () => t('errors:passwordValid'))
    .max(10, () => t('errors:passwordTooLong')),
});

export const registrationValidationSchema = yup.object({
  email: yup
    .string()
    .required(() => t('errors:emailRequired'))
    .email(() => t('errors:emailValid')),
  password: yup
    .string()
    .required(() => t('errors:passwordRequired'))
    .min(6, () => t('errors:passwordValid'))
    .max(10, () => t('errors:passwordTooLong')),
  passwordRepeat: yup
    .string()
    .required(() => t('errors:passwordRequired'))
    .oneOf([yup.ref('password'), null], t('errors:mustMatch')),
});
