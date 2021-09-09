import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Foundation from 'react-native-vector-icons/Foundation';

interface TFloatingSingleButtonProps {
  openCreateNewSceneModal: () => void;
  buttonTwoHandle: () => void;
}

const FloatingSingleButton: React.FC<TFloatingSingleButtonProps> = props => {
  const { openCreateNewSceneModal, buttonTwoHandle } = props;
  const [open, setOpen] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    const toValue = open ? 0 : 1;
    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: false,
    }).start();

    setOpen(!open);
  };

  const pinStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
        }),
      },
    ],
  };

  const thumbStyle = {
    transform: [
      { scale: animation },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -130],
        }),
      },
    ],
  };

  const rotation = {
    transform: [
      {
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
    ],
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const handleLowerButton = () => {
    openCreateNewSceneModal();
    toggleMenu();
  };

  const handleUpperButton = () => {
    buttonTwoHandle();
    toggleMenu();
  };

  return (
    <View style={[styles.container, props.style]}>
      <TouchableWithoutFeedback onPress={handleLowerButton}>
        <Animated.View
          style={[styles.button, styles.secondary, pinStyle, opacity]}>
          <Foundation name="page-add" size={25} color="blue" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleUpperButton}>
        <Animated.View
          style={[styles.button, styles.secondary, thumbStyle, opacity]}>
          <MaterialIcons name="add-a-photo" size={25} color="blue" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={toggleMenu}>
        <Animated.View style={[styles.button, styles.menu, rotation]}>
          <Entypo name="plus" size={40} color="blue" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
    alignItems: 'center',
    justifyContent: 'center',
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 10, height: 10 },
    bottom: -640,
    left: 165,
    elevation: 5,
    opacity: 0.8,
  },
  menu: {
    backgroundColor: '#FFF',
  },
  secondary: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: '#FFF',
    marginLeft: 6,
  },
});

export default FloatingSingleButton;
