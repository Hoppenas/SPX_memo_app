import React from 'react';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';

import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return <AppNavigator />;
};

const styles = StyleSheet.create({});

export default App;
