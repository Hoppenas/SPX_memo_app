import React, { useCallback } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import { actions } from '../../state/actions';
import Loader from '../../components/Loader';
import FloatingButtonCamera from '../../components/FloatingButtonCamera';

const ActorSceneScreen = ({ route }) => {
  const { sceneTitle, movieTitle, actorId } = route.params;
  const { setLoading } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const handleSubmitUpload = useCallback(
    (imageUri, movieTitle, sceneTitle, actorId) => {
      dispatch(
        actions.gallery.uploadImage(imageUri, movieTitle, sceneTitle, actorId),
      );
    },
    [],
  );

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
        handleSubmitUpload(selectedImage.uri, movieTitle, sceneTitle, actorId);
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
        handleSubmitUpload(path.uri, movieTitle, sceneTitle, actorId);
      }
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <Loader />
      ) : (
        <View style={styles.screen}>
          <Text style={styles.actorTitle}>actor name</Text>
          <Text>actor movie: {movieTitle}</Text>
          <Text>actor scene: {sceneTitle}</Text>
          <Text>actor id: {actorId}</Text>
          <FloatingButtonCamera
            handleLaunchCamera={handleLaunchCamera}
            handleSelectImageFromLibrary={handleSelectImageFromLibrary}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  actorTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});

export default ActorSceneScreen;
