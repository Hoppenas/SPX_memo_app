import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { createActorValidationSchema } from '../utils/validations';

import DefaultButton from '../components/DefaultButton';

interface CreateActorModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  setMovieName: (event: unknown) => void;
  movieName: string;
  setStartDate: (event: unknown) => void;
  startDate: string;
  setDirector: (event: unknown) => void;
  director: string;
  email: string;
  movies: any;
}

const CreateActorModal: React.FC<CreateActorModalProps> = ({
  modalVisible,
  setModalVisible,
}) => {
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  };

  const createActor = () => {
    console.log('new actor added');
  };

  //   const createMovie = () => {
  //     if (movies[movieName]) {
  //       console.log('movie exists');
  //     } else {
  //       const newReference = database().ref('/Movies').push();
  //       newReference
  //         // .ref(`Movies/${movieName}`)
  //         .set({
  //           id: newReference.key,
  //           title: movieName,
  //           'start date': startDate,
  //           director: director,
  //           administrators: [email],
  //           scenes: [],
  //         });

  //       closeModal();
  //     }
  //   };

  return (
    <View>
      <View>
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
                initialValues={{ name: '', phone: '', email: '' }}
                onSubmit={values => createActor(values)}
                validationSchema={createActorValidationSchema}>
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
                      placeholder={t('actors:namePlacehodler')}
                      onBlur={() => setFieldTouched('name')}
                      autoCapitalize="none"
                      keyboardType="default"
                    />
                    {touched.name && errors.name && <Text>{errors.name}</Text>}

                    <TextInput
                      onChangeText={handleChange('phone')}
                      value={values.phone}
                      placeholder={t('actors:phonePlacehodler')}
                      onBlur={() => setFieldTouched('phone')}
                      autoCapitalize="none"
                      keyboardType="number-pad"
                    />
                    {touched.phone && errors.phone && (
                      <Text>{errors.phone}</Text>
                    )}

                    <TextInput
                      onChangeText={handleChange('email')}
                      value={values.email}
                      placeholder={t('actors:emailPlacehodler')}
                      onBlur={() => setFieldTouched('email')}
                      autoCapitalize="none"
                      keyboardType="email-address"
                    />
                    {touched.email && errors.email && (
                      <Text>{errors.email}</Text>
                    )}

                    <View style={styles.buttonContainer}>
                      <DefaultButton
                        title={t('actors:buttonLogin')}
                        onPress={handleSubmit}
                      />
                      <DefaultButton
                        title={t('actors:buttonClose')}
                        onPress={closeModal}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default CreateActorModal;
