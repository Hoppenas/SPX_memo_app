import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../state/actions';
import { ActivityIndicator } from 'react-native';

import ForgotPasswordScreen from '../screens/loginFlow/ForgotPasswordScreen';
import HomeScreen from '../screens/mainFlow/HomeScreen';
import LandingScreen from '../screens/loginFlow/LandingScreen';
import LoginScreen from '../screens/loginFlow/LoginScreen';
import RegistrationScreen from '../screens/loginFlow/RegistrationScreen';
import MovieScreen from '../screens/mainFlow/MovieScreen';
import SceneScreen from '../screens/mainFlow/SceneScreen';
import ActorScreen from '../screens/mainFlow/ActorScreen';
import ActorSceneScreen from '../screens/mainFlow/ActorSceneScreen';
import LogoutButton from '../components/LogoutButton';
import Loader from '../components/Loader';
import HeaderTitle from '../components/HeaderTitle';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const dispatch = useDispatch();

  const { setLoading } = useSelector(state => state.ui);
  const { user } = useSelector(state => state.user);

  // Handle user state changes
  function onAuthStateChanged(user) {
    dispatch(actions.user.setUser(user));
    if (setLoading) dispatch(actions.ui.setLoading(false));
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (user) {
    dispatch(actions.app.getMovies());
    dispatch(actions.actors.getActors());
  }
  useEffect(() => {}, []);

  if (setLoading) return <Loader />;

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
          <Stack.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: '',
              headerRight: () => <LogoutButton />,
            }}
          />
          <Stack.Screen
            name="movie"
            component={MovieScreen}
            options={{
              headerTitleStyle: { alignSelf: 'center', marginRight: 50 },
              title: 'Scenes',
            }}
          />
          <Stack.Screen
            name="scene"
            component={SceneScreen}
            options={{
              headerTitleStyle: { alignSelf: 'center', marginRight: 50 },
              title: 'Actors',
            }}
          />
          <Stack.Screen name="actor" component={ActorScreen} />
          <Stack.Screen
            name="actorScene"
            component={ActorSceneScreen}
            options={{
              title: '',
            }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default MainNavigator;
