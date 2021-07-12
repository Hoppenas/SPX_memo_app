import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import auth from '@react-native-firebase/auth';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
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
  // if (!user) {
    return (
      <View style={styles.container}>
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
        <Button style={styles.button} title="Log in" onPress={() => signIn()} />
        <Text
          style={styles.text}
          onPress={() => {
            props.navigation.navigate({routeName: 'ForgotPassword'});
          }}>
          Forgot password
        </Text>
      </View>
    );
  // }

  // return (
  //   // <View style={styles.screen}>
  //   //     <Text>Login Screen</Text>
  //   //     <Button title='Log in' onPress={()=>{props.navigation.navigate({routeName: 'Home'})}}/>
  //   // </View>
  //   <View>
  //     <Text>Welcome {user.email}</Text>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
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
