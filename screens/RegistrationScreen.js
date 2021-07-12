import React from 'react';
import { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

const RegistrationScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <View style={styles.screen}>
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        style={styles.textInput}
      />
      <TextInput
        placeholder="password"
        onChangeText={setPassword}
        value={password}
        style={styles.textInput}
        secureTextEntry={true}
      />
      <Button title="Create user" onPress={createUser} />
      <Text
        style={styles.text}
        onPress={() => {
          props.navigation.navigate({routeName: 'Login'});
        }}>
        Log in
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
