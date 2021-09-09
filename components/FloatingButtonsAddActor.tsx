import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

interface FloatingButtonAddActorProps {
  buttonOneHandle: () => void;
  buttonTwoHandle: () => void;
  style?: any;
}

const FloatingButtonAddActor: React.FC<FloatingButtonAddActorProps> = props => {
  const { buttonOneHandle, buttonTwoHandle } = props;
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
          outputRange: ['0deg', '45deg'],
        }),
      },
    ],
  };

  const opacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, 1],
  });

  const handleLowerButton = () => {
    buttonOneHandle();
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
          <Feather name="list" size={25} color="blue" />
        </Animated.View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={handleUpperButton}>
        <Animated.View
          style={[styles.button, styles.secondary, thumbStyle, opacity]}>
          <Entypo name="add-user" size={25} color="blue" />
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
    width: '100%',
    alignItems: 'center',
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
    bottom: 20,
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

export default FloatingButtonAddActor;
