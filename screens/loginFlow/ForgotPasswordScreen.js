import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import theme from '../../styles/theme';

const ForgotPasswordScreen = props => {
          
  const { t } = useTranslation();

    return (
        <View style={styles.screen}>
            <Text>{t('homeScreen:title')}</Text>
            <Button title={t('homeScreen:button')} onPress={()=>{props.navigation.navigate({routeName: 'Login'})}}/>
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
