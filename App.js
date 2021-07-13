import React from 'react';
import { StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useState, useEffect } from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import AppNavigator from './navigation/AppNavigator';
import LanguageKey from './components/LanguageKey';
import './utils/locale';
import authReducer from './store/reducers/authReducer';

const rootReducer = combineReducers({
  userEmail: authReducer
})

const store = createStore(rootReducer);

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

  return (
  <Provider store={store}>
      <AppNavigator />
      <LanguageKey />
  </Provider>
    );
};

const styles = StyleSheet.create({});

export default App;
