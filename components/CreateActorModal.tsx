import React from 'react';
import { View, StyleSheet, Modal, Text, TextInput } from 'react-native';
import database from '@react-native-firebase/database';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import { createActorValidationSchema } from '../utils/validations';
import DefaultButton from '../components/DefaultButton';

interface CreateActorModalProps {
  modalVisible: boolean;
  setModalVisible: (event: unknown) => void;
  name: string;
  phone: string;
  email: string;
}

const CreateActorModal: React.FC<CreateActorModalProps> = props => {
  const { modalVisible, setModalVisible } = props;
  const { t } = useTranslation();

  const closeModal = () => {
    setModalVisible(false);
  };

  interface IcreateActor {
    name: string;
    phone: string;
    email: string;
  }

  const createActor = (values: IcreateActor) => {
    const newReference = database().ref('/actors').push();
    newReference.set({
      name: values.name,
      phone: values.phone,
      email: values.email,
      id: newReference.key,
      prifilePic:
        'https://media.timeout.com/images/103481015/630/472/image.jpg',
    });
    console.log(newReference.key);
    closeModal(false);
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
                  style={styles.inputField}
                />
                {touched.name && errors.name && <Text>{errors.name}</Text>}

                <TextInput
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  placeholder={t('actors:phonePlacehodler')}
                  onBlur={() => setFieldTouched('phone')}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  style={styles.inputField}
                />
                {touched.phone && errors.phone && <Text>{errors.phone}</Text>}

                <TextInput
                  onChangeText={handleChange('email')}
                  value={values.email}
                  placeholder={t('actors:emailPlacehodler')}
                  onBlur={() => setFieldTouched('email')}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  style={styles.inputField}
                />
                {touched.email && errors.email && <Text>{errors.email}</Text>}

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

export default CreateActorModal;
