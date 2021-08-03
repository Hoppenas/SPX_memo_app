import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface DefaultButtonProps {
  title: string;
  onPress: (event: unknown) => void;
}

const DefaultButton: React.FC<DefaultButtonProps> = ({ title, onPress }) => {
  return (
    <View>
      <Button style={styles.button} title={title} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'grey',
  },
});

export default DefaultButton;
