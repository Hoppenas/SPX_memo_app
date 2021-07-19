import React from 'react';
import {ActivityIndicator, View, Text, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const HomeScreen = props => {
  const {t} = useTranslation();
  const {isLoading} = useSelector(state => state.ui);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log(t('homeScreen:userSignedOut')))
      .then(() => {
        props.navigation.navigate({routeName: 'Landing'});
      });
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>{t('homeScreen:title')}</Text>
          <Button title={t('homeScreen:buttonLogout')} onPress={logOut} />
        </>
      )}
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
