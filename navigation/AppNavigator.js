import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import ForgotPasswordScreen from '../screens/loginFlow/ForgotPasswordScreen';
import HomeScreen from '../screens/mainFlow/HomeScreen';
import LandingScreen from '../screens/loginFlow/LandingScreen';
import LoginScreen from '../screens/loginFlow/LoginScreen';
import RegistrationScreen from '../screens/loginFlow/RegistrationScreen';

const AppNavigator = createStackNavigator({
    Landing: LandingScreen,
    Login: LoginScreen,
    ForgotPassword: ForgotPasswordScreen,
    Home: HomeScreen,
    Registration: RegistrationScreen,
});

export default createAppContainer(AppNavigator);
