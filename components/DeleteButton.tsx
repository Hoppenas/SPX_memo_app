import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';

interface DeleteButtonProps {
  setModalVisible: (event: unknown) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = props => {
  const handleDelete = () => {
    props.setModalVisible(true);
  };

  return (
    <Pressable onPress={handleDelete}>
      <View style={styles.container}>
        <AntDesign name="delete" size={26} color="black" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
});

export default DeleteButton;
