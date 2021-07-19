import React from 'react';
import {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {actions} from '../../state/actions';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {t} = useTranslation();
  const dispatch = useDispatch();

  const signIn = () => {
    dispatch(actions.ui.setLoading(true));
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => dispatch(actions.ui.setLoading(false)))
      .then(() => {
        props.navigation.navigate({routeName: 'Home'});
      })
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
      <TextInput
        placeholder={t('login:placeholderEmail')}
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
      />
      <TextInput
        placeholder={t('login:placeholderPassword')}
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
      />
      <Button
        style={styles.button}
        title={t('login:title')}
        onPress={() => signIn()}
      />
      <Text
        style={styles.text}
        onPress={() => {
          props.navigation.navigate({routeName: 'ForgotPassword'});
        }}>
        {t('login:forgotPassword')}
      </Text>
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
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  text: {
    color: 'blue',
    marginTop: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default LoginScreen;
