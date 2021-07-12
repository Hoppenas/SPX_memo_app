import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ForgotPasswordScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>Forgot password Screen</Text>
            <Button title='Reset password' onPress={()=>{props.navigation.navigate({routeName: 'Login'})}}/>
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

export default ForgotPasswordScreen;
