import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { locale } from '../utils/locale';

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const switchLanguage = () => {
    locale.changeLanguage(locale.language === 'en' ? 'lt' : 'en');
    setCurrentLanguage(locale.language);
  };
  return (
    <TouchableOpacity onPress={switchLanguage} style={styles.language}>
      <Text style={styles.languageText}>{currentLanguage}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  language: {
    paddingLeft: 50,
  },
  languageText: {
    fontSize: 18,
  },
});
