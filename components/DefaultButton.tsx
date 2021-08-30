import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

interface DefaultButtonProps {
  title: string;
  onPress: (event: unknown) => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 15,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#2196F3',
  },
  button: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
    minWidth: '40%',
  },
});

export default DefaultButton;
