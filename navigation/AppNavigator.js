import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LandingScreen from '../screens/LandingScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

const AppNavigator = createStackNavigator({
    Landing: LandingScreen,
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    Home: HomeScreen,
    Registration: RegistrationScreen,
});

export default createAppContainer(AppNavigator);
