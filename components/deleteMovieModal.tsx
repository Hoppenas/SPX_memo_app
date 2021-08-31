import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';

import DefaultButton from '../components/DefaultButton';

interface DeleteModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  handleDelete: (event: unknown) => void;
  movieTitle: string;
  movieId: string;
  item: string;
}

const DeleteModal: React.FC<DeleteModalProps> = props => {
  const { modalVisible, setModalVisible, movieTitle, handleDelete, movieId } =
    props;
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleDeleteItem = () => {
    setModalVisible(false);
    handleDelete(movieId);
    // navigation.goBack();
  };

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
              onPress={handleDeleteItem}
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

export default DeleteModal;
