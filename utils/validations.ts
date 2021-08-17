import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

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
