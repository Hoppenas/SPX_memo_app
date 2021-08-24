import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, Pressable } from 'react-native';
import database from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';

import DefaultInput from './DefaultInput';
import DefaultButton from './DefaultButton';

interface CreateMovieModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  email: string;
  movies: any;
}

const CreateMovieModal: React.FC<CreateMovieModalProps> = ({
  modalVisible,
  setModalVisible,
  movies,
  email,
}) => {
  const [movieName, setMovieName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [director, setDirector] = useState('');

  const { t } = useTranslation();

  const closeModal = () => {
    setMovieName('');
    setModalVisible(false);
    setStartDate('');
    setDirector('');
  };

  const createMovie = () => {
    if (movies[movieName]) {
      console.log('movie exists');
    } else {
      const newReference = database().ref('/Movies').push();
      newReference.set({
        id: newReference.key,
        title: movieName,
        'start date': startDate,
        director: director,
        administrators: [email],
        scenes: [],
      });

      closeModal();
    }
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
          <DefaultInput
            placeholder={t('homeScreen:enterNewMovieName')}
            onChangeText={setMovieName}
            value={movieName}
          />
          <DefaultInput
            placeholder={t('homeScreen:enterStartDate')}
            onChangeText={setStartDate}
            value={startDate}
          />
          <DefaultInput
            placeholder={t('homeScreen:enterDirector')}
            onChangeText={setDirector}
            value={director}
          />
          <View style={styles.buttonContainer}>
            <DefaultButton
              title={t('homeScreen:buttonCreateNewMovie')}
              onPress={createMovie}
            />
            <DefaultButton
              title={t('homeScreen:buttonCancelMovie')}
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CreateMovieModal;
