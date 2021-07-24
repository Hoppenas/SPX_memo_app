import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import theme from '../../styles/theme';

const LandingScreen = props => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <Text>Landing Screen</Text>
      <Button
        title={t('landing:buttonLogin')}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Login' });
        }}
      />
      <Button
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
    alignItems: 'center',
  },
});

export default LandingScreen;
