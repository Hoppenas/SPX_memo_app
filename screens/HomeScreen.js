import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';

const HomeScreen = props => {
  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
      .then(() => {
        props.navigation.navigate({routeName: 'Landing'});
      });
  };
  return (
    <View style={styles.screen}>
      <Text>Home Screen</Text>
      <Button title="log out" onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
