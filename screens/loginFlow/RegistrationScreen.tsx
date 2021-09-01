import React from 'react';
import { useCallback } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import DefaultButton from '../../components/DefaultButton';
import { registrationValidationSchema } from '../../utils/validations';
import WrapperWithBackground from '../../components/WrapperWithBackground';

const RegistrationScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  interface IRegistrationValues {
    email: string;
    password: string;
    passwordRepeat: string;
  }

  const handleRegistration = useCallback((values: IRegistrationValues) => {
    dispatch(actions.user.register(values));
  }, []);

  return (
    <View style={styles.container}>
      <WrapperWithBackground>
        <Formik
          initialValues={{ email: '', password: '', passwordRepeat: '' }}
          onSubmit={values => handleRegistration(values)}
          validationSchema={registrationValidationSchema}>
          {({
            values,
            handleChange,
            errors,
            setFieldTouched,
            touched,
            handleSubmit,
          }) => (
            <>
              <TextInput
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder={t('registration:placeholderEmail')}
                onBlur={() => setFieldTouched('email')}
                autoCapitalize="none"
                style={styles.textInput}
                keyboardType="email-address"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={t('registration:placeholderPassword')}
                onBlur={() => setFieldTouched('password')}
                style={styles.textInput}
                secureTextEntry
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TextInput
                onChangeText={handleChange('passwordRepeat')}
                value={values.passwordRepeat}
                placeholder={t('registration:placeholderRepeatPassword')}
                onBlur={() => setFieldTouched('passwordRepeat')}
                secureTextEntry
                style={styles.textInput}
              />
              {touched.passwordRepeat && errors.passwordRepeat && (
                <Text style={styles.errorText}>{errors.passwordRepeat}</Text>
              )}

              <View style={styles.buttonContainer}>
                <DefaultButton
                  title={t('registration:buttonCreateUser')}
                  onPress={handleSubmit}
                />
              </View>
            </>
          )}
        </Formik>
      </WrapperWithBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  errorText: {
    color: '#FFF',
    paddingLeft: 30,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default RegistrationScreen;
