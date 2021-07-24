import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useTranslation } from 'react-i18next';

import theme from '../../styles/theme';
import DefaultButton from '../../components/DefaultButton';

const ForgotPasswordScreen = props => {
  const { t } = useTranslation();

  return (
    <View style={styles.screen}>
      <Text>{t('forgotPassword:title')}</Text>
      <DefaultButton
        title={t('forgotPassword:button')}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Login' });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
  },
});

export default ForgotPasswordScreen;
