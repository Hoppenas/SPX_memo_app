import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import ForgotPasswordScreen from '../screens/loginFlow/ForgotPasswordScreen';
import HomeScreen from '../screens/mainFlow/HomeScreen';
import LandingScreen from '../screens/loginFlow/LandingScreen';
import LoginScreen from '../screens/loginFlow/LoginScreen';
import RegistrationScreen from '../screens/loginFlow/RegistrationScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
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
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
