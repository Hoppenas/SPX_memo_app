import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';

const HomeScreen = props => {
  const {t} = useTranslation();

  const {user} = useSelector(state => state.user);

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log(t('homeScreen:userSignedOut')))
      .then(() => {
        props.navigation.navigate({routeName: 'Landing'});
      });
  };

  const checkUser = () => {
    console.log('user.email');
    console.log(user);
  };

  return (
    <View style={styles.screen}>
      {/* {info && <Text>loged in as {user.email}</Text>} */}
      <Text>{t('homeScreen:title')}</Text>
      <Button title={t('homeScreen:buttonLogout')} onPress={logOut} />
      <Button title="check user" onPress={checkUser} />
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
