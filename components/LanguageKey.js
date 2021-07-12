import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { locale } from '../utils/locale';

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('en')
  const switchLanguage = () => {
    locale.changeLanguage(locale.language === 'en' ? 'lt' : 'en')
    setCurrentLanguage(locale.language)
  }
  return (
    <View onPress={switchLanguage}>
      <Text>{currentLanguage === 'lt' ? 'EN' : '🇱🇹'}</Text>
    </View>
  )
}
