import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import landingBackgroundImg from '../assets/pictures/pictures';

const WrapperWithBackground: React.FC = ({ children }) => {
  return (
    <ImageBackground
      source={landingBackgroundImg}
      resizeMode="cover"
      style={styles.image}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default WrapperWithBackground;
