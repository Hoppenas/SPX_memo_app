import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import database from '@react-native-firebase/database';

import DefaultButton from '../../components/DefaultButton';

const HomeScreen = props => {
  const { t } = useTranslation();
  const { isLoading } = useSelector(state => state.ui);
  const { email } = useSelector(state => state.user);

  const reference = database().ref('/users/123');

  database()
    .ref()
    .once('value')
    .then(snapshot => {
      console.log('User data: ', snapshot.val().name);
    });

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log(t('homeScreen:userSignedOut')))
      .then(() => {
        props.navigation.navigate({ routeName: 'Landing' });
      });
  };

  const printOut = () => {
    console.log('your email');
    console.log(email);
  };

  return (
    <View style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text>{t('homeScreen:title')}</Text>
          <Text>Logged in as {email}</Text>
          <DefaultButton
            title={t('homeScreen:buttonLogout')}
            onPress={logOut}
          />
          <DefaultButton title="print" onPress={printOut} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
});

export default HomeScreen;
