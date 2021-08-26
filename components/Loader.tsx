import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loader: React.FC = () => {
  return (
    <View style={styles.centeredView}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
