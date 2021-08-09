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
import { useNavigation } from '@react-navigation/native';
import database from '@react-native-firebase/database';

import DefaultButton from '../../components/DefaultButton';
import DefaultInput from '../../components/DefaultInput';
import SceneTile from '../../components/SceneTile';

const MovieScreen = ({ route }) => {
  const { title } = route.params;
  const { movies } = useSelector(state => state.user);
  const movie = movies[title];
  const { t } = useTranslation();
  const { isLoading } = useSelector(state => state.ui);
  const [newSceneName, setNewSceneName] = useState('');

  const navigation = useNavigation();

  const addNewScene = movieName => {
    const newReference = database().ref(
      `Movies/${movieName}/scenes/${newSceneName}`,
    );

    newReference
      .set({ title: newSceneName })
      .then(setNewSceneName(''))
      .then(() => console.log('Scene added.'));
  };

  return (
    <SafeAreaView style={styles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={styles.movieContainer}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <Text style={styles.movieDirector}>{movie.director}</Text>
          <Text style={styles.movieDirector}>{movie.administrators}</Text>
          <Text style={styles.movieScenes}>Scenes:</Text>
          {movie.scenes &&
            Object.keys(movie.scenes).map((scene, index) => (
              <SceneTile key={index} title={movie.scenes[scene].title} />
            ))}
          <DefaultInput
            placeholder={'Scene name'}
            onChangeText={setNewSceneName}
            value={newSceneName}
          />
          <DefaultButton
            title={'add scene'}
            onPress={() => addNewScene(title)}
          />
          {/* <ion-icon name="videocam-outline"></ion-icon> */}
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
