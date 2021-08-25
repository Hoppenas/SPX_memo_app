import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';
import { createSceneValidationSchema } from '../utils/validations';

import DefaultButton from '../components/DefaultButton';
import DefaultInput from '../components/DefaultInput';

interface CreateSceneModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  name: string;
  location: string;
  date: string;
  movieId: string;
}

const CreateSceneModal: React.FC<CreateSceneModalProps> = props => {
  const { modalVisible, setModalVisible, movieId } = props;
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  };

  interface IcreateScene {
    name: string;
    location: string;
    date: string;
    movieId: string;
  }

  const createScene = (values: IcreateScene) => {
    // const newReference = database().ref('/actors').push();
    // newReference.set({
    //   id: newReference.key,
    //   email: values.email,
    //   name: values.name,
    //   phone: values.phone,
    //   prifilePic:
    //     'https://media.timeout.com/images/103481015/630/472/image.jpg',
    // });

    const newReference = database().ref(
      `Movies/${movieId}/scenes/${values.name}`,
    );

    newReference.set({
      title: values.name,
      location: values.location,
      date: values.date,
    });

    closeModal();
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
            initialValues={{ name: '', location: '', date: '' }}
            onSubmit={values => createScene(values)}
            validationSchema={createSceneValidationSchema}>
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
                  placeholder={t('scenes:namePlacehodler')}
                  onBlur={() => setFieldTouched('name')}
                  autoCapitalize="none"
                  keyboardType="default"
                  style={styles.inputField}
                />
                {touched.name && errors.name && <Text>{errors.name}</Text>}

                <TextInput
                  onChangeText={handleChange('location')}
                  value={values.location}
                  placeholder={t('scenes:locationPlacehodler')}
                  onBlur={() => setFieldTouched('location')}
                  autoCapitalize="none"
                  keyboardType="default"
                  style={styles.inputField}
                />
                {touched.location && errors.location && (
                  <Text>{errors.location}</Text>
                )}

                <TextInput
                  onChangeText={handleChange('date')}
                  value={values.date}
                  placeholder={t('scenes:datePlacehodler')}
                  onBlur={() => setFieldTouched('date')}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  style={styles.inputField}
                />
                {touched.date && errors.date && <Text>{errors.date}</Text>}

                <View style={styles.buttonContainer}>
                  <DefaultButton
                    title={t('scenes:buttonCreateScene')}
                    onPress={handleSubmit}
                  />
                  <DefaultButton
                    title={t('scenes:buttonClose')}
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

export default CreateSceneModal;
