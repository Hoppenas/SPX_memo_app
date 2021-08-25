import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import DefaultButton from '../../components/DefaultButton';
import SceneTile from '../../components/SceneTile';
import FloatingSingleButton from '../../components/floatingSingleButton';
import CreateSceneModal from '../../components/CreateSceneModal';

const MovieScreen = ({ route }) => {
  const { movieId } = route.params;
  const { movieData } = useSelector(state => state.app);
  const movie = movieData[movieId];
  const { t } = useTranslation();
  const { setLoading } = useSelector(state => state.ui);
  const [modalVisible, setModalVisible] = useState(false);

  const openCreateNewSceneModal = () => {
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.screen}>
      {setLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.movieContainer}>
          <CreateSceneModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            movieId={movieId}
          />
          <Text style={styles.movieTitle}>{movieData[movieId].title}</Text>
          <Text style={styles.movieDirector}>
            {movieData[movieId].director}
          </Text>
          <Text style={styles.movieDirector}>
            {movieData[movieId].administrators}
          </Text>
          <Text style={styles.movieScenes}>{t('movieScreen:sceneTitle')}:</Text>
          {movie.scenes &&
            Object.keys(movie.scenes).map((scene, index) => (
              <SceneTile
                key={index}
                sceneTitle={movie.scenes[scene].title}
                movieTitle={movieId}
              />
            ))}
          <DefaultButton
            title={'print'}
            onPress={() => console.log(movieData[movieId].title)}
          />
        </View>
      )}
      <FloatingSingleButton openCreateNewSceneModal={openCreateNewSceneModal} />
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
  movieContainer: {},
  movieTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  movieScenes: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
    backgroundColor: 'grey',
  },
  movieDirector: {
    fontSize: 12,
    color: '#b63838',
  },
});

export default MovieScreen;
