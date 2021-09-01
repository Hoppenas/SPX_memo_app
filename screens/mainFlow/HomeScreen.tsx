import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import MovieGridTile from '../../components/MovieGridTile';
import ActorsGridTile from '../../components/ActorsGridTile';
import CreateMovieModal from '../../components/CreateMovieModal';
import CreateActorModal from '../../components/CreateActorModal';
import FloatingButton from '../../components/FloatingButton';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const [movieModalVisible, setMovieModalVisible] = useState(false);
  const [actorModalVisible, setActorModalVisible] = useState(false);
  const { movies } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  const email = user.email;
  const { movieData } = useSelector(state => state.app);
  const { actorsData } = useSelector(state => state.actors);

  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.screen}>
      <>
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.moviesSection}>
            <Text style={styles.moviesTitle}>
              {t('homeScreen:moviesTitle')}
            </Text>
            <View style={styles.moviesList}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {Object.keys(movieData).map((movie, index) => (
                  <MovieGridTile
                    key={index}
                    movieData={movieData[movie]}
                    movieName={movieData[movie].title}
                    movieId={movie}
                  />
                ))}
              </ScrollView>
            </View>
            <View style={styles.actorsSection}>
              <Text style={styles.actorsTitle}>
                {t('homeScreen:actorsTitle')}
              </Text>
              <View style={styles.actorsList}>
                {Object.keys(actorsData).map((actor, index) => (
                  <ActorsGridTile
                    key={index}
                    actordata={actorsData[actor]}
                    actorId={actor}
                    width={width}
                  />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </>
      <FloatingButton
        style={{ bottom: 0 }}
        openCreateMovieModal={() => setMovieModalVisible(true)}
        openCreateActorModal={() => setActorModalVisible(true)}
      />
      <CreateActorModal
        modalVisible={actorModalVisible}
        setModalVisible={setActorModalVisible}
      />
      <CreateMovieModal
        modalVisible={movieModalVisible}
        setModalVisible={setMovieModalVisible}
        movies={movies}
        email={email}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  moviesSection: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  moviesTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  moviesList: { height: 130, marginTop: 20 },
  actorsSection: { marginTop: 20 },
  actorsTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  actorsList: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
