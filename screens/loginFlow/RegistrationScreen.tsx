import React from 'react';
import { useCallback } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import { registrationValidationSchema } from '../../utils/validations';

const RegistrationScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}

            <TextInput
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={t('registration:placeholderPassword')}
              onBlur={() => setFieldTouched('password')}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}

            <TextInput
              onChangeText={handleChange('passwordRepeat')}
              value={values.passwordRepeat}
              placeholder={t('registration:placeholderRepeatPassword')}
              onBlur={() => setFieldTouched('passwordRepeat')}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text>{errors.passwordRepeat}</Text>
            )}

            <DefaultButton
              title={t('registration:buttonCreateUser')}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  text: {
    color: 'blue',
    marginTop: 20,
  },
});

export default RegistrationScreen;
