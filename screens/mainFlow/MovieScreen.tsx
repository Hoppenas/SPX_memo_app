import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  Image,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  Animated,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import database from '@react-native-firebase/database';

import FloatingSingleButton from '../../components/floatingSingleButton';
import CreateSceneModal from '../../components/CreateSceneModal';
import DeleteButton from '../../components/DeleteButton';
import DeleteMovieModal from '../../components/deleteMovieModal';
import { actions } from '../../state/actions';

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;
const uri =
  'https://firebasestorage.googleapis.com/v0/b/fir-8824b.appspot.com/o/assets%2FprofilePic%2Fscene.jpg?alt=media&token=631e9c7a-e4a1-4fda-b394-822f08af0f81';

const MovieScreen = ({ route }) => {
  const { movieId } = route.params;
  const { movieData } = useSelector(state => state.app);
  const movie = movieData[movieId];
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <DeleteButton setModalVisible={setDeleteModalVisible} />
      ),
    });
  }, [navigation]);

  // const handleDelete = () => {
  //   navigation.navigate('home');
  //   setDeleteModalVisible(false);
  //   // database().ref(`/Movies/${movieId}`).remove();
  //   // return <></>;
  // };

  const handleDelete = useCallback(movieTitle => {
    setDeleteModalVisible(false);
    navigation.navigate('home');
    dispatch(actions.gallery.deleteMovie(movieTitle));
  }, []);

  const openCreateNewSceneModal = () => {
    setModalVisible(true);
  };

  const scrollY = React.useRef(new Animated.Value(0)).current;

  if (movie && !movie.scenes) {
    return (
      <View style={styles.screen}>
        <Text style={styles.sceneLocation}>{t('movieScreen:noScenes')}</Text>
        <CreateSceneModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          movieId={movieId}
        />
        <FloatingSingleButton
          openCreateNewSceneModal={openCreateNewSceneModal}
        />
      </View>
    );
  } else {
    const DATA = Object.values(movie.scenes);
    return (
      <View style={styles.screen}>
        <Animated.FlatList
          data={DATA}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true },
          )}
          keyExtractor={item => item.title}
          contentContainerStyle={{
            padding: SPACING,
            paddingTop: StatusBar.currentHeight || 42,
          }}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];

            const opacityInputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 1),
            ];

            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });

            const opacity = scrollY.interpolate({
              inputRange: opacityInputRange,
              outputRange: [1, 1, 1, 0],
            });

            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('scene', {
                    sceneTitle: item.title,
                    movieTitle: movieId,
                  });
                }}>
                <Animated.View
                  style={[
                    styles.sceneContainer,
                    { opacity, transform: [{ scale }] },
                  ]}>
                  <Image source={{ uri: uri }} style={styles.avatar} />
                  <View>
                    <Text style={styles.sceneTitle}>{item.title}</Text>
                    <Text style={styles.sceneLocation}>{item.location}</Text>
                    <Text style={styles.sceneDate}>{item.date}</Text>
                  </View>
                </Animated.View>
              </Pressable>
            );
          }}
        />
        <DeleteMovieModal
          modalVisible={deleteModalVisible}
          setModalVisible={setDeleteModalVisible}
          movieTitle={movie.title}
          handleDelete={handleDelete}
        />
        <CreateSceneModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          movieId={movieId}
        />
        <FloatingSingleButton
          openCreateNewSceneModal={openCreateNewSceneModal}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#FFF' },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE,
    marginRight: SPACING / 2,
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  sceneContainer: {
    flexDirection: 'row',
    padding: SPACING,
    marginBottom: SPACING,
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: 12,
    elevation: 4,
  },
  sceneTitle: { fontSize: 22, fontWeight: '700' },
  sceneLocation: { fontSize: 18, opacity: 0.7 },
  sceneDate: { fontSize: 14, opacity: 0.8, color: '#0099cc' },
});

export default MovieScreen;
