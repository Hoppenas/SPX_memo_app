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
  const { sceneTitle, movieTitle } = route.params;
  const { movieData } = useSelector(state => state.app);
  const { gallery } = useSelector(state => state.gallery);
  // const movie = movies[title];
  const { t } = useTranslation();
  const { setLoading } = useSelector(state => state.ui);
  const [imagePath, setImagePath] = useState({});
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleSubmitUpload = useCallback((imageUri, movieTitle, sceneTitle) => {
    dispatch(actions.gallery.uploadImage(imageUri, movieTitle, sceneTitle));
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
          <Text style={styles.sceneTitle}>{sceneTitle}</Text>
          <Button title={'camera'} onPress={handleLaunchCamera} />
          <Button title={'library'} onPress={handleSelectImageFromLibrary} />
          <Button
            title={'handle upload'}
            onPress={() =>
              handleSubmitUpload(imagePath.uri, movieTitle, sceneTitle)
            }
          />
          <Button
            title={'console info'}
            onPress={() => console.log(movieData)}
          />
          <Button
            onPress={() => {
              navigation.navigate('actorScene', { actorId: '123' });
            }}
            title={'Actor 1'}
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
