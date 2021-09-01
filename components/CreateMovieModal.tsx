import React, { useState } from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import { createMovieValidationSchema } from '../utils/validations';
import DefaultInput from './DefaultInput';
import DefaultButton from './DefaultButton';

interface CreateMovieModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  email: string;
  movies: any;
}

interface IcreateMovie {
  name: string;
  director: string;
  date: string;
}

const CreateMovieModal: React.FC<CreateMovieModalProps> = ({
  modalVisible,
  setModalVisible,
  movies,
  email,
}) => {
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  };

  const createMovie = (values: IcreateMovie) => {
    if (movies[values.name]) {
      console.log('movie exists');
    } else {
      const newReference = database().ref('/Movies').push();
      newReference.set({
        id: newReference.key,
        title: values.name,
        'start date': values.date,
        director: values.director,
        administrators: [email],
        scenes: [],
        profilePic:
          'https://firebasestorage.googleapis.com/v0/b/fir-8824b.appspot.com/o/assets%2FprofilePic%2Fscene.jpg?alt=media&token=631e9c7a-e4a1-4fda-b394-822f08af0f81',
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
          <Formik
            initialValues={{ name: '', director: '', date: '' }}
            onSubmit={values => createMovie(values)}
            validationSchema={createMovieValidationSchema}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              handleSubmit,
            }) => (
              <>
                <TextInput
                  onChangeText={handleChange('name')}
                  value={values.name}
                  placeholder={t('movieScreen:namePlacehodler')}
                  onBlur={() => setFieldTouched('name')}
                  autoCapitalize="none"
                  keyboardType="default"
                  style={styles.inputField}
                />
                {touched.name && errors.name && <Text>{errors.name}</Text>}

                <TextInput
                  onChangeText={handleChange('director')}
                  value={values.director}
                  placeholder={t('movieScreen:directorPlacehodler')}
                  onBlur={() => setFieldTouched('director')}
                  autoCapitalize="none"
                  keyboardType="default"
                  style={styles.inputField}
                />
                {touched.director && errors.director && (
                  <Text>{errors.director}</Text>
                )}

                <TextInput
                  onChangeText={handleChange('date')}
                  value={values.date}
                  placeholder={t('movieScreen:datePlacehodler')}
                  onBlur={() => setFieldTouched('date')}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  style={styles.inputField}
                />
                {touched.date && errors.date && <Text>{errors.date}</Text>}

                <View style={styles.buttonContainer}>
                  <DefaultButton
                    title={t('movieScreen:buttonCreateScene')}
                    onPress={handleSubmit}
                  />
                  <DefaultButton
                    title={t('movieScreen:buttonClose')}
                    onPress={closeModal}
                  />
                </View>
              </>
            )}
          </Formik>
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

export default CreateMovieModal;
