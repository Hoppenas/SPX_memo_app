import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  value: string;
  secureTextEntry?: boolean;
}

const DefaultInput: React.FC<TextInputProps> = ({
  placeholder,
  onChangeText,
  value,
  secureTextEntry,
}) => {
  return (
    <View>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default DefaultInput;
