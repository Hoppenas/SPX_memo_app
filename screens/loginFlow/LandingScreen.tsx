import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import theme from '../../styles/theme';
import DefaultButton from '../../components/DefaultButton';

const LandingScreen = props => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <DefaultButton
        title={t('landing:buttonLogin')}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Login' });
        }}
      />
      <DefaultButton
        title={t('landing:buttonRegister')}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Registration' });
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
  },
});

export default LandingScreen;
