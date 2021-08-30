import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import DefaultButton from '../components/DefaultButton';

interface DeleteMovieModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  handleDelete: (event: unknown) => void;
  movieTitle: string;
}

const DeleteMovieModal: React.FC<DeleteMovieModalProps> = props => {
  const { modalVisible, setModalVisible, movieTitle, handleDelete } = props;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const closeModal = () => {
    setModalVisible(false);
  };

  //   const handleDelete = () => {
  //     closeModal();
  //     navigation.navigate('home');
  //     database().ref(`/Movies/${movieId}`).remove();
  //   };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>{t('movieScreen:deleteMovieTitle')}</Text>
          <Text>{movieTitle}?</Text>
          <View style={styles.buttonContainer}>
            <DefaultButton
              title={t('movieScreen:deleteMovie')}
              onPress={() => handleDelete(movieTitle)}
            />
            <DefaultButton
              title={t('movieScreen:cancelMovieDelete')}
              onPress={closeModal}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '75%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  inputField: {
    marginTop: 20,
    marginBottom: 5,
    paddingLeft: 10,
    height: 40,
    borderRadius: 5,
    width: '80%',
    borderWidth: 1.5,
    borderColor: 'blue',
  },
});

export default DeleteMovieModal;
