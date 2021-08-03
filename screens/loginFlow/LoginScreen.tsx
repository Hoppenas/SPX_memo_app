import React from 'react';
import { useState } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../state/actions';
import { useNavigation } from '@react-navigation/native';

import DefaultInput from '../../components/DefaultInput';
import DefaultButton from '../../components/DefaultButton';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isLoading } = useSelector(state => state.ui);
  const { user } = useSelector(state => state.user);

  const signIn = () => {
    dispatch(actions.ui.setLoading(true));
    dispatch(actions.user.setEmail(email));
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => dispatch(actions.ui.setLoading(false)))
      .then(() => dispatch(actions.user.setEmail(email)))
      .then(() => {
        navigation.navigate('home');
      })
      .then(console.log(user))
      .then(setEmail(''))
      .then(setPassword(''))
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log(t('login:erorEmailAlreadyInUse'));
        }

        if (error.code === 'auth/invalid-email') {
          console.log(t('login:erorEmailInvalid'));
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <DefaultInput
            placeholder={t('login:placeholderEmail')}
            onChangeText={setEmail}
            value={email}
          />
          <DefaultInput
            placeholder={t('login:placeholderPassword')}
            onChangeText={setPassword}
            value={password}
            secureTextEntry={true}
          />
          <DefaultButton title={t('login:title')} onPress={signIn} />
          <Text
            style={styles.text}
            onPress={() => {
              navigation.navigate('forgot-password');
            }}>
            {t('login:forgotPassword')}
          </Text>
        </>
      )}
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
