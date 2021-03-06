import React, { useCallback, useLayoutEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  Text,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  launchCamera,
  launchImageLibrary,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import { actions } from '../../state/actions';
import FloatingButtonCamera from '../../components/FloatingButtonCamera';
import DeleteButton from '../../components/DeleteButton';
import DeleteModal from '../../components/deleteMovieModal';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.76;
const ITEM_HEIGHT = ITEM_WIDTH * 1.47;

const ActorSceneScreen = ({ route }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const { sceneTitle, movieTitle, actorId } = route.params;
  const { movieData } = useSelector(state => state.app);
  const { t } = useTranslation();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const scrollX = React.useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton setModalVisible={setDeleteModalVisible} />
      ),
    });
  }, [navigation]);

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

  const handleDelete = useCallback(movieId => {
    navigation.navigate('scene', {
      sceneTitle: sceneTitle,
      movieTitle: movieTitle,
    });
    dispatch(
      actions.gallery.deleteActorFromScene(movieId, sceneTitle, actorId),
    );
  }, []);

  if (
    movieData[movieTitle].scenes[sceneTitle].actors[actorId] === undefined ||
    !movieData[movieTitle].scenes[sceneTitle].actors[actorId].gallery
  ) {
    return (
      <View style={styles.screen}>
        <View style={styles.shadowContainer}>
          <View
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              overflow: 'hidden',
              alignItems: 'center',
              borderRadius: 14,
            }}>
            <Text>{t('actors:noImages')}</Text>
          </View>
        </View>
        <DeleteModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          movieTitle={movieTitle}
          handleDelete={handleDelete}
          movieId={movieTitle}
        />
        <FloatingButtonCamera
          handleLaunchCamera={handleLaunchCamera}
          handleSelectImageFromLibrary={handleSelectImageFromLibrary}
        />
      </View>
    );
  } else {
    const data = Object.values(
      movieData[movieTitle].scenes[sceneTitle].actors[actorId].gallery,
    );
    return (
      <View style={styles.screen}>
        <StatusBar hidden />
        <Animated.FlatList
          data={data}
          keyExtractor={item => item.uid}
          horizontal
          showsHorizontalScrollIndicator
          pagingEnabled
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: true },
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];
            const translateX = scrollX.interpolate({
              inputRange,
              outputRange: [-width * 0.7, 0, width * 0.7],
            });
            return (
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
                    <Animated.Image
                      source={{ uri: item.imageUrl }}
                      style={{
                        width: ITEM_WIDTH,
                        height: ITEM_HEIGHT,
                        resizeMode: 'cover',
                        transform: [
                          {
                            translateX,
                          },
                        ],
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          }}
        />
        <DeleteModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          movieTitle={movieTitle}
          handleDelete={handleDelete}
          movieId={movieTitle}
        />
        <FloatingButtonCamera
          handleLaunchCamera={handleLaunchCamera}
          handleSelectImageFromLibrary={handleSelectImageFromLibrary}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width,
    justifyContent: 'center',
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
});

export default ActorSceneScreen;
