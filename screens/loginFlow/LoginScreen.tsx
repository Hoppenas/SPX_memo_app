import React from 'react';
import { useCallback } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';

import { actions } from '../../state/actions';
import DefaultButton from '../../components/DefaultButton';
import { loginValidationSchema } from '../../utils/validations';
import WrapperWithBackground from '../../components/WrapperWithBackground';

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
      <WrapperWithBackground>
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
                style={styles.textInput}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}

              <TextInput
                onChangeText={handleChange('password')}
                value={values.password}
                placeholder={t('login:placeholderPassword')}
                onBlur={() => setFieldTouched('password')}
                secureTextEntry
                style={styles.textInput}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.buttonContainer}>
                <DefaultButton
                  title={t('login:title')}
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
    justifyContent: 'center',
    backgroundColor: '#fff',
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
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default LoginScreen;
