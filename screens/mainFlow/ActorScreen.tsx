import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';

import FloatingEditButton from '../../components/FloatingEditButton';
import EditActorModal from '../../components/EditActorModal';
import { actions } from '../../state/actions';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const ActorScreen = ({ route }) => {
  const { actorId } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const { setLoading } = useSelector(state => state.ui);
  const { actorsData } = useSelector(state => state.actors);
  const actor = actorsData[actorId];

  const dispatch = useDispatch();

  const handleSubmitUpload = useCallback((imageUri, actorId) => {
    dispatch(actions.gallery.updateActorProfilePhoto(imageUri, actorId));
  }, []);

  const handleLaunchCamera = () => {
    const options = {
      mediaType: 'photo',
      cameraType: 'front',
    };
    launchCamera(options, response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        const path = { uri: selectedImage.uri };
        handleSubmitUpload(selectedImage.uri, actorId);
      }
    });
  };

  const handleSelectImageFromLibrary = () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) return;
      if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImage = response.assets[0];
        const path = { uri: selectedImage.uri };
        handleSubmitUpload(path.uri, actorId);
      }
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.container}>
          <View style={styles.shadowContainer}>
            <View
              style={{
                width: ITEM_WIDTH,
                height: ITEM_HEIGHT,
                overflow: 'hidden',
                alignItems: 'center',
                borderRadius: 14,
              }}>
              <Image
                source={{ uri: actor.prifilePic }}
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  resizeMode: 'cover',
                }}
              />
            </View>
          </View>
          <View style={[styles.shadowContainer, styles.infoContainer]}>
            <Text style={styles.actorTitle}>{actor.name}</Text>
            <Text style={styles.actorPhone}>{actor.phone}</Text>
            <Text style={styles.actorEmail}>{actor.email}</Text>
            <EditActorModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              actorId={actorId}
            />
          </View>
          <FloatingEditButton
            openEditActorModal={() => setModalVisible(true)}
            handleChangePhoto={handleLaunchCamera}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    height: '100%',
    width,
    alignItems: 'center',
  },
  shadowContainer: {
    borderRadius: 18,
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    padding: 12,
    backgroundColor: 'white',
  },
  infoContainer: {
    marginTop: 20,
    width: '80%',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  actorTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  actorPhone: { fontSize: 18, opacity: 0.7 },
  actorEmail: { fontSize: 14, opacity: 0.8, color: '#0099cc' },
});

export default ActorScreen;
