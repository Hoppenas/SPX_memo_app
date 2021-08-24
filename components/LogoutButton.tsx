import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

import { actions } from '../state/actions';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.user.logout());
  };

  return (
    <Pressable onPress={handleLogout}>
      <View style={styles.container}>
        <AntDesign name="logout" size={30} color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});

export default LogoutButton;
