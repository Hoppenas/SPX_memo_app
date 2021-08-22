import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import DefaultButton from '../../components/DefaultButton';
import MovieGridTile from '../../components/MovieGridTile';
import ActorsGridTile from '../../components/ActorsGridTile';
import CreateMovieModal from '../../components/CreateMovieModal';
import { actions } from '../../state/actions';

const { height, width } = Dimensions.get('window');

const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { movies } = useSelector(state => state.user);
  const { user } = useSelector(state => state.user);
  const email = user.email;
  const { movieData } = useSelector(state => state.app);
  // const movies = movieData._snapshot.value;
  // const movies = {};
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    dispatch(actions.user.logout());
  };

  return (
    <SafeAreaView style={styles.screen}>
      <>
        <CreateMovieModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          movies={movies}
          email={email}
        />
        <DefaultButton
          title={t('homeScreen:buttonCreateNewMovie')}
          onPress={() => setModalVisible(true)}
        />
        <DefaultButton
          title={t('homeScreen:buttonLogout')}
          onPress={handleLogout}
        />
        <DefaultButton
          title={'print data'}
          onPress={() => console.log(user.uid)}
        />
        <ScrollView scrollEventThrottle={16}>
          <View style={styles.moviesSection}>
            <Text style={styles.moviesTitle}>
              {t('homeScreen:moviesTitle')}
            </Text>
            <View style={styles.moviesList}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {movieData &&
                  Object.keys(movieData).map((movie, index) =>
                    movieData[movie].administrators.includes(user.email) ? (
                      <MovieGridTile
                        index={index}
                        movieData={movieData[movie]}
                        title={movieData[movie].title}
                      />
                    ) : (
                      <></>
                    ),
                  )}
              </ScrollView>
            </View>
            <View style={styles.actorsSection}>
              <Text style={styles.actorsTitle}>
                {t('homeScreen:actorsTitle')}
              </Text>
              <View style={styles.actorsList}>
                <ActorsGridTile width={width} />
                <ActorsGridTile width={width} />
                <ActorsGridTile width={width} />
                <ActorsGridTile width={width} />
                <ActorsGridTile width={width} />
              </View>
            </View>
          </View>
        </ScrollView>
      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  moviesSection: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
  },
  moviesTitle: {
    fontSize: 24,
    fontWeight: '700',
    paddingHorizontal: 20,
  },
  moviesList: { height: 130, marginTop: 20 },
  actorsSection: { marginTop: 40 },
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
