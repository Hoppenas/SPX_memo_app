import React, { useState, useCallback } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import { actions } from '../../state/actions';

const ActorSceneScreen = ({ route }) => {
  const { sceneTitle, movieTitle, actorId } = route.params;
  const { movieData } = useSelector(state => state.app);
  const { gallery } = useSelector(state => state.gallery);
  // const movie = movies[title];
  const { t } = useTranslation();
  const { setLoading } = useSelector(state => state.ui);
  const [imagePath, setImagePath] = useState({});
  const dispatch = useDispatch();

  const navigation = useNavigation();

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
        setImagePath(path);
        handleSubmitUpload(imagePath.uri, movieTitle, sceneTitle, actorId);
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
        setImagePath(path);
        handleSubmitUpload(imagePath.uri, movieTitle, sceneTitle, actorId);
      }
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.screen}>
          <Text style={styles.actorTitle}>actor name</Text>
          <Text>actor movie: {movieTitle}</Text>
          <Text>actor scene: {sceneTitle}</Text>
          <Text>actor id: {actorId}</Text>
          <Button title={'camera'} onPress={handleLaunchCamera} />
          <Button title={'library'} onPress={handleSelectImageFromLibrary} />
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
