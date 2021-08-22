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
import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import SceneTile from '../../components/SceneTile';

const SceneScreen = ({ route }) => {
  const { title } = route.params;
  const { movies } = useSelector(state => state.user);
  const movie = movies[title];
  const { t } = useTranslation();
  const { setLoading } = useSelector(state => state.ui);
  const [newSceneName, setNewSceneName] = useState('');
  const [imagePath, setImagePath] = useState({});
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleSubmitUpload = useCallback(imageUri => {
    // dispatch(actions.gallery.uploadImage(imageUri));
    dispatch(actions.gallery.uploadImage(imageUri.uri));
    console.log(imageUri);
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
        setImagePath(path);
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
      }
    });
  };

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.screen}>
          <Text style={styles.sceneTitle}>{title}</Text>
          <Button title={'camera'} onPress={handleLaunchCamera} />
          <Button title={'library'} onPress={handleSelectImageFromLibrary} />
          <Button
            title={'image path'}
            onPress={() => handleSubmitUpload(imagePath)}
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
  sceneTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
});

export default SceneScreen;
