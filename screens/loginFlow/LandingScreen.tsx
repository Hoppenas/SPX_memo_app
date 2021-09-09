import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import DefaultButton from '../../components/DefaultButton';
import WrapperWithBackground from '../../components/WrapperWithBackground';

const LandingScreen = props => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  return (
    <View style={styles.screen}>
      <WrapperWithBackground>
        <View style={styles.buttonContainer}>
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
      </WrapperWithBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    marginBottom: 200,
  },
});

export default LandingScreen;
