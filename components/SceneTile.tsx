import React from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

const SceneTile = props => {
  const { title } = props;
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate('scene', { title: title });
      }}>
      <View style={styles.container}>
        <Icon name="videocam-outline" size={30} color="#4F8EF7" />
        <Text style={styles.title}>{title}</Text>
        <Icon name="chevron-forward-outline" size={30} color="#4F8EF7" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    marginVertical: 10,
    paddingVertical: 5,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: 'grey',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    // flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
  },
});

export default SceneTile;
