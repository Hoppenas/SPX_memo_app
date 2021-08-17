import React from 'react';
import { useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';
import { loginValidationSchema } from '../../utils/validations';

const LoginScreen: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  interface ILoginValues {
    email: string;
    password: string;
  }

  const handleLogin = useCallback((values: ILoginValues) => {
    dispatch(actions.user.login(values));
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={values => handleLogin(values)}
        validationSchema={loginValidationSchema}>
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
              placeholder={t('login:placeholderEmail')}
              onBlur={() => setFieldTouched('email')}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            {touched.email && errors.email && <Text>{errors.email}</Text>}

            <TextInput
              onChangeText={handleChange('password')}
              value={values.password}
              placeholder={t('login:placeholderPassword')}
              onBlur={() => setFieldTouched('password')}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text>{errors.password}</Text>
            )}

            <DefaultButton title={t('login:title')} onPress={handleSubmit} />
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

export default LoginScreen;
