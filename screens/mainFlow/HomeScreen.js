import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';

const HomeScreen = props => {
      
  const { t } = useTranslation();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log({t('homeScreen:userSignedOut')}))
      .then(() => {
        props.navigation.navigate({routeName: 'Landing'});
      });
  };
  return (
    <View style={styles.screen}>
      <Text>{t('homeScreen:title')}</Text>
      <Button title={t('homeScreen:buttonLogout')} onPress={logOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
