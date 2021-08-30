import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HeaderTitle: React.FC = props => {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default HeaderTitle;
