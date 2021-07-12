import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

import theme from '../styles/theme.style';

const LandingScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Landing Screen</Text>
            <Button title='Log in' onPress={() => {props.navigation.navigate({routeName: 'Login'})}} />
            <Button title='Register' onPress={() => {props.navigation.navigate({routeName: 'Registration'})}} />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default LandingScreen;
