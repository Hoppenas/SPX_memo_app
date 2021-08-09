import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import theme from '../../styles/theme';
import DefaultButton from '../../components/DefaultButton';

const LandingScreen = props => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <DefaultButton
        title={t('landing:buttonLogin')}
        onPress={() => {
          navigation.navigate('login');
        }}
      />
      <DefaultButton
        title={t('landing:buttonRegister')}
        onPress={() => {
          navigation.navigate('registration');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
});

export default LandingScreen;
