import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';

const RegistrationScreen = props => {
  const [ email, setEmail ] = useState('');
  const [password, setPassword] = useState('');
  
  const {t} = useTranslation();

  const createUser = () => {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .then(() => {
        props.navigation.navigate({routeName: 'Home'});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log({t('registration:erorEmailAlreadyInUse')});
        }

        if (error.code === 'auth/invalid-email') {
          console.log({t('registration:erorEmailInvalid')});
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder={t('registration:placeholderEmail')}
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
      />
      <TextInput
        placeholder={t('registration:placeholderPassword')}
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
      />
      <Button title={t('registration:placeholderPassword')} onPress={createUser} />
      <Text
        style={styles.text}
        onPress={() => {
          props.navigation.navigate({routeName: 'Login'});
        }}>
        {t('registration:buttonLogin')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
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
});

export default RegistrationScreen;
