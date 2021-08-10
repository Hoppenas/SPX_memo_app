import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { useDispatch } from 'react-redux';
import { actions } from '../state/actions';
import database from '@react-native-firebase/database';

import ForgotPasswordScreen from '../screens/loginFlow/ForgotPasswordScreen';
import HomeScreen from '../screens/mainFlow/HomeScreen';
import LandingScreen from '../screens/loginFlow/LandingScreen';
import LoginScreen from '../screens/loginFlow/LoginScreen';
import RegistrationScreen from '../screens/loginFlow/RegistrationScreen';
import MovieScreen from '../screens/mainFlow/MovieScreen';
import SceneScreen from '../screens/mainFlow/SceneScreen';
import ActorScreen from '../screens/mainFlow/ActorScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const dispatch = useDispatch();

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

  database()
    .ref('Movies')
    .on('value', snapshot => {
      dispatch(actions.user.setMovies(snapshot.val()));
    });

  return (
    <NavigationContainer>
      {!user ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="landing" component={LandingScreen} />
          <Stack.Screen name="registration" component={RegistrationScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen
            name="forgot-password"
            component={ForgotPasswordScreen}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{ headerShown: true }}
          initialRouteName="home">
          <Stack.Screen name="home" component={HomeScreen} />
          <Stack.Screen name="movie" component={MovieScreen} />
          <Stack.Screen name="scene" component={SceneScreen} />
          <Stack.Screen name="actor" component={ActorScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
